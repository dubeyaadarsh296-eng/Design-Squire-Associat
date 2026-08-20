import { useState, useEffect } from 'react';
import { LeadFormProvider, useLeadForm } from '@/components/LeadFormContext';
import { LeadModal } from '@/components/LeadModal';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { FloatingContact } from '@/components/FloatingContact';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Architecture3D } from '@/components/sections/Architecture3D';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { BlueprintTo3D } from '@/components/sections/BlueprintTo3D';
import { PhotoGallery } from '@/components/sections/PhotoGallery';
import { MidCTA } from '@/components/sections/MidCTA';
import { Contact } from '@/components/sections/Contact';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function MainSite() {
  const { openForm } = useLeadForm();
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    if (popupShown) return;
    const shown = sessionStorage.getItem('dsa_popup_shown');
    if (shown) {
      setPopupShown(true);
      return;
    }
    const timer = setTimeout(() => {
      openForm();
      sessionStorage.setItem('dsa_popup_shown', 'true');
      setPopupShown(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [openForm, popupShown]);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <div id="intro">
          <About />
        </div>
        <Services />
        <ProjectShowcase />
        <MidCTA />
        <Architecture3D />
        <ProcessTimeline />
        <BeforeAfter />
        <BlueprintTo3D />
        <PhotoGallery />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const isHashAdmin =
        window.location.hash === '#admin' ||
        window.location.pathname.startsWith('/admin');
      setIsAdmin(isHashAdmin);
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  return (
    <LeadFormProvider>
      <LoadingScreen />
      <CustomCursor />
      <LeadModal />
      {isAdmin ? <AdminDashboard /> : <MainSite />}
    </LeadFormProvider>
  );
}

export default App;
