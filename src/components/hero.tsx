/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ChevronDown, Mouse, MousePointer } from 'lucide-react';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { BackgroundBeams } from './hero-background';
import SplashCursor from './cursor-splash';
import { TextLoop } from '@/components/text-loop';

const heroContent = [
  { text: 'portfolio', emoji: '💼', bgColor: 'bg-blue-100', description: 'showcasing my work' },
  { text: 'laboratory', emoji: '🧪', bgColor: 'bg-emerald-100', description: 'of digital experiments' },
  { text: 'canvas', emoji: '🎨', bgColor: 'bg-amber-100', description: 'for creative coding' },
  { text: 'hub', emoji: '🌐', bgColor: 'bg-rose-100', description: 'of frontend mastery' },
  { text: 'studio', emoji: '🎨', bgColor: 'bg-purple-100', description: 'for digital creations' },
  { text: 'gallery', emoji: '🖼️', bgColor: 'bg-teal-100', description: 'of web projects' },
  { text: 'laboratory', emoji: '🧪', bgColor: 'bg-emerald-100', description: 'of web experiments' },
];

const textLoopVariants = {
  initial: { y: 20, rotateX: 90, opacity: 0, filter: 'blur(4px)' },
  animate: { y: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)' },
  exit: { y: -20, rotateX: -90, opacity: 0, filter: 'blur(4px)' }
};

const textLoopTransition = {
  type: 'spring',
  stiffness: 900,
  damping: 80,
  mass: 10
};

function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-background/[0.96]"
      ref={container}
    >
      <div className="relative h-screen z-10 ">
        {/* <SplashCursor/> */}
        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center px-4 md:px-6 space-y-4">
            <h1 className="text-4xl font-bold text-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Welcome to my
            </h1>
            <div className="flex items-center gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <TextLoop
                className="overflow-y-clip"
                transition={textLoopTransition}
                variants={textLoopVariants}
              >
                {heroContent.map((content, index) => (
                  <span key={index} className="flex items-center gap-3 pt-20 pb-4">
                    <span className='text-4xl font-bold text-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>{content.text}</span>
                    <span className={`inline-flex items-center justify-center rounded-full ${content.bgColor} w-22 h-22 md:w-32 md:h-32`}>
                      {content.emoji}
                    </span>
                  </span>
                ))}
              </TextLoop>
            </div>
            <p className="text-muted-foreground text-lg md:text-xl mt-4 text-center max-w-2xl">
              <TextLoop
                className="overflow-y-clip"
                transition={textLoopTransition}
                variants={textLoopVariants}
              >
                {heroContent.map((content, index) => (
                  <span key={index} className="block text-4xl ">
                    {content.description}
                  </span>
                ))}
              </TextLoop>
            </p>
          </div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.div
              className="relative cursor-pointer group flex items-center flex-col pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleScrollDown}
            >
              <motion.div
                className=" -top-8 left-1/2 -translate-x-1/2 text-sm font-medium bg-background/80 backdrop-blur-sm px-4 py-1 rounded-full "
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, 10] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <TextLoop
                className="overflow-y-clip"
                transition={textLoopTransition}
                variants={textLoopVariants}
              >
                {heroContent.map((content, index) => (
                  <span key={index} className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                    Discover {content.text}
                  </span>
                ))}
              </TextLoop>
              </motion.div>
              <motion.div
                className="relative w-8 h-14 rounded-full border-2 border-muted-foreground/30 p-1.5 group-hover:border-muted-foreground/50 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full mx-auto"
                  animate={{
                    y: [0, 20, 0],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent"
                  animate={{
                    borderColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)'],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    y: [0, 3, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, 3, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
}

export default Hero;