import { buttonVariants } from './ui/button'

const Footer = () => {
  return(
    <footer className="section bg-black">
      <div className="container">
        <div className="flex justify-between items-center">
          <p className="text-white">The website is for everyone to use <br /> The code is public on <a href="https://github.com/S-Alif/quran-website" className="underline underline-offset-4 hover:text-emerald-400" target="_blank">github</a> and the apis are public as well</p>

          <div className="social-links flex gap-3">
            <a href="https://www.facebook.com/mohammad.alif.9469545/" target="_blank" className={buttonVariants({variant: "default", size: 'icon'})}>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://x.com/sagor_alif8920" target="_blank" className={buttonVariants({variant: "default", size: 'icon'})}>
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://github.com/S-Alif" target="_blank" className={buttonVariants({ variant: "default", size: 'icon' })}>
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer