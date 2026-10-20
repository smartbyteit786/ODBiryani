import Navbar from "@/components/biryani/navbar";
import Welcome from "@/components/biryani/welcome";
import PhoneOrder from "@/components/biryani/phone-order";
import Gallery from "@/components/biryani/gallery";
import Footer from "@/components/biryani/footer";

export default function Home() {
  return <>
    <Navbar />
    <main className="min-h-screen bg-espresso">
      <Welcome />
      <PhoneOrder />
      <Gallery />
    </main>
    <Footer />
  </>;
}
