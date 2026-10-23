import Navbar from "@/components/biryani/navbar";
import Welcome from "@/components/biryani/welcome";
import PhoneOrder from "@/components/biryani/phone-order";
import Gallery from "@/components/biryani/gallery";
import Footer from "@/components/biryani/footer";
import CustomerReviews from "@/components/biryani/customer-reviews";
import OrderStatusCard from "@/components/biryani/order-status-card";

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-espresso outline-none">
      <Welcome />
      <PhoneOrder />
      <Gallery />
      <CustomerReviews />
    </main>
    <Footer />
    <OrderStatusCard />
  </>;
}
