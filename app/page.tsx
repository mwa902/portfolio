import Hero             from "@/components/Hero";
import About            from "@/components/About";
import Skills           from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Contact          from "@/components/Contact";
import Footer           from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </>
  );
}
