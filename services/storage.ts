import { Member, Meeting, DocumentItem } from '../types';

// Initial Mock Data
const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Adeyinka Meduoye',
    role: 'Senate President & Workforce Council Director',
    bio: 'A multidisciplinary professional driven by leadership, technology, entrepreneurship, and public policy. He utilises his diverse skill set, innovative mindset, and demonstrated leadership experiences to drive meaningful change and achieve excellence in whatever he does.',
    imageUrl: '/images/adeyinka-medus-2.png'
  },
  {
    id: '2',
    name: 'Belema Nzei',
    role: 'Senate Member',
    bio: '',
    imageUrl: '/images/belema-nzei.jpg'
  },
  {
    id: '3',
    name: 'Ezekiel Nsikak David',
    role: 'Senate Member',
    bio: 'A skilled Radio Frequency Technician and Cybersecurity Analyst driven by a strong passion for technology, problem-solving, and innovation. He thrives on understanding how systems communicate, securing networks against threats, and ensuring reliable connectivity in an increasingly digital world. He is motivated by the challenge of staying ahead in a rapidly evolving technology landscape and applying his expertise to build secure, efficient, and resilient solutions. His aspiration is to grow into a highly respected specialist who contributes to advanced communication infrastructure and cutting-edge cybersecurity systems that deliver lasting impact.',
    imageUrl: '/images/david-ensikak.jpeg'
  },
  {
    id: '4',
    name: 'Jason Irabor Andre',
    role: 'Senate Member',
    bio: '',
    imageUrl: '/images/mr-jason.jpg'
  },
  {
    id: '5',
    name: 'Given Ehiemere',
    role: 'Senate Member',
    bio: 'God-Given is a young professional at the early stage of her career, serving as a Customer Service Personnel at a reputable Nigerian commercial bank. She is motivated by opportunities to achieve professional milestones, acquire new skills, and tackle challenging projects that foster growth. Her goal is to become a leading finance executive in Nigeria, driving innovation and growth in the banking sector while mentoring young professionals and advancing financial inclusion.',
    imageUrl: '/images/given-gift.jpeg'
  },
  {
    id: '6',
    name: 'Chibuike Moses Okorie',
    role: 'Senate Member',
    bio: 'Moses Okorie is the Creative Director of Mosco NEEDLES, a fashion brand specializing in custom-made dresses, ready-to-wear collections, and royal attire. Under his direction, Mosco NEEDLES blends creativity and craftsmanship to deliver distinctive, high-quality fashion pieces.',
    imageUrl: '/images/chibuike-moses.jpeg'
  },
  {
    id: '7',
    name: 'Uche Stanley Eze',
    role: 'Senate Member',
    bio: '',
    imageUrl: '/images/uche-stanley.jpg'
  },
  {
    id: '8',
    name: 'Daniel Felix',
    role: 'Senate Member',
    bio: '',
    imageUrl: '/images/daniel-felix.jpg'
  },
  {
    id: '9',
    name: 'Ogaranya',
    role: 'Senate Member',
    bio: '',
    imageUrl: '/images/isaiah-david.jpg'
  }
];

// Helper to generate meetings based on logic:
// 3rd Sunday: In-person @ Church Auditorium (12:00 PM)
// 3rd Tuesday: Virtual @ Google Meet (9:00 PM)
const generateMeetings = (): Meeting[] => {
  const meetings: Meeting[] = [];
  const today = new Date();
  
  // Generate for last month, current month, and next 3 months
  for (let i = -1; i < 11; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const monthName = d.toLocaleString('default', { month: 'long' });

    // 3rd Sunday Calculation
    const firstDay = new Date(year, month, 1);
    const wd = firstDay.getDay(); // 0=Sun
    const firstSunday = 1 + ((7 - wd) % 7);
    const thirdSunday = firstSunday + 14;
    const sunDate = new Date(year, month, thirdSunday, 12, 0, 0); 

    // 3rd Tuesday Calculation
    const firstTuesday = 1 + ((2 - wd + 7) % 7);
    const thirdTuesday = firstTuesday + 14;
    const tueDate = new Date(year, month, thirdTuesday, 21, 0, 0); // 21:00

    meetings.push({
      id: `sun-${year}-${month}`,
      title: `Senate In-Person Session (${monthName})`,
      date: sunDate.toISOString(),
      location: 'Church Auditorium',
      description: 'Monthly physical gathering immediately following church service.'
    });

    meetings.push({
      id: `tue-${year}-${month}`,
      title: `Senate Virtual Review (${monthName})`,
      date: tueDate.toISOString(),
      location: 'Google Meet',
      description: 'Virtual strategy and review session. Time: 9:00 PM - 10:30 PM (Africa/Lagos).',
      minutesUrl: 'https://meet.google.com/epx-xnvu-yts'
    });
  }

  return meetings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const INITIAL_MEETINGS = generateMeetings();

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: '1',
    title: 'TRH Weekly Activity Report',
    category: 'Reports',
    type: 'link',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHTWRv8jc3froRSkCI-nhJBc51t_Q50d0eh_B5-Mwl3d1y5A/viewform',
    uploadDate: '2026-02-16',
    description: 'Official template for organisation leaders to submit weekly activity and progress.'
  },
  {
    id: '2',
    title: 'TRH Workforce Membership Data Collection',
    category: 'Reports',
    type: 'link',
    url: 'https://forms.gle/ZRibvHLepM1WD4Ai8',
    uploadDate: '2026-02-16',
    description: 'Official Central Form for the TRH Ministries Global Workforce Membership Directory. This form is designed for Organization Leaders and or Assistant Leaders to submit the details of their team members.'
  },
  {
    id: '3',
    title: 'TRH Workforce Team Member of the Monthly: Nomination Form',
    category: 'Reports',
    type: 'link',
    url: 'https://forms.gle/TMh6zuz3E9XJXhTaA',
    uploadDate: '2026-02-16',
    description: 'Official template for organisation leaders to submit evidence-based responses for their respective team member of the month.'
  }
];

// AUTOMATED SYNC HELPER
// Checks if the data in code has changed compared to what is in local storage.
// If code changed, it overwrites local storage.
const getWithSync = <T>(key: string, initialData: T): T => {
  const hashKey = `${key}_hash`;
  // We use the JSON string length + prefix as a simple "signature" of the data
  // If you change the data in code, this signature changes.
  const currentSignature = JSON.stringify(initialData); 
  
  const storedSignature = localStorage.getItem(hashKey);
  const storedData = localStorage.getItem(key);

  // If signatures mismatch (code changed) or no data exists, reset to code data.
  if (storedSignature !== currentSignature || !storedData) {
    localStorage.setItem(key, JSON.stringify(initialData));
    localStorage.setItem(hashKey, currentSignature);
    return initialData;
  }

  // Otherwise, return the saved data (preserves Admin panel edits if code hasn't changed)
  return JSON.parse(storedData);
};

const set = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Exports
export const DataService = {
  getMembers: (): Member[] => getWithSync('trh_members', INITIAL_MEMBERS),
  setMembers: (data: Member[]) => set('trh_members', data),

  getMeetings: (): Meeting[] => getWithSync('trh_meetings', INITIAL_MEETINGS),
  setMeetings: (data: Meeting[]) => set('trh_meetings', data),

  getDocuments: (): DocumentItem[] => getWithSync('trh_docs', INITIAL_DOCS),
  setDocuments: (data: DocumentItem[]) => set('trh_docs', data),
};