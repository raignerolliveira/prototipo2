export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "client" | "professional";
  avatar?: string;
  specialty?: string;
  bio?: string;
  experience?: string;
}

export interface Provider {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: Review[];
  distance: string;
  price: string;
  image: string;
  verified: boolean;
  bio: string;
  experience: string;
  completedJobs: number;
  responseRate: number;
  responseTime: string;
  specialties: string[];
  portfolio: string[];
  certifications: string[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "provider";
  time: string;
  type?: "text" | "proposal" | "image";
  imageUrl?: string;
  proposalData?: Proposal;
}

export interface Proposal {
  id: string;
  value: string;
  description: string;
  status: "pending" | "accepted" | "rejected" | "negotiating";
  providerId: number;
  serviceType: string;
  deadline: string;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  providerId: number;
  serviceType: string;
  description: string;
  images: string[];
  status: "pending" | "quoted" | "accepted" | "in_progress" | "completed" | "cancelled";
  proposal?: Proposal;
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface Payment {
  proposalId: string;
  amount: string;
  method: "credit-card" | "pix" | "boleto";
  installments: number;
  status: "pending" | "processing" | "held" | "released" | "refunded";
  cardData?: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
}
