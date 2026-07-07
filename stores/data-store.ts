import { create } from 'zustand'

interface DataState {
  // Marketplace data
  audits: any[]
  certificates: any[]
  proofs: any[]
  
  // Audit data
  assignedAudits: any[]
  incomingRequests: any[]
  
  // Company data
  myAudits: any[]
  requestedAudits: any[]
  
  // Verifier data
  verifications: any[]
  
  // Actions
  setAudits: (audits: any[]) => void
  setCertificates: (certs: any[]) => void
  setProofs: (proofs: any[]) => void
  setAssignedAudits: (audits: any[]) => void
  setIncomingRequests: (requests: any[]) => void
  setMyAudits: (audits: any[]) => void
  setVerifications: (verifications: any[]) => void
  
  // Clear all data
  clearAll: () => void
}

export const useDataStore = create<DataState>((set) => ({
  audits: [],
  certificates: [],
  proofs: [],
  assignedAudits: [],
  incomingRequests: [],
  myAudits: [],
  requestedAudits: [],
  verifications: [],

  setAudits: (audits) => set({ audits }),
  setCertificates: (certificates) => set({ certificates }),
  setProofs: (proofs) => set({ proofs }),
  setAssignedAudits: (assignedAudits) => set({ assignedAudits }),
  setIncomingRequests: (incomingRequests) => set({ incomingRequests }),
  setMyAudits: (myAudits) => set({ myAudits }),
  setVerifications: (verifications) => set({ verifications }),

  clearAll: () =>
    set({
      audits: [],
      certificates: [],
      proofs: [],
      assignedAudits: [],
      incomingRequests: [],
      myAudits: [],
      requestedAudits: [],
      verifications: [],
    }),
}))
