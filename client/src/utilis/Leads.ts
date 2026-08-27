import { Lead } from "../components/dashboard/LeadCard";


const LEADS: Lead[] = [
  {
    _id: "1",
    name: "Priya Mehta",
    company: "TechNova Pvt Ltd",
    email: "priya.mehta@technova.in",
    status: "New",
    priority: "High",
    source: "Website",
    tags: [
      'Inbound',
      'High Value'
    ],
    timeToClose: 15,
    salesAgent: {
      name: "Arjun Singh",
      email: "arunsingh@gmail.com"
    },
    createdAt: '2026-07-22T10:15:00.000Z',
    updatedAt: '2026-07-22T12:00:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
  },
  {
    _id: "2",
    name: "Rahul Verma",
    company: "BlueSky Solutions",
    email: "rahul.v@bluesky.io",
    status: "Contacted",
    priority: "Medium",
    source: "Referral",
    tags: [
      'Follow-up',
      'Mid-Market'
    ],
    timeToClose: 25,
    salesAgent: {
      name: "Neha Kapoor",
      email: "nehakapoor@gmail.com"
    },
    createdAt: '2026-07-21T09:30:00.000Z',
    updatedAt: '2026-07-21T14:20:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul",
  },
  {
    _id: "3",
    name: "Sneha Iyer",
    company: "Horizon Fintech",
    email: "sneha.iyer@horizonfin.com",
    status: "Qualified",
    priority: "High",
    source: "Cold Call",
    tags: [
      'Enterprise',
      'Hot'
    ],
    timeToClose: 40,
    salesAgent: {
      name: "Arjun Singh",
      email: "arunsingh@gmail.com"
    },
    createdAt: '2026-07-20T11:45:00.000Z',
    updatedAt: '2026-07-21T16:10:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha",
  },
  {
    _id: "4",
    name: "Amit Desai",
    company: "GreenLeaf Exports",
    email: "amit.desai@greenleaf.co",
    status: "Proposal",
    priority: "Low",
    source: "Advertisement",
    tags: [
      'High Value',
      'Negotiation'
    ],
    timeToClose: 20,
    salesAgent: {
      name: "Meera Joshi",
      email: "meerajoshi@gmail.com"
    },
    createdAt: '2026-07-19T08:00:00.000Z',
    updatedAt: '2026-07-20T10:30:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit",
  },
  {
    _id: "5",
    name: "Kavya Nair",
    company: "Sparkle Retail",
    email: "kavya.n@sparkleretail.com",
    status: "Closed",
    priority: "Medium",
    source: "Email",
    tags: [
      'Retail',
      'Completed'
    ],
    timeToClose: 10,
    salesAgent: {
      name: "Rohan Sharma",
      email: "rohansharma@gmail.com"
    },
    createdAt: '2026-07-18T14:10:00.000Z',
    updatedAt: '2026-07-19T17:50:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kavya",
  },
  {
    _id: "6",
    name: "Vikram Patel",
    company: "Nexgen Logistics",
    email: "vikram.p@nexgenlog.in",
    status: "New",
    priority: "Low",
    source: "Other",
    tags: [
      'Logistics',
      'Cold Lead'
    ],
    timeToClose: 35,
    salesAgent: {
      name: "Neha Kapoor",
      email: "nehakapoor@gmail.com"
    },
    createdAt: '2026-07-17T13:25:00.000Z',
    updatedAt: '2026-07-17T15:40:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram",
  },
  {
    _id: "7",
    name: "Ananya Bose",
    company: "CloudPeak Technologies",
    email: "ananya.bose@cloudpeak.tech",
    status: "Contacted",
    priority: "Medium",
    source: "Website",
    tags: [
      'SaaS',
      'Follow-up'
    ],
    timeToClose: 18,
    salesAgent: {
      name: "Meera Joshi",
      email: "meerajoshi@gmail.com"
    },
    createdAt: '2026-07-16T15:00:00.000Z',
    updatedAt: '2026-07-17T11:15:00.000Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya",
  },
  {
    _id: "8",
    name: "Siddharth Rao",
    company: "Meridian Healthcare",
    email: "siddharth.rao@meridian.co",
    status: "Qualified",
    priority: "High",
    source: "Referral",
    tags: [
      'High Value',
      'Follow-up'
    ],
    timeToClose: 30,
    salesAgent: {
      name: "Arjun Singh",
      email: "arunsingh@gmail.com"
    },
    createdAt: '2026-07-20T16:13:34.202Z',
    updatedAt: '2026-07-21T18:48:48.549Z',
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Siddharth",
  },
];

export default LEADS;