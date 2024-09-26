import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// logo
import logo from "../public/images/QuranApp-logo-green.png"

function Navbar() {

  const navLink = ""
  const navLinkList = "ml-2 font-medium text-slate-50 px-4 hover:bg-white hover:text-black h-full flex items-center jutify-center"


  return (
    <nav className='navigation w-full h-[70px] bg-primary'>
      <div className="container h-full flex justify-between items-center">

        {/* logo */}
        <div className="logo">
          <Link href={'/'} className='flex h-full items-center gap-3'>
            <Image
              src={logo}
              width={30}
              height={30}
              alt='Quran Web'
            />

            <h3 className='font-bold text-xl text-slate-50'>Qur'An Web</h3>
          </Link>
        </div>

        {/* links */}
        <div className="links h-full">
          <ul className='list-none h-full flex flex-row'>
            <li className={navLinkList}>
              <a href="" className={navLink}>Home</a>
            </li>
            <li className={navLinkList}>
              <a href="" className={navLink}>Qur'An</a>
            </li>
            <li className={navLinkList}>
              <a href="" className={navLink}>Audio</a>
            </li>
            <li className={navLinkList}>
              <a href="" className={navLink}>Calendar</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar