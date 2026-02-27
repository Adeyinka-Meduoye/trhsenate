import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { Member, Meeting, DocumentItem, DocumentCategory } from '../types';
import { Trash2, Plus, Lock, AlertTriangle, Copy, Check } from 'lucide-react';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'MEETINGS' | 'DOCS'>('MEMBERS');
  const [members, setMembers] = useState<Member[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [copied, setCopied] = useState(false);

  // Simple form states
  const [newMember, setNewMember] = useState<Partial<Member>>({ name: '', role: '', bio: '', imageUrl: '/images/logo-trans.png' });
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({ title: '', date: '', location: '', description: '' });
  const [newDoc, setNewDoc] = useState<Partial<DocumentItem>>({ title: '', category: 'Reports', type: 'link', url: '', description: '' });

  const refreshData = () => {
    setMembers(DataService.getMembers());
    setMeetings(DataService.getMeetings());
    setDocs(DataService.getDocuments());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'TRH2025' || passcode === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode');
    }
  };

  // --- Handlers ---

  const handleDeleteMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    DataService.setMembers(updated);
    refreshData();
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    const item: Member = {
      id: Date.now().toString(),
      name: newMember.name!,
      role: newMember.role!,
      bio: newMember.bio || '',
      imageUrl: newMember.imageUrl || '/images/logo-trans.png'
    };
    DataService.setMembers([...members, item]);
    setNewMember({ name: '', role: '', bio: '', imageUrl: '/images/logo-trans.png' });
    refreshData();
  };

  const handleDeleteMeeting = (id: string) => {
    const updated = meetings.filter(m => m.id !== id);
    DataService.setMeetings(updated);
    refreshData();
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title || !newMeeting.date) return;
    const item: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title!,
      date: new Date(newMeeting.date!).toISOString(),
      location: newMeeting.location || 'TBD',
      description: newMeeting.description || '',
      minutesUrl: newMeeting.minutesUrl || ''
    };
    DataService.setMeetings([...meetings, item]);
    setNewMeeting({ title: '', date: '', location: '', description: '' });
    refreshData();
  };

  const handleDeleteDoc = (id: string) => {
    const updated = docs.filter(d => d.id !== id);
    DataService.setDocuments(updated);
    refreshData();
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.url) return;
    const item: DocumentItem = {
      id: Date.now().toString(),
      title: newDoc.title!,
      category: newDoc.category || 'Other',
      type: newDoc.type || 'link',
      url: newDoc.url!,
      description: newDoc.description || '',
      uploadDate: new Date().toISOString()
    };
    DataService.setDocuments([...docs, item]);
    setNewDoc({ title: '', category: 'Reports', type: 'link', url: '', description: '' });
    refreshData();
  };

  const handleExport = () => {
    let dataToExport: any = [];
    let variableName = '';

    if (activeTab === 'MEMBERS') {
      dataToExport = members;
      variableName = 'INITIAL_MEMBERS';
    } else if (activeTab === 'MEETINGS') {
      dataToExport = meetings;
      variableName = 'INITIAL_MEETINGS';
    } else {
      dataToExport = docs;
      variableName = 'INITIAL_DOCS';
    }

    const jsonString = JSON.stringify(dataToExport, null, 2);
    // Wrap in a const declaration for easy pasting
    const exportString = `// Replace the ${variableName} array in services/storage.ts with this:\nconst ${variableName} = ${jsonString};`;
    
    navigator.clipboard.writeText(exportString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-800 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-slate-800 rounded-full">
              <Lock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Unlock Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-slate-400 hover:text-white"
        >
          Lock Panel
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-orange-200 font-bold text-sm">Local Mode Only</h3>
          <p className="text-orange-200/70 text-sm mt-1">
            Changes made here are saved to <strong>your browser only</strong> and will not appear for other users. 
            To update the live website, use this panel to edit data, then click "Copy Data Code" and paste it into your <code>storage.ts</code> file before deploying.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto w-full sm:w-auto">
          {(['MEMBERS', 'MEETINGS', 'DOCS'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'}
              `}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </nav>
        <button 
          onClick={handleExport}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-medium transition-colors border border-slate-700"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied to Clipboard!' : `Copy ${activeTab.toLowerCase()} Code`}
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-1 bg-slate-900 p-6 rounded-lg border border-slate-800 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New
          </h2>
          
          {activeTab === 'MEMBERS' && (
            <form onSubmit={handleAddMember} className="space-y-4">
              <input 
                placeholder="Name" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMember.name}
                onChange={e => setNewMember({...newMember, name: e.target.value})}
                required
              />
              <input 
                placeholder="Role (e.g., Chair)" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMember.role}
                onChange={e => setNewMember({...newMember, role: e.target.value})}
                required
              />
              <textarea 
                placeholder="Short Bio" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMember.bio}
                onChange={e => setNewMember({...newMember, bio: e.target.value})}
                rows={3}
              />
              <input 
                placeholder="Image URL (optional)" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMember.imageUrl}
                onChange={e => setNewMember({...newMember, imageUrl: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 text-sm font-medium">Add Member</button>
            </form>
          )}

          {activeTab === 'MEETINGS' && (
            <form onSubmit={handleAddMeeting} className="space-y-4">
              <input 
                placeholder="Title" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMeeting.title}
                onChange={e => setNewMeeting({...newMeeting, title: e.target.value})}
                required
              />
              <input 
                type="datetime-local"
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMeeting.date}
                onChange={e => setNewMeeting({...newMeeting, date: e.target.value})}
                required
              />
              <input 
                placeholder="Location" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMeeting.location}
                onChange={e => setNewMeeting({...newMeeting, location: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMeeting.description}
                onChange={e => setNewMeeting({...newMeeting, description: e.target.value})}
                rows={3}
              />
               <input 
                placeholder="Video/Minutes Link (optional)" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newMeeting.minutesUrl}
                onChange={e => setNewMeeting({...newMeeting, minutesUrl: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 text-sm font-medium">Add Meeting</button>
            </form>
          )}

          {activeTab === 'DOCS' && (
            <form onSubmit={handleAddDoc} className="space-y-4">
              <input 
                placeholder="Document Title" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newDoc.title}
                onChange={e => setNewDoc({...newDoc, title: e.target.value})}
                required
              />
              <select 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newDoc.category}
                onChange={e => setNewDoc({...newDoc, category: e.target.value as DocumentCategory})}
              >
                <option value="Reports">Reports</option>
                <option value="Minutes">Minutes</option>
                <option value="Systems & Structures">Systems & Structures</option>
                <option value="Forms">Forms</option>
                <option value="Other">Other</option>
              </select>
               <select 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newDoc.type}
                onChange={e => setNewDoc({...newDoc, type: e.target.value as 'link'|'file'})}
              >
                <option value="link">External Link</option>
                <option value="file">File (Simulated)</option>
              </select>
              <input 
                placeholder="URL" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newDoc.url}
                onChange={e => setNewDoc({...newDoc, url: e.target.value})}
                required
              />
               <input 
                placeholder="Short Description" 
                className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                value={newDoc.description}
                onChange={e => setNewDoc({...newDoc, description: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 text-sm font-medium">Add Document</button>
            </form>
          )}

        </div>

        {/* Right: List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-lg mb-4 text-white">Current Items</h2>

          {activeTab === 'MEMBERS' && members.map(item => (
            <div key={item.id} className="bg-slate-900 p-4 rounded border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.imageUrl} className="w-10 h-10 rounded-full object-cover bg-slate-800" alt="" />
                <div>
                  <div className="font-bold text-sm text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </div>
              <button onClick={() => handleDeleteMember(item.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {activeTab === 'MEETINGS' && meetings.map(item => (
             <div key={item.id} className="bg-slate-900 p-4 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white">{item.title}</div>
                <div className="text-xs text-slate-400">
                  {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <button onClick={() => handleDeleteMeeting(item.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {activeTab === 'DOCS' && docs.map(item => (
             <div key={item.id} className="bg-slate-900 p-4 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white">{item.title}</div>
                <div className="text-xs text-slate-400 flex gap-2">
                  <span className="bg-slate-800 px-1 rounded border border-slate-700">{item.category}</span>
                  <span>{item.type}</span>
                </div>
              </div>
              <button onClick={() => handleDeleteDoc(item.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {((activeTab === 'MEMBERS' && members.length === 0) || 
            (activeTab === 'MEETINGS' && meetings.length === 0) ||
            (activeTab === 'DOCS' && docs.length === 0)) && (
              <div className="text-center py-8 text-slate-500 italic">No items found.</div>
          )}

        </div>
      </div>
    </div>
  );
};