import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/cart";
import {
  About,
  CombosSection,
  Footer,
  FloatingWhatsApp,
  Gallery,
  Hero,
  Location,
  MenuSection,
  MobileBar,
  Navbar,
  Offers,
  PartySection,
  QuickActions,
  Reviews,
  WhyUs,
} from "@/components/sections";
import { business, directionsUrl } from "@/data/site";

const title = "KGN Mandi House | Mandi & Biryani Restaurant in Bhubaneswar";
const description =
  "KGN Mandi House in Kalinganagar, Bhubaneswar — enjoy flavorful chicken mandi, biryani, family packs and party combos. Order now or book your celebration.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant.restaurant" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: business.name,
          description,
          servesCuisine: ["Mandi", "Biryani", "Indian", "Mughlai"],
          telephone: `+91${business.phone}`,
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "7QCG+PXV, Ghatikia Main Rd, Khaogali, Kalinganagar",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            postalCode: "751029",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.geo.lat,
            longitude: business.geo.lng,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "11:00",
              closes: "23:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.rating,
            reviewCount: business.reviewCount,
          },
          hasMap: directionsUrl,
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <QuickActions />
        <Offers />
        <MenuSection />
        <PartySection />
        <CombosSection />
        <WhyUs />
        <About />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBar />
    </CartProvider>
  );
}
