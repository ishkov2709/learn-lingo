import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <div className="container hero">
          <div className="aboutWrapper">
            <h1 className="title">
              Unlock your potential with the best{" "}
              <span className="accent">language</span> tutors
            </h1>

            <p className="text">
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <Link href="/">Get started</Link>
          </div>
          {/* <Image src={} /> */}
        </div>
      </section>
      <section>
        <div className="container hero"></div>
      </section>
    </main>
  );
}
