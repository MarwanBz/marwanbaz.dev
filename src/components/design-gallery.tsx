"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

interface Design {
  id: number
  title: string
  description: string
  imageUrl: string
}

interface DesignGalleryProps {
  designs: Design[]
}

export function DesignGallery({ designs }: DesignGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openImage, setOpenImage] = useState(false)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % designs.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + designs.length) % designs.length)
  }

  const handelImage = () => {
    setOpenImage(true)
    
  } 
  return (
    <div className="space-y-8">
      <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={designs[currentIndex].imageUrl || "/placeholder.svg"}
              alt={designs[currentIndex].title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg cursor-pointer"
              onClick={handelImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{designs[currentIndex].title}</h3>
              <p className="text-sm">{designs[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <Dialog open={openImage} onOpenChange={setOpenImage}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 right-4 dark:bg-black bg-white/80 hover:bg-white">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <Image
              src={designs[currentIndex].imageUrl || "/placeholder.svg"}
              alt={designs[currentIndex].title}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={design.imageUrl || "/placeholder.svg"}
              alt={design.title}
              width={200}
              height={150}
              className={`rounded-lg object-cover w-full aspect-[4/3] ${
                index === currentIndex ? "ring-4 ring-blue-500" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}