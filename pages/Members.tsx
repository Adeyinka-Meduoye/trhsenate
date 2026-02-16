import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { Member } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongBio = member.bio.length > 120; // Check if bio is long enough to need truncation

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-800 hover:border-blue-900/50 hover:shadow-md transition-all flex flex-col h-full">
      <div className="aspect-square w-full overflow-hidden bg-slate-800 relative group">
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-auto">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2 min-h-[2rem] flex items-center">{member.role}</p>
          <h3 className="text-xl font-bold text-white mb-3">{member.name}</h3>
          
          <div className={`text-sm text-slate-400 leading-relaxed ${!expanded && isLongBio ? 'line-clamp-4' : ''}`}>
            {member.bio}
          </div>
          
          {isLongBio && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center transition-colors focus:outline-none uppercase tracking-wider"
            >
              {expanded ? (
                <>Show Less <ChevronUp className="h-3 w-3 ml-1" /></>
              ) : (
                <>Read More <ChevronDown className="h-3 w-3 ml-1" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMembers(DataService.getMembers());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 animate-gradient-text">Senate Council Leadership</h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          The Leadership Team responsible for driving systemic excellence, organisational alignment, and transformational leadership across all TRH workforce organisations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}

        {members.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
};