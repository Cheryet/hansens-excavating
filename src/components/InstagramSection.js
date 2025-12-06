'use client';

import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import InstagramPost from './InstagramPost';

const InstagramSection = ({ postUrls = [] }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section 
      className="py-20 sm:py-24 md:py-32 px-4 bg-white"
      aria-labelledby="instagram-heading"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div 
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="w-12 h-1 bg-red-600 mx-auto mb-8 sm:mb-10"></div>
          <h2 id="instagram-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 sm:mb-6 tracking-tight">Follow Our Work</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10">
            See our latest excavation projects and equipment in action
          </p>
          
          {/* Follow Button */}
          <a
            href="https://www.instagram.com/hansens_excavating/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
            aria-label="Follow Hansen's Excavating on Instagram (opens in new tab)"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            <span>@hansens_excavating</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Instagram Posts Grid */}
        {postUrls.length > 0 ? (
          <motion.div 
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            role="list"
            aria-label="Instagram posts from Hansen's Excavating"
          >
            {postUrls.map((url, index) => (
              <div key={index} className="flex justify-center" role="listitem">
                <InstagramPost url={url} />
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600">Instagram posts will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramSection;
