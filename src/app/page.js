'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { instagramPostUrls } from '@/data/instagramPosts';

// Lazy load Instagram section since it's below the fold
const InstagramSection = dynamic(() => import('@/components/InstagramSection'), {
  loading: () => <div className="py-20 text-center text-gray-400">Loading...</div>,
  ssr: false
});
import { 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Construction, 
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Shovel,
  Settings,
  Fuel,
  Recycle,
  Home as HomeIcon,
  Wrench,
  Minus,
  Plus
} from 'lucide-react';
import siteData from '@/lib/siteData';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  
  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 500, 700], [1, 1, 0.3]);
  
  // Stats counter trigger
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Service images mapping
  const serviceImages = {
    "Excavation": "/excavation.webp",
    "Trucking": "/trucking.webp", 
    "Grading": "/grading.webp",
    "Oil & Gas": "/oilfeild.webp",
    "Land Reclamation": "/landrec.webp",
    "Acreage Development": "/acerage.webp",
    "Sewage Design and Installation": "/sewage.webp",
    "Trenching": "/trench.webp",
    "And More!": "/andmore.webp"
  };

  // Service icons mapping
  const serviceIcons = {
    "Excavation": Shovel,
    "Trucking": Truck,
    "Grading": Settings,
    "Oil & Gas": Fuel,
    "Land Reclamation": Recycle,
    "Acreage Development": HomeIcon,
    "Sewage Design and Installation": Wrench,
    "Trenching": Minus,
    "And More!": Plus
  };

  // Timeline images mapping
  const timelineImages = {
    1976: "/old2.webp",
    1989: "/trucksold.webp", 
    2022: "/IMG_3981.jpeg"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-[100] font-semibold"
        tabIndex={1}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header 
        className="border-b border-gray-200 bg-white/98 backdrop-blur-md sticky top-0 z-50 shadow-sm"
        role="banner"
        aria-label="Site navigation"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo - responsive sizing */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/hansens red (1).svg"
              alt="Hansen's Excavating & Trucking Company Logo - Established 1976"
              width={50}
              height={50}
              className="h-10 sm:h-12 w-auto"
            />
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-black leading-tight tracking-tight">{siteData.company.name}</h1>
              <p className="text-xs text-gray-600 font-medium hidden sm:block">Est. {siteData.company.since}</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <a 
              href="#services" 
              className="text-black hover:text-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Navigate to Services section"
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-black hover:text-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Navigate to About Us section"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-black hover:text-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Navigate to Contact section"
            >
              Contact
            </a>
            <Button 
              className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white font-semibold shadow-lg"
              aria-label={`Call Hansen's Excavating at ${siteData.company.contact.phone}`}
              asChild
            >
              <a href={`tel:${siteData.company.contact.phone}`}>
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                {siteData.company.contact.phone}
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 text-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg"
            aria-label={mobileMenuOpen ? "Close mobile navigation menu" : "Open mobile navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-red-100 bg-white"
            >
              <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Mobile navigation">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="#services" 
                    className="text-black hover:text-red-600 hover:bg-red-50 transition-colors font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </a>
                  <a 
                    href="#about" 
                    className="text-black hover:text-red-600 hover:bg-red-50 transition-colors font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="#contact" 
                    className="text-black hover:text-red-600 hover:bg-red-50 transition-colors font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <Separator className="my-2" />
                  <a 
                    href={`tel:${siteData.company.contact.phone}`}
                    className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    <span>Call {siteData.company.contact.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${siteData.company.contact.email}`}
                    className="flex items-center justify-center space-x-2 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span>Email Us</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Immersive & Industrial */}
      <main id="main-content" role="main">
        <section 
          className="relative min-h-screen flex items-center py-20 sm:py-24 md:py-32 px-4 overflow-hidden bg-black"
          aria-labelledby="hero-heading"
        >
          {/* Parallax background image */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY }}
          >
            <Image
              src="/doser.jpg"
              alt="Professional excavation equipment operated by Hansen's team in Southern Alberta"
              fill
              className="object-cover object-center scale-110"
              priority
              quality={95}
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            
            {/* Dirt/grain texture overlay */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}></div>
          </motion.div>
          
          {/* Animated diagonal lines - industrial feel */}
          <div className="absolute inset-0 z-[1] opacity-[0.03] overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)`,
            }}></div>
          </div>
          
          {/* Red accent bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 z-10"></div>

          <motion.div 
            className="container mx-auto text-center relative z-10"
            style={{ opacity: heroOpacity }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Industry badge */}
              <div className="inline-flex items-center space-x-3 mb-8 sm:mb-10">
                <div className="h-px w-8 sm:w-12 bg-red-500"></div>
                <span className="text-red-500 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
                  Oil & Gas • Land Reclamation • Earthmoving
                </span>
                <div className="h-px w-8 sm:w-12 bg-red-500"></div>
              </div>

              <h1 
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-[1.05] tracking-tight"
              >
                Hansen's<br className="sm:hidden" /> Excavating
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-400 mt-2">& Trucking</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                {siteData.company.tagline}
              </p>

              {/* Bold CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0 mb-16 sm:mb-20">
                <a 
                  href={`tel:${siteData.company.contact.phone}`}
                  className="group w-full sm:w-auto inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-lg shadow-2xl shadow-red-900/30 transform hover:scale-[1.02] transition-all duration-300"
                  aria-label={`Call Hansen's Excavating at ${siteData.company.contact.phone}`}
                >
                  <Phone className="h-5 w-5 mr-2 group-hover:animate-pulse" aria-hidden="true" />
                  {siteData.company.contact.phone}
                </a>
                
                <a 
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white/30 text-white hover:bg-white hover:text-black font-semibold text-base sm:text-lg px-8 py-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  aria-label="Get a free quote"
                >
                  Request Quote
                  <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
            
            {/* Animated Stats Counter */}
            <motion.div 
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                  {statsInView ? <CountUp end={50} duration={2.5} suffix="+" /> : '0+'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Years</div>
              </div>
              <div className="text-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                  {statsInView ? <CountUp end={3} duration={2} /> : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Generations</div>
              </div>
              <div className="text-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500 mb-1">
                  {statsInView ? <CountUp end={1000} duration={2.5} suffix="+" /> : '0+'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                  {statsInView ? <CountUp end={100} duration={2} suffix="%" /> : '0%'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Family Owned</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-white/50" />
          </motion.div>
        </section>
      </main>

      {/* Mission Section - Clean & Bold */}
      <section 
        className="relative py-20 sm:py-24 md:py-32 px-4 bg-gray-50 overflow-hidden"
        aria-labelledby="mission-heading"
      >
        {/* Subtle diagonal texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            {/* Red accent line */}
            <div className="w-12 h-1 bg-red-600 mx-auto mb-8 sm:mb-10"></div>
            
            <h2 
              id="mission-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-6 sm:mb-8 leading-tight tracking-tight"
            >
              {siteData.mission.headline}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              {siteData.mission.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Industrial Grid */}
      <section 
        id="services" 
        className="relative py-20 sm:py-24 md:py-32 px-4 bg-neutral-900 overflow-hidden"
        aria-labelledby="services-heading"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
        
        {/* Red accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-3 mb-6">
              <Shovel className="h-5 w-5 text-red-500" aria-hidden="true" />
              <span className="text-red-500 font-bold tracking-[0.15em] text-xs sm:text-sm uppercase">Our Capabilities</span>
              <Truck className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <h2 
              id="services-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 tracking-tight"
            >
              What We Do
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
              Heavy equipment and expertise for Alberta's toughest jobs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {(showAllServices ? siteData.services : siteData.services.slice(0, 6)).map((service, index) => (
              <motion.div 
                key={service} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={service === "And More!" ? "hidden lg:block" : ""}
              >
                <div 
                  className="group relative h-36 sm:h-44 md:h-52 rounded-lg overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500"
                  role="article"
                  aria-labelledby={`service-${index}-title`}
                >
                  {/* Service Image */}
                  <Image
                    src={serviceImages[service]}
                    alt={`Professional ${service.toLowerCase()} services by Hansen's Excavating`}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    quality={80}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  />
                  
                  {/* Dark overlay with red tint on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:from-red-900/90 group-hover:via-black/70 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                    <div className="flex items-center space-x-2 mb-1">
                      {(() => {
                        const IconComponent = serviceIcons[service];
                        return <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 group-hover:text-red-400 transition-colors" aria-hidden="true" />;
                      })()}
                      <h3 
                        id={`service-${index}-title`}
                        className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight"
                      >
                        {service}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-red-600/0 group-hover:border-t-red-600 border-l-[40px] border-l-transparent transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See More Button */}
          {siteData.services.length > 6 && (
            <motion.div {...fadeInUp} className="text-center mt-10 sm:mt-12">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="group inline-flex items-center space-x-2 border border-white/20 hover:border-red-500 text-white hover:text-red-400 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                aria-expanded={showAllServices}
              >
                <span>{showAllServices ? 'Show Less' : 'See All Services'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllServices ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section - Heritage & Legacy */}
      <section id="about" className="relative overflow-hidden">
        {/* Hero-style intro with stylized background */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-4 py-24 sm:py-32 bg-neutral-900">
          {/* Layered background effects */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black"></div>
            
            {/* Topographic/contour lines pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath d='M0 100 Q50 60 100 100 T200 100' fill='none' stroke='%23fff' stroke-width='1'/%3E%3Cpath d='M0 60 Q50 20 100 60 T200 60' fill='none' stroke='%23fff' stroke-width='1'/%3E%3Cpath d='M0 140 Q50 100 100 140 T200 140' fill='none' stroke='%23fff' stroke-width='1'/%3E%3Cpath d='M0 180 Q50 140 100 180 T200 180' fill='none' stroke='%23fff' stroke-width='1'/%3E%3Cpath d='M0 20 Q50 -20 100 20 T200 20' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}></div>
            
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.15]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Red glow accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[100px] rounded-full"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 sm:left-20 w-20 h-20 border border-white/5 rounded-full"></div>
            <div className="absolute top-40 right-10 sm:right-32 w-32 h-32 border border-white/5 rounded-full"></div>
            <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-red-500/10 rounded-full"></div>
          </div>
          
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-12 bg-red-500"></div>
                <span className="text-red-500 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">Our Heritage</span>
                <div className="h-px w-12 bg-red-500"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-tight">
                Three Generations.<br />
                <span className="text-red-500">One Legacy.</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                {siteData.about.description}
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-red-500" aria-hidden="true" />
                  <span className="text-white font-semibold">Family Owned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-red-500" aria-hidden="true" />
                  <span className="text-white font-semibold">3 Generations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-500" aria-hidden="true" />
                  <span className="text-white font-semibold">Taber, Alberta</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Red accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
        </div>
        
        {/* Timeline Section - Industrial Style */}
        <div className="relative bg-neutral-900 py-20 sm:py-24 md:py-32 px-4 overflow-hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}></div>
          
          {/* Red accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline line - vertical on left */}
              <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-600/50 to-transparent"></div>
              
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-12 sm:space-y-16"
              >
                {siteData.about.history.map((milestone, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-4 sm:left-8 top-0 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-red-600 border-4 border-neutral-900 shadow-lg shadow-red-600/30"></div>
                    </div>
                    
                    {/* Year label */}
                    <div className="mb-4">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600">{milestone.year}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className="group flex flex-col md:flex-row gap-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 hover:border-red-500/30 transition-all duration-500">
                      {/* Image */}
                      <div className="relative w-full md:w-64 h-48 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={timelineImages[milestone.year]}
                          alt={`Hansen's Excavating - ${milestone.title}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, 256px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      {/* Text content */}
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">{milestone.title}</h4>
                        <p className="text-gray-400 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Timeline end node */}
              <div className="absolute left-4 sm:left-8 bottom-0 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-red-600/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Earthy & Industrial */}
      <section className="relative py-20 sm:py-24 md:py-32 px-4 bg-neutral-800 overflow-hidden">
        {/* Dirt/gravel texture overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
        
        {/* Diagonal stripes - construction/hazard feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)`,
        }}></div>
        
        {/* Red accent gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-700 via-red-600 to-red-700"></div>
        
        {/* Subtle excavator silhouette watermark */}
        <div className="absolute right-0 bottom-0 w-64 h-64 sm:w-80 sm:h-80 opacity-[0.04]">
          <Construction className="w-full h-full text-white" />
        </div>
        
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div {...fadeInUp}>
            {/* Small badge */}
            <div className="inline-flex items-center space-x-2 mb-6 sm:mb-8">
              <Fuel className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-medium">Oil & Gas • Land Reclamation</span>
              <Recycle className="h-4 w-4 text-red-500" aria-hidden="true" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 tracking-tight">
              Ready to Break Ground?
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-10 sm:mb-12 max-w-xl mx-auto">
              Trusted by oil & gas companies and contractors across Southern Alberta for large-scale excavation and land reclamation projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`tel:${siteData.company.contact.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                {siteData.company.contact.phone}
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-gray-600 text-white hover:bg-white hover:text-black hover:border-white font-semibold text-base sm:text-lg px-8 py-4 rounded-lg transition-all duration-200"
              >
                Request Quote
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Instagram Section */}
      <InstagramSection postUrls={instagramPostUrls} />

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-24 md:py-32 px-4 bg-gray-50 overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-1 bg-red-600 mx-auto mb-8 sm:mb-10"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-3 sm:mb-4 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-gray-600">Ready to start your project? We're here to help.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Contact Information */}
            <motion.div {...fadeInUp} className="h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-black">
                    <Users className="h-5 w-5 text-red-600" aria-hidden="true" />
                    <span className="text-black">Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 flex-1">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">Main Office</p>
                      <a href={`tel:${siteData.company.contact.phone}`} className="text-gray-900 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">{siteData.company.contact.phone}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">{siteData.company.contact.owner} (Owner)</p>
                      <a href={`tel:${siteData.company.contact.ownerPhone}`} className="text-gray-900 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">{siteData.company.contact.ownerPhone}</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">{siteData.company.contact.operator} (Operator)</p>
                      <a href={`tel:${siteData.company.contact.operatorPhone}`} className="text-gray-900 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">{siteData.company.contact.operatorPhone}</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">{siteData.company.contact.operator2} (Operator)</p>
                      <a href={`tel:${siteData.company.contact.operator2Phone}`} className="text-gray-900 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">{siteData.company.contact.operator2Phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">Email</p>
                      <a href={`mailto:${siteData.company.contact.email}`} className="text-gray-900 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded">{siteData.company.contact.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-black">Location</p>
                      <p className="text-gray-900">{siteData.company.location.address}</p>
                      <p className="text-gray-900">
                        {siteData.company.location.city}, {siteData.company.location.province} {siteData.company.location.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeInUp} className="h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-black">Request a Quote</CardTitle>
                  <CardDescription className="text-gray-700">
                    Tell us about your project and we'll get back to you with a free estimate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <form 
                    className="space-y-4 h-full flex flex-col" 
                    aria-label="Request a quote form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target;
                      const name = form.name.value;
                      const phone = form.phone.value;
                      const email = form.email.value;
                      const service = form.service.value;
                      const message = form.message.value;
                      
                      const subject = encodeURIComponent('Quote Request from Website');
                      const body = encodeURIComponent(
`New quote request from Hansen's Excavating website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Service Needed: ${service || 'Not specified'}

Project Details:
${message || 'No details provided'}

---
Sent from hansensexcavating.com`
                      );
                      
                      window.location.href = `mailto:${siteData.company.contact.email}?subject=${subject}&body=${body}`;
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-black font-medium">Name <span className="text-red-600">*</span></Label>
                        <Input id="name" name="name" placeholder="Your name" required aria-required="true" className="focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-black font-medium">Phone <span className="text-red-600">*</span></Label>
                        <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required aria-required="true" className="focus:ring-2 focus:ring-red-500" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-black font-medium">Email <span className="text-red-600">*</span></Label>
                      <Input id="email" name="email" type="email" placeholder="Your email address" required aria-required="true" className="focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                      <Label htmlFor="service" className="text-black font-medium">Service Needed</Label>
                      <Input id="service" name="service" placeholder="e.g., Excavation, Trucking, Grading" className="focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-black font-medium">Project Details</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Tell us about your project..."
                        className="min-h-[120px] focus:ring-2 focus:ring-red-500"
                        aria-describedby="message-hint"
                      />
                      <p id="message-hint" className="text-sm text-gray-700 mt-1">Describe your project requirements, timeline, and any specific needs.</p>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white font-semibold"
                      aria-label="Submit quote request form"
                    >
                      <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                      Send Request
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      This will open your email app with the form details pre-filled.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 sm:py-16 px-4" role="contentinfo" aria-label="Site footer">
        {/* Red accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/hansens red (1).svg"
                  alt="Hansen's Excavating logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">{siteData.company.name}</h3>
                  <p className="text-xs text-gray-500">Est. {siteData.company.since}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Southern Alberta's trusted excavation and trucking partner for over 50 years.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wide">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400" aria-label="Our services">
                {siteData.services.slice(0, 5).map((service, index) => (
                  <li key={index} className="hover:text-white transition-colors">{service}</li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wide">Contact</h4>
              <address className="space-y-2 text-sm text-gray-400 not-italic">
                <p>
                  <a href={`tel:${siteData.company.contact.phone}`} className="hover:text-white transition-colors">
                    {siteData.company.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteData.company.contact.email}`} className="hover:text-white transition-colors">
                    {siteData.company.contact.email}
                  </a>
                </p>
              </address>
            </div>
            
            {/* Location */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wide">Location</h4>
              <address className="text-sm text-gray-400 not-italic space-y-1">
                <p>{siteData.company.location.address}</p>
                <p>{siteData.company.location.city}, {siteData.company.location.province}</p>
                <p>{siteData.company.location.postalCode}</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8">
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
