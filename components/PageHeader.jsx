import React from 'react'

function PageHeader({children, headline, bgImage}) {

  const backgroundImage = bgImage ? bgImage : "https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <section 
      className='page-header w-full h-[50vh]'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container h-full flex justify-center items-center flex-col">
        <h1 className='text-4xl font-semibold text-white pb-5'>{headline}</h1>
        {children && children}
      </div>
    </section>
  )
}

export default PageHeader