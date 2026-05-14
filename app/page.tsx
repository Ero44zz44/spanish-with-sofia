import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Lessons from "@/components/sections/Lessons";
import HowItWorks from "@/components/sections/HowItWorks";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Lessons />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
