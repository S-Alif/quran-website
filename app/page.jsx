import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {

  const bgImgAddress = "https://images.unsplash.com/photo-1649297711865-3d7c4de3610f?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  

  return (
    <div className="home-page-wrapper">

      {/* home */}
      <section
        className="home w-full h-screen"
        id="home"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImgAddress})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container h-full flex justify-center items-center flex-col">
          <h3 className="text-white font-semibold text-3xl">Brothers and Sisters</h3>
          <h1 className="text-white font-bold text-6xl pt-2 pb-3">Assalamu Alaikum</h1>
          <p className="text-xl font-medium text-white text-center">Read Qur'An and get closer to almighty <span className="text-emerald-400 font-bold">ALLAH</span></p>
        </div>
      </section>

      {/* section 2 */}
      <section className="section-2 section" id="section-2">
        <div className="container">

          <h3 className="title text-center text-primary">Benefits of reading Qur'An</h3>
          <p className="text-center w-full max-w-[1000px] mx-auto text-pretty pt-5">Reading the Quran has many benefits, including getting closer to ALLAH and gaining more knowledge and wisdom. It also has scientific benefits, such as improving cognitive abilities and improving mental well-being. Physically, reading Qur'An can improve posture and hand-eye coordination. Consistent reading leads to a deeper understanding of Islam's teachings and brings peace in both this life and the life after.</p>

        </div>
      </section>

      {/* section 3 */}
      <section className="section-3 section bg-gray-100 dark:bg-zinc-900" id="section-3">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-5 lg:gap-11">
            
            <div className="text-wrap md:w-1/2 flex flex-col justify-center">
              <div className="text h-fit">
                <h3 className="title text-primary">What is Qur'An</h3>

                <p className="text-pretty pb-2 pt-5 w-full">The Quran is the holy book which Muslims recite and turn to for guidance in all aspects of their life.</p>
                <p className="text-pretty w-full pb-5">It is the last testament in a series of divine revelations from ALLAH. It comprises the unaltered and direct words of ALLAH, revealed through the Angel Gibrael, to the final Prophet, Muhammad (peace be upon him) some 1400 years ago.</p>

                <Link
                  href={"https://www.whyislam.org/originofquran/"}
                  target="_blank"
                  className={buttonVariants({ variant: 'default', size: "lg" })}
                >Read more</Link>
              </div>
            </div>

            <div className="image md:w-1/2">
              <img 
                className="rounded-md" 
                src="https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Qur\'An image"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
