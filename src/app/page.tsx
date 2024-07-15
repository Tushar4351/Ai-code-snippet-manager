import Banner from "@/components/HomeComponents/Banner";
import CallToAction from "@/components/HomeComponents/CallToAction";
import FAQs from "@/components/HomeComponents/FAQs";
import Features from "@/components/HomeComponents/Features";
import Footer from "@/components/HomeComponents/Footer";
import Hero from "@/components/HomeComponents/Hero";
import LogoTicker from "@/components/HomeComponents/LogoTicker";

import NavBar from "@/components/HomeComponents/NavBar";
import ProductShowcase from "@/components/HomeComponents/ProductShowcase";

export default function Home() {
  return (
    <>
      <Banner />
      <NavBar />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
      <Footer />
    </>
  );
}
