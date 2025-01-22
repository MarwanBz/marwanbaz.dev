"use client"

import { Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { CustomCard } from "./custom-card"
import { motion } from "framer-motion"

interface ProfileInfoProps {
  name: string
  title?: string
  description: string
  imageUrl: string
  location?: string
  skills?: string[]
}

export function ProfileInfo({
  name,
  title,
  description,
  imageUrl,
  location,
  skills
}: ProfileInfoProps) {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { 
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { 
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);


  return (
    <CustomCard
      className="p-8 overflow-hidden"
      hover={false}
      // animation={{
      //   initial: true,
      //   hover: false,
      //   tap: false,
      // }}
    >
      <div className="flex items-start gap-6">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src={imageUrl}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        <div className="space-y-4 flex-1">
          <div>
            <motion.h2 
              className="text-[32px] font-medium text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {name}
            </motion.h2>
            {title && (
              <motion.p 
                className="text-[18px] text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {title}
              </motion.p>
            )}
          </div>
          
          <motion.div 
            className="flex gap-4 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{currentTime}</span>
            </div>
          </motion.div>

          <motion.p 
            className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {description}
          </motion.p>

          {skills && skills.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </CustomCard>
  )
}
