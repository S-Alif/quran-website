'use client'

import Footer from './Footer'
import Navbar from './Navbar'

function MainLayout({children}) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout