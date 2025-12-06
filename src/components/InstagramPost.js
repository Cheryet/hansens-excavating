'use client';

import { useEffect, useRef } from 'react';

const InstagramPost = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Instagram embed script if not already loaded
    const loadInstagramScript = () => {
      if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    loadInstagramScript();

    // Re-process when component updates
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  // Generate the embed blockquote from the URL
  const embedHtml = `
    <blockquote 
      class="instagram-media" 
      data-instgrm-captioned
      data-instgrm-permalink="${url}?utm_source=ig_embed" 
      data-instgrm-version="14"
      style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:99.375%;">
      <div style="padding:16px;">
        <a href="${url}?utm_source=ig_embed" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank">
          <div style="display:flex; flex-direction:row; align-items:center;">
            <div style="background-color:#F4F4F4; border-radius:50%; height:40px; margin-right:14px; width:40px;"></div>
            <div style="display:flex; flex-direction:column; flex-grow:1; justify-content:center;">
              <div style="background-color:#F4F4F4; border-radius:4px; height:14px; margin-bottom:6px; width:100px;"></div>
              <div style="background-color:#F4F4F4; border-radius:4px; height:14px; width:60px;"></div>
            </div>
          </div>
          <div style="padding:19% 0;"></div>
          <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
            <svg width="50px" height="50px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(-511,-20)" fill="#000000">
                  <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886"></path>
                </g>
              </g>
            </svg>
          </div>
          <div style="padding-top:8px;">
            <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-weight:550; line-height:18px;">View this post on Instagram</div>
          </div>
          <div style="padding:12.5% 0;"></div>
        </a>
        <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin:8px 0 0; text-align:center;">
          <a href="${url}?utm_source=ig_embed" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; text-decoration:none;" target="_blank">
            A post shared by Hansen's Excavating & Trucking Ltd.
          </a>
        </p>
      </div>
    </blockquote>
  `;

  return (
    <div 
      ref={containerRef}
      className="instagram-post w-full flex justify-center"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};

export default InstagramPost;
