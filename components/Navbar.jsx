'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'

// logo
import logo from "../public/images/QuranApp-logo-green.png"
import { usePathname } from 'next/navigation'


function Navbar() {

  const pathname = usePathname()
  console.log(pathname)

  const { setTheme } = useTheme()
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isTop, setIsTop] = useState(true)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      
      if (currentScrollY === 0) {
        setShowNavbar(true)
        setIsTop(true)
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true)
        setIsTop(false)
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false)
        setIsTop(false)
      }

      setLastScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  // nav link list design
  const navLinkList = "font-medium text-slate-50 px-6 hover:bg-white hover:text-black h-full flex items-center jutify-center"
  const dropdownItemClass = "cursor-pointer hover:!bg-emerald-500 hover:!text-white"


  return (
    <nav 
      className={`navigation w-full h-[70px] fixed top-0 duration-500
      ${showNavbar ? "translate-y-0 shadow-lg" : "-translate-y-[110%]"} ${isTop ? "bg-transparent shadow-none" : "bg-primary"}`}
    >
      <div className="container h-full flex justify-between items-center">

        {/* logo */}
        <div className="logo">
          <Link href={'/'} className='flex h-full items-center gap-3'>
            <Image
              src={logo}
              width={30}
              height={30}
              alt='Quran Web'
              className='w-auto h-auto'
            />

            <h3 className='font-bold text-xl text-slate-50'>Qur'An Web</h3>
          </Link>
        </div>

        {/* links */}
        <div className="links h-full flex justify-between items-center gap-4">
          <ul className='list-none h-full flex flex-row'>
            <li className={`${navLinkList} ${pathname == '/' && "navItem-active"}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={`${navLinkList} ${pathname.includes("/surah") && "navItem-active"}`}>
              <Link href="/surah">Surah</Link>
            </li>
            <li className={`${navLinkList} ${pathname.includes("/juz") && "navItem-active"}`}>
              <Link href="/juz">Juz</Link>
            </li>
            <li className={`${navLinkList} ${pathname.includes("/audio") && "navItem-active"}`}>
              <Link href="/audio">Audio</Link>
            </li>
            <li className={`${navLinkList} ${pathname.includes("/calendar") && "navItem-active"}`}>
              <Link href="/calendar">Calendar</Link>
            </li>
          </ul>

          {/* theme toggle button */}
          <div className="theme-btn">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="bg-white hover:bg-white text-primary outline-none">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className={dropdownItemClass} onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass} onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass} onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar