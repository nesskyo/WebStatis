import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Marquee from '../components/landing/Marquee';
import Portfolio from '../components/landing/Portfolio';
import ClientLogos from '../components/landing/ClientLogos';
import Services from '../components/landing/Services';
import Stats from '../components/landing/Stats';
import Testimonials from '../components/landing/Testimonials';
import Blog from '../components/landing/Blog';
import Contact from '../components/landing/Contact';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
        <ClientLogos />
        <Services />
        <Stats />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
