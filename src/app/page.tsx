import Navbar from "@/components/biryani/navbar";
import Welcome from "@/components/biryani/welcome";
import MealRequest from "@/components/biryani/meal-request";
import Gallery from "@/components/biryani/gallery";
import Footer from "@/components/biryani/footer";

export default function Home() {
  return <>
    <Navbar />
    <main className="min-h-screen bg-espresso">
      <Welcome />
      <MealRequest />
      <Gallery />
    </main>
    <Footer />
  </>;
}
