import { useState } from 'react';
import Navbar from './landing/components/Navbar';
import Hero from './landing/components/Hero';
import LiveStudioPreview from './landing/components/LiveStudioPreview';
import TemplateGallery from './landing/components/TemplateGallery';
import FeatureShowcase from './landing/components/FeatureShowcase';
import HowItWorks from './landing/components/HowItWorks';
import PricingSection from './landing/components/PricingSection';
import Testimonials from './landing/components/Testimonials';
import FaqSection from './landing/components/FaqSection';
import Footer from './landing/components/Footer';
import TemplateDetailModal from './landing/components/TemplateDetailModal';
import CreateOrderModal from './landing/components/CreateOrderModal';

export default function LandingPage() {
  const [selectedTemplateForDetail, setSelectedTemplateForDetail] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalInitialTemplate, setModalInitialTemplate] = useState(null);
  const [modalInitialPlan, setModalInitialPlan] = useState(null);

  const handleOpenCreateWithTemplate = (template) => {
    setModalInitialTemplate(template);
    setIsCreateModalOpen(true);
  };

  const handleOpenCreateWithPlan = (plan) => {
    setModalInitialPlan(plan);
    setIsCreateModalOpen(true);
  };

  const scrollToStudio = () => {
    const studioEl = document.getElementById('live-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F2] text-slate-800 font-sans-body relative overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      <Navbar
        onOpenCreateModal={() => {
          setModalInitialTemplate(null);
          setModalInitialPlan(null);
          setIsCreateModalOpen(true);
        }}
      />

      <Hero onOpenCreateModal={() => setIsCreateModalOpen(true)} onScrollToStudio={scrollToStudio} />

      <LiveStudioPreview />

      <TemplateGallery onSelectTemplate={(tmpl) => setSelectedTemplateForDetail(tmpl)} />

      <FeatureShowcase />

      <HowItWorks onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      <PricingSection onSelectPlan={(plan) => handleOpenCreateWithPlan(plan)} />

      <Testimonials />

      <FaqSection />

      <Footer />

      <TemplateDetailModal
        template={selectedTemplateForDetail}
        onClose={() => setSelectedTemplateForDetail(null)}
        onUseTemplate={(tmpl) => handleOpenCreateWithTemplate(tmpl)}
      />

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialTemplate={modalInitialTemplate}
        initialPlan={modalInitialPlan}
      />
    </div>
  );
}
