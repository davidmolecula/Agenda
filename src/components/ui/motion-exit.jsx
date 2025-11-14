"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react"

export default function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div className="flex flex-column w-72 h-96 relative left-150" >
            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-96 h-96 bg-emerald-300 rounded-xl"
                        key="box"
                    />
                ) : null}
            </AnimatePresence>
            <motion.button
                className="bg-emerald-300 rounded-xl p-3 color-black absolute left-0 bottom-0 right-0"
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {isVisible ? "Hide" : "Show"}
            </motion.button>
        </div>
    )
}



