import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LeadFormContextValue {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => setIsOpen(true), []);
  const closeForm = useCallback(() => setIsOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}
