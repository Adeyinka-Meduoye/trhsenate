import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { Meeting } from '../types';
import { Calendar, MapPin, Clock, FileText, Video } from 'lucide-react';

interface MeetingCardProps {
  meeting: Meeting;
  isPast?: boolean;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, isPast = false }) => (
  <div className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border ${isPast ? 'bg-slate-900/40 border-slate-800 opacity-75' : 'bg-slate-900 border-blue-900/30 shadow-sm'} transition-all`}>
    <div className="md:w-48 flex-shrink-0 flex flex-col justify-center text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
      <span className="text-3xl font-bold text-white">
        {new Date(meeting.date).getDate()}
      </span>
      <span className="text-lg font-medium text-blue-500 uppercase">
        {new Date(meeting.date).toLocaleString('default', { month: 'short' })}
      </span>
      <span className="text-sm text-slate-500">
        {new Date(meeting.date).getFullYear()}
      </span>
    </div>
    
    <div className="flex-grow">
      <h3 className={`text-xl font-bold mb-2 ${isPast ? 'text-slate-500' : 'text-white'}`}>{meeting.title}</h3>
      <p className="text-slate-400 mb-4 text-sm leading-relaxed">{meeting.description || 'No description provided.'}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1.5" />
          {meeting.location}
        </div>
        {meeting.minutesUrl && (
          <a href={meeting.minutesUrl} target="_blank" rel="noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium">
            <Video className="h-4 w-4 mr-1.5" />
            Join / View Link
          </a>
        )}
      </div>
    </div>
  </div>
);

export const Meetings = () => {
  const [upcoming, setUpcoming] = useState<Meeting[]>([]);
  const [past, setPast] = useState<Meeting[]>([]);

  useEffect(() => {
    const all = DataService.getMeetings();
    const now = new Date();
    
    const up = all.filter(m => new Date(m.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pst = all.filter(m => new Date(m.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setUpcoming(up);
    setPast(pst);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 animate-gradient-text">Senate Schedule</h1>
        <p className="text-slate-400">Track upcoming legislative sessions and review past assemblies.</p>
        <div className="mt-4 p-5 bg-blue-950 border border-blue-900 rounded-lg text-sm text-blue-200 shadow-lg">
            <p className="font-semibold mb-2 text-white">Standard Schedule (Timezone: Africa/Lagos)</p>
            <ul className="list-disc list-inside space-y-2 opacity-90 mb-3">
                <li><span className="font-semibold text-blue-300">3rd Sunday:</span> In-Person (Church Auditorium, immediately after service)</li>
                <li><span className="font-semibold text-blue-300">3rd Tuesday:</span> Virtual (9:00 PM - 10:30 PM)</li>
                <li><span className="font-semibold text-blue-300">Note:</span> Our Monthly Meeting is always in-person. In the absence of that, we hold a virtual session.</li>
            </ul>
            <div className="pt-2 border-t border-blue-900/50">
              <span className="text-slate-400 mr-2">Video call link:</span>
              <a href="https://meet.google.com/epx-xnvu-yts" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline font-medium">
                https://meet.google.com/epx-xnvu-yts
              </a>
            </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-lg font-semibold text-white uppercase tracking-wider mb-6 border-l-4 border-blue-600 pl-3">Upcoming Meetings</h2>
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(m => <MeetingCard key={m.id} meeting={m} />)
          ) : (
            <p className="text-slate-500 italic bg-slate-900 p-6 rounded-lg text-center border border-slate-800">No upcoming meetings scheduled.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white uppercase tracking-wider mb-6 border-l-4 border-slate-600 pl-3">Past Archive</h2>
        <div className="space-y-4">
          {past.length > 0 ? (
            past.map(m => <MeetingCard key={m.id} meeting={m} isPast />)
          ) : (
            <p className="text-slate-500 italic">No past meeting records found.</p>
          )}
        </div>
      </section>
    </div>
  );
};