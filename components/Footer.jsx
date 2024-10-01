import { buttonVariants } from './ui/button'

const Footer = () => {
  return(
    <footer className="py-12 bg-black mb-[64px] md:mb-0">
      <div className="container">
        <div className="flex flex-col-reverse  md:flex-row md:justify-between gap-5 md:gap-0 items-center">
          <p className="text-white text-center md:text-start">The website is for everyone to use <br /> The code is public on <a href="https://github.com/S-Alif/quran-website" className="underline underline-offset-4 hover:text-emerald-400" target="_blank">github</a> and the apis are public as well</p>

          <div className="social-links flex gap-3">
            <a href="https://www.facebook.com/mohammad.alif.9469545/" target="_blank" className={buttonVariants({variant: "default", size: 'icon'})}>
              <i className="fa-brands fa-facebook-f dark:text-white"></i>
            </a>
            <a href="https://x.com/sagor_alif8920" target="_blank" className={buttonVariants({variant: "default", size: 'icon'})}>
              <i className="fa-brands fa-x-twitter dark:text-white"></i>
            </a>
            <a href="https://github.com/S-Alif" target="_blank" className={buttonVariants({ variant: "default", size: 'icon' })}>
              <i className="fa-brands fa-github dark:text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer