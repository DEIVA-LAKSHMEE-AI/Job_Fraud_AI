import { create } from 'zustand';

export interface ExtractedInformation {
  company?: string;
  recruiter?: string;
  recruiterEmail?: string;
  phoneNumber?: string;
  website?: string;
  salary?: string;
  jobRole?: string;
  joiningDate?: string;
  interviewProcess?: string;
  requestedDocuments?: string[];
  links?: string[];
  deadlines?: string[];
  rawText: string;
}

export interface InvestigationResult {
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  emailDomainAnalysis: string;
  companyAnalysis: string;
  recruiterAnalysis: string;
  websiteAnalysis: string;
  phoneAnalysis: string;
  suspiciousIndicators: string[];
  recommendations: string[];
  summary: string;
}

export interface InvestigationData {
  fileName: string;
  uploadedAt: Date;
  extracted: ExtractedInformation;
  result: InvestigationResult;
}

interface InvestigationStore {
  investigationData: InvestigationData | null;
  isInvestigating: boolean;
  setInvestigating: (value: boolean) => void;
  setInvestigationData: (data: InvestigationData) => void;
  reset: () => void;
}

export const useInvestigationStore = create<InvestigationStore>((set) => ({
  investigationData: null,
  isInvestigating: false,
  setInvestigating: (value: boolean) => set({ isInvestigating: value }),
  setInvestigationData: (data: InvestigationData) =>
    set({ investigationData: data, isInvestigating: false }),
  reset: () => set({ investigationData: null, isInvestigating: false }),
}));
