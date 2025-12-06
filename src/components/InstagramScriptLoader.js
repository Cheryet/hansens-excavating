'use client';

import { useEffect } from 'react';

const InstagramScriptLoader = () => {
  useEffect(() => {
    // Check if Instagram embed script is already loaded
    if (window.instgrm) {
      // If script exists, process any new embeds
      window.instgrm.Embeds.process();
    } else {
      // Load the Instagram embed script
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        // Process embeds once script is loaded
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default InstagramScriptLoader;
