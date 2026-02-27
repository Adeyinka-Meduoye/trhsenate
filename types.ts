export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  description?: string;
  minutesUrl?: string;
}

export type DocumentCategory = 'Reports' | 'Minutes' | 'Systems & Structures' | 'Data Forms' | 'Other';

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  type: 'file' | 'link';
  url: string;
  description?: string;
  uploadDate: string;
}

export type ViewState = 'HOME' | 'MEMBERS' | 'MEETINGS' | 'DOCUMENTS' | 'ADMIN';