import Hero from "@/components/sections/Hero";
import WhyNothingElseWorked from "@/components/sections/WhyNothingElseWorked";
import About from "@/components/sections/About";
import Lessons from "@/components/sections/Lessons";
import StudentResults from "@/components/sections/StudentResults";
import HowItWorks from "@/components/sections/HowItWorks";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyNothingElseWorked />
      <About />
      <Lessons />
      <StudentResults />
      <HowItWorks />
      <VideoTestimonials />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Contact />
    </>
  );
}
