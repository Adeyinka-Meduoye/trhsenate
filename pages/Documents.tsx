import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { DocumentItem, DocumentCategory } from '../types';
import { FileText, Link as LinkIcon, Download, ExternalLink, FolderOpen } from 'lucide-react';

export const Documents = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  
  useEffect(() => {
    setDocs(DataService.getDocuments());
  }, []);

  const categories: DocumentCategory[] = ['Reports', 'Minutes', 'Systems & Structures', 'Data Forms', 'Other'];

  const getDocsByCategory = (cat: DocumentCategory) => docs.filter(d => d.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 animate-gradient-text">Document Repository</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Access official reports, minutes, and guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {categories.map((category) => {
          const categoryDocs = getDocsByCategory(category);
          if (categoryDocs.length === 0) return null;

          return (
            <div key={category} className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-900/30 rounded-lg mr-3">
                  <FolderOpen className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <span className="ml-auto bg-slate-800 text-slate-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                  {categoryDocs.length}
                </span>
              </div>

              <div className="space-y-3">
                {categoryDocs.map((doc) => (
                  <a 
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group hover:bg-slate-800 p-3 rounded-lg -mx-3 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        {doc.type === 'file' ? (
                          <FileText className="h-5 w-5 text-slate-500 group-hover:text-blue-400" />
                        ) : (
                          <LinkIcon className="h-5 w-5 text-slate-500 group-hover:text-blue-400" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 break-words">
                          {doc.title}
                        </h3>
                        {doc.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{doc.description}</p>
                        )}
                        <p className="text-[10px] text-slate-600 mt-1">
                          Added {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                         {doc.type === 'file' ? (
                          <Download className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {docs.length === 0 && (
         <div className="text-center py-20 bg-slate-900 rounded-xl border-2 border-dashed border-slate-800">
           <p className="text-slate-500">No documents have been uploaded yet.</p>
         </div>
      )}
    </div>
  );
};