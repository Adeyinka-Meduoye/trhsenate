import React, { useEffect, useState } from 'react';
import { Calendar, Users, FileText, ArrowRight, Clock, MapPin, Target, Heart, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataService } from '../services/storage';
import { Meeting } from '../types';

export const Home = () => {
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    const meetings = DataService.getMeetings();
    const futureMeetings = meetings
      .filter(m => new Date(m.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (futureMeetings.length > 0) {
      setNextMeeting(futureMeetings[0]);
    }
  }, []);

  const govScope = [
    'Sanctuary', 'Music', 'Media', 'Protocol', 
    'Hospitality', 'Drama', 'Innovation & Technology', 
    '+ Other Organisations & Departments'
  ];

  return (
    <div className="animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="bg-blue-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('/images/trhsenate.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-blue-900/50 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 text-blue-200 border border-blue-800 backdrop-blur-sm">
              We move forward, together —
            </div>
            {/* Animated Gradient Text matching Logo colors: Navy/Blue -> Orange -> Red */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 animate-gradient-text pb-2">
              Building Systems. <br />
              Shaping Culture. <br />
              Driving Kingdom Impact.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
             We don’t bend the system. We create it, follow it, and reflect it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/members" className="bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 animate-gradient-bg text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity inline-flex items-center shadow-lg border border-transparent">
                View Members <Users className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/documents" className="bg-transparent border-2 border-slate-400 text-slate-100 px-8 py-3 rounded-lg font-bold hover:bg-white/5 hover:border-white transition-colors">
                Blueprint & Documents
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next Meeting Highlight */}
      {nextMeeting && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-900/30 text-red-400 mb-3 border border-red-900/50">
                Next Session
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{nextMeeting.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center text-slate-400 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  {new Date(nextMeeting.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  {new Date(nextMeeting.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  {nextMeeting.location}
                </div>
              </div>
            </div>
            <Link to="/meetings" className="w-full md:w-auto text-center px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700">
              Meeting Details
            </Link>
          </div>
        </div>
      )}

      {/* Vision & Mandate Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Charge</h2>
            <div className="prose prose-invert text-slate-400 leading-relaxed">
              <p className="mb-4">
                The Senate Council serves as the governing arm of TRH Ministries Global, providing coordination, oversight, and system design across the entire Workforce structure.
              </p>
              <p className="mb-4">
                This body is entrusted with the responsibility of designing, implementing, and continually refining systems that strengthen organisational structure, accountability, and excellence. The goal is to ensure that every process, framework, and individual consistently reflects order, discipline, and operational excellence.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-300 my-6 bg-slate-900/50 py-2 pr-2 rounded-r">
                "Leadership is service, not status. True leadership multiplies people, strengthens systems, and sustains culture."
              </blockquote>
            </div>
            
            <div className="mt-8">
               <h3 className="font-bold text-white mb-3">Governance Scope</h3>
               <div className="flex flex-wrap gap-2">
                 {govScope.map(org => (
                   <span key={org} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-medium border border-slate-700">
                     {org}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center">
               <Target className="h-5 w-5 text-blue-500 mr-2" />
               Our Assignment
             </h3>
             <p className="text-lg text-slate-300 leading-relaxed font-medium mb-8">
               To strategically design, guide, and supervise all governance systems, structures, and standards in a manner that directly advances the TRH Ministries Global Vision.

The Senate exists to ensure unity of direction, operational excellence, and disciplined accountability across every organisation, enabling the entire Workforce to function as one body that consistently drives growth, transformation, and forward movement in alignment with the global mandate.
             </p>

             <h3 className="text-xl font-bold text-white mb-6 flex items-center">
               <Activity className="h-5 w-5 text-blue-500 mr-2" />
               Strategic Focus
             </h3>
             <ul className="space-y-3">
               {[
                 'System Governance & Excellence',
                 'Workforce Leadership Development',
                 'Communication & Collaboration',
                 'Ownership & Problem Solving',
                 'Recognition, Culture & Engagement',
                 "Mentorship & Workforce Development",
                 "Data & Performance Management"
               ].map((item, i) => (
                 <li key={i} className="flex items-center text-slate-400">
                   <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                   {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Values Section (H.E.A.R.T) */}
      <div className="bg-slate-900 border-y border-slate-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">Our Guiding Values</h2>
             <p className="text-slate-400 max-w-2xl mx-auto">
               All activities under the Senate Presidency are guided by the H.E.A.R.T. Values.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <ValueCard letter="H" title="Honour" desc="Reverence for God, leadership, and one another." icon={<Heart className="h-6 w-6" />} />
            <ValueCard letter="E" title="Excellence" desc="Delivering quality, order, and impact in all services." icon={<Zap className="h-6 w-6" />} />
            <ValueCard letter="A" title="Accountability" desc="Taking responsibility with integrity and transparency." icon={<ShieldCheck className="h-6 w-6" />} />
            <ValueCard letter="R" title="Result" desc="Pursuing measurable kingdom impact." icon={<Target className="h-6 w-6" />} />
            <ValueCard letter="T" title="Trust" desc="Relying on God’s grace to perform and finish well." icon={<Users className="h-6 w-6" />} />
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-white mb-8">Platform Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/members" className="group bg-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-800 transition-all hover:border-blue-700/50">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center group-hover:text-blue-400 transition-colors">
              <Users className="h-5 w-5 text-blue-500 mr-2" /> Members
            </h3>
            <p className="text-sm text-slate-400">View profiles of the Senate & Workforce Council leadership.</p>
          </Link>
          <Link to="/meetings" className="group bg-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-800 transition-all hover:border-blue-700/50">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center group-hover:text-blue-400 transition-colors">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" /> Meetings
            </h3>
            <p className="text-sm text-slate-400">Access schedule for Senate sessions and WLA training.</p>
          </Link>
          <Link to="/documents" className="group bg-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-800 transition-all hover:border-blue-700/50">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center group-hover:text-blue-400 transition-colors">
              <FileText className="h-5 w-5 text-blue-500 mr-2" /> Documents
            </h3>
            <p className="text-sm text-slate-400">Repository for Blueprints, SOPs, and Reports.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ letter, title, desc, icon }: { letter: string, title: string, desc: string, icon: React.ReactNode }) => (
  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <span className="text-4xl font-bold text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity">{letter}</span>
      <div className="text-blue-400">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-snug">{desc}</p>
  </div>
);