"use client"

import { motion } from "framer-motion"
import { InitialLoader } from "./initial-loader"
import { useEffect, useState } from "react"

export function HomeLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Check if this is the first load
    const hasLoaded = sessionStorage.getItem("hasLoadedHome")
    if (hasLoaded) {
      setIsFirstLoad(false)
    } else {
      sessionStorage.setItem("hasLoadedHome", "true")
    }
  }, [])

  if (!isFirstLoad) {
    return <>{children}</>
  }

  return (
    <>
      <InitialLoader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  )
}
