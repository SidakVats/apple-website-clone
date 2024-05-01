import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState, useRef } from "react";
import React from "react";


const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const [shouldLoop, setShouldLoop] = useState(window.innerWidth >= 1024); // Set loop condition based on screen width
  const videoRef = useRef(null);

  const handleVideoSrcSet = () => {
    const isSmallScreen = window.innerWidth < 760;
    setVideoSrc(isSmallScreen ? smallHeroVideo : heroVideo);
    setShouldLoop(!isSmallScreen); // Set loop condition based on screen width
  };

  useEffect(() => {
    const handleResize = () => {
      handleVideoSrcSet();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Only run this effect once on mount

  useEffect(() => {
    // Autoplay the video when component mounts or videoSrc changes
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay was prevented
        console.error("Autoplay was prevented:", error);
      });
    }
  }, [videoSrc]); // Run effect when videoSrc changes

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            ref={videoRef}
            className="pointer-events-none"
            muted
            playsInline
            loop={shouldLoop} // Conditionally set loop based on screen width
            preload="auto"
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
