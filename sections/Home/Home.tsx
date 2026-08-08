import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/sections/About/About";
import Amenities from "@/sections/Amenities/Amenities";
import Attractions from "@/sections/Attractions/Attractions";
import Contact from "@/sections/Contact/Contact";
import Gallery from "@/sections/Gallery/Gallery";
import Hero from "@/sections/Hero/Hero";
import Rooms from "@/sections/Rooms/Rooms";
import Testimonials from "@/sections/Testimonials/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Attractions />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
