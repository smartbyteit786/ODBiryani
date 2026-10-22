import { BadgeCheck, MessageSquareHeart, Quote, Star } from "lucide-react";
import ReviewForm from "@/components/biryani/review-form";
import published from "@/data/customer-reviews.json";

type PublishedReview = { id: string; displayName: string; rating: number; review: string; month: string; verifiedOrder: true };

export default function CustomerReviews() {
  const reviews = published as PublishedReview[];
  return <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 border-t border-espresso/10 bg-cream px-5 py-16 text-espresso md:py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-bold tracking-[0.2em] text-ember uppercase">A place at our table</p>
        <h2 id="reviews-heading" className="font-display text-4xl font-semibold leading-tight md:text-5xl">From our customers.</h2>
        <p className="mt-4 text-base leading-relaxed text-espresso/70">A good meal brings people back. Your honest feedback helps us make the next one even better.</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          {reviews.length ? <div className="space-y-4">{reviews.map(review => <article key={review.id} className="rounded-3xl border border-espresso/10 bg-parchment p-6 sm:p-8">
            <div role="img" aria-label={`${review.rating} out of 5 stars`} className="mb-5 flex gap-1 text-ember">{[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-current" : "text-espresso/20"}`} aria-hidden="true" />)}</div>
            <blockquote className="whitespace-pre-wrap break-words text-base leading-relaxed text-espresso/85">“{review.review}”</blockquote>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-espresso/10 pt-4"><p className="font-semibold">{review.displayName}</p><span className="flex items-center gap-1.5 text-xs font-semibold text-leaf"><BadgeCheck className="h-4 w-4" aria-hidden="true" />Verified order</span></div>
            <time dateTime={review.month} className="mt-2 block text-xs text-espresso/60">{new Date(`${review.month}-15T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</time>
          </article>)}</div> : <div className="relative overflow-hidden rounded-3xl bg-espresso p-7 text-cream sm:p-9">
            <Quote className="mb-8 h-10 w-10 text-saffron" aria-hidden="true" />
            <h3 className="font-display text-3xl leading-tight">Your table.<br />Your story.</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">Ordered from ODB? Tell us how it went. Reviews will appear here after we match them to completed orders.</p>
            <div className="mt-8 flex items-start gap-3 border-t border-cream/15 pt-5 text-sm text-cream/80"><MessageSquareHeart className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" /><span>No published reviews yet. Be the first to share your experience.</span></div>
          </div>}
          <div className="mt-6 rounded-2xl border border-espresso/10 p-5 text-sm leading-relaxed text-espresso/70"><h3 className="mb-2 font-semibold text-espresso">Real orders. Honest feedback.</h3><p>We check the order before publishing a review. Positive and negative feedback follow the same rules. Spam, personal information and abusive content are not published.</p><p className="mt-2">Names and phone numbers alone do not prove a purchase. “Verified order” means ODB matched the review to a completed order.</p></div>
        </div>
        <ReviewForm />
      </div>
    </div>
  </section>;
}
