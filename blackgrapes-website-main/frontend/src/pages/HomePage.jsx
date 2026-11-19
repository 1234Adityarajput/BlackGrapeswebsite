import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStackSection from '../components/TechStackSection';
import ProjectsSection from '../components/ProjectsSection';
import WorkProcessSection from '../components/WorkProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({ onOpenModal, onSelectService, onOpenInquiry }) {
  return (
    <>
      {/* A. Modern Hero Section */}
      <HeroSection onOpenModal={onOpenModal} />

      {/* B. Company Introduction */}
      <AboutSection onOpenModal={onOpenModal} />

      {/* C. Our Services */}
      <ServicesSection
        onOpenModal={onOpenModal}
        onSelectService={onSelectService}
      />

      {/* D. Why Choose Us */}
      <WhyChooseUs onOpenModal={onOpenModal} />

      {/* E. Technologies We Use */}
      <TechStackSection />

      {/* F. Our Portfolio */}
      <ProjectsSection onOpenModal={onOpenModal} />

      {/* G. Our Work Process */}
      <WorkProcessSection onOpenModal={onOpenModal} />

      {/* H. Testimonials */}
      <TestimonialsSection />

      {/* I. Final CTA */}
      <CtaBanner onOpenModal={onOpenModal} />
    </>
  );
}
