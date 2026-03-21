import Navbar from "@/components/Navbar";
import SEOContent from "@/components/SEOContent";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import InstagramCTA from "@/components/InstagramCTA";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <SEOContent />
      <main>
        <Hero />
        <About />
        <Programs />
        <Impact />
        <InstagramCTA />
        <Donate />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
