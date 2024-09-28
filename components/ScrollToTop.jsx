// components/ScrollToTop.js
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 1000) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 px-3 py-2 rounded-md bg-primary text-white shadow-lg transition-all duration-500 ${visible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </Button>
  );
}

export default ScrollToTop