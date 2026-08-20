/**
 * ALL editable business content lives in this file.
 * Restaurant owner: change text, prices and images here — nothing else needed.
 */

import heroMandi from "@/assets/hero-mandi.jpg";
import biryani from "@/assets/biryani.jpg";
import starters from "@/assets/starters.jpg";
import curry from "@/assets/curry.jpg";
import familyFeast from "@/assets/family-feast.jpg";
import party from "@/assets/party.jpg";
import restaurant from "@/assets/restaurant.jpg";
import drinks from "@/assets/drinks.jpg";

export const images = {
  heroMandi,
  biryani,
  starters,
  curry,
  familyFeast,
  party,
  restaurant,
  drinks,
};

export const business = {
  name: "KGN MANDI HOUSE",
  tagline: "Chicken Mandi • Biryani • Mughlai",
  phone: "8895286928",
  altPhone: "07606820276",
  whatsapp: "918895286928",
  address:
    "7QCG+PXV, Ghatikia Main Rd, Khaogali, Kalinganagar, Bhubaneswar, Odisha 751029",
  hours: { open: 11, close: 23, label: "11:00 AM – 11:00 PM" },
  rating: 4.8,
  reviewCount: 21,
  mapsQuery:
    "KGN+Mandi+House,+Ghatikia+Main+Rd,+Kalinganagar,+Bhubaneswar,+Odisha+751029",
  geo: { lat: 20.2725, lng: 85.7726 },
};

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${business.mapsQuery}`;
export const reviewsUrl = `https://www.google.com/maps/search/?api=1&query=${business.mapsQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${business.mapsQuery}&output=embed`;
export const telUrl = `tel:+91${business.phone}`;

export const waLink = (message: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

/** Currency helper (INR). */
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Open / closed status in Indian Standard Time. */
export function restaurantStatus() {
  const nowIst = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
  const h = nowIst.getHours() + nowIst.getMinutes() / 60;
  const isOpen = h >= business.hours.open && h < business.hours.close;
  return {
    isOpen,
    note: isOpen ? "Closes at 11:00 PM" : "Opens at 11:00 AM",
  };
}

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  veg?: boolean;
  spicy?: boolean;
};

export type MenuCategory = { id: string; name: string; items: MenuItem[] };

/**
 * NOTE: prices below are PLACEHOLDERS — replace with your actual menu prices.
 */
export const menu: MenuCategory[] = [
  {
    id: "mandi",
    name: "Chicken Mandi",
    items: [
      { id: "m1", name: "Quarter Chicken Mandi", desc: "Smoky roasted chicken over saffron mandi rice, served with mandi shorba.", price: 199, image: heroMandi },
      { id: "m2", name: "Half Chicken Mandi", desc: "Generous half chicken, fragrant long-grain rice, nuts and raisins.", price: 349, image: heroMandi },
      { id: "m3", name: "Full Chicken Mandi", desc: "Full chicken on a heaped mandi platter — perfect to share.", price: 649, image: heroMandi, spicy: true },
    ],
  },
  {
    id: "biryani",
    name: "Biryani",
    items: [
      { id: "b1", name: "Chicken Dum Biryani", desc: "Slow-cooked dum biryani with aromatic spices and fried onions.", price: 199, image: biryani, spicy: true },
      { id: "b2", name: "Special Chicken Biryani", desc: "Our powerful chicken biryani — an explosion of taste and aroma.", price: 249, image: biryani, spicy: true },
      { id: "b3", name: "Egg Biryani", desc: "Masala eggs layered with basmati rice and herbs.", price: 149, image: biryani },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    items: [
      { id: "s1", name: "Chicken Seekh Kebab", desc: "Char-grilled minced chicken skewers with mint chutney.", price: 179, image: starters, spicy: true },
      { id: "s2", name: "Chicken Tikka", desc: "Tandoor-roasted boneless chicken, smoky and juicy.", price: 199, image: starters },
      { id: "s3", name: "Crispy Onion Rings", desc: "Golden fried onion rings with house dip.", price: 99, image: starters, veg: true },
    ],
  },
  {
    id: "main",
    name: "Main Course",
    items: [
      { id: "c1", name: "Butter Chicken", desc: "Creamy tomato gravy, tandoori chicken, finished with butter.", price: 279, image: curry },
      { id: "c2", name: "Chicken Curry", desc: "Home-style chicken curry with roasted Indian spices.", price: 229, image: curry, spicy: true },
      { id: "c3", name: "Paneer Butter Masala", desc: "Soft paneer in rich makhani gravy.", price: 219, image: curry, veg: true },
    ],
  },
  {
    id: "family",
    name: "Family Packs",
    items: [
      { id: "f1", name: "Family Mandi Pack", desc: "Full chicken mandi, raita, shorba and salad. Serves 4.", price: 899, image: familyFeast },
      { id: "f2", name: "Family Biryani Pack", desc: "1 kg chicken biryani with raita and gravy. Serves 4.", price: 799, image: familyFeast },
    ],
  },
  {
    id: "combos",
    name: "Party Combos",
    items: [
      { id: "p1", name: "Celebration Combo", desc: "Mandi, biryani, kebabs and beverages. Serves 8.", price: 2499, image: party },
      { id: "p2", name: "Grand Party Combo", desc: "Mandi platters, biryani, starters and desserts. Serves 15.", price: 4499, image: party },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { id: "d1", name: "Sweet Lassi", desc: "Thick chilled yoghurt lassi.", price: 69, image: drinks, veg: true },
      { id: "d2", name: "Masala Lemonade", desc: "Fresh lime, mint and Indian masala.", price: 59, image: drinks, veg: true },
      { id: "d3", name: "Soft Drink", desc: "Chilled 300 ml bottle.", price: 40, image: drinks, veg: true },
    ],
  },
  {
    id: "addons",
    name: "Add-ons",
    items: [
      { id: "a1", name: "Extra Mandi Rice", desc: "A portion of saffron mandi rice.", price: 99, image: heroMandi, veg: true },
      { id: "a2", name: "Raita", desc: "Cooling cucumber and onion raita.", price: 39, image: drinks, veg: true },
      { id: "a3", name: "Butter Naan", desc: "Tandoor naan brushed with butter.", price: 45, image: curry, veg: true },
    ],
  },
];

export const bestSellers = [
  { name: "Chicken Mandi", label: "BEST SELLER", desc: "Smoky roasted chicken over saffron rice.", image: heroMandi },
  { name: "Chicken Biryani", label: "CUSTOMER FAVOURITE", desc: "Dum-cooked, aromatic, full of flavour.", image: biryani },
  { name: "Family Pack", label: "BEST SELLER", desc: "More people, more mandi, more memories.", image: familyFeast },
  { name: "Party Combo", label: "PARTY SPECIAL", desc: "Full paisa vasool celebration spread.", image: party },
];

export const comboPacks = [
  { name: "Mandi Family Pack", serves: "Serves 4", items: ["Full Chicken Mandi", "Raita & Salad", "Mandi Shorba"], price: 899, image: familyFeast },
  { name: "Biryani Family Pack", serves: "Serves 4", items: ["1 kg Chicken Biryani", "Raita", "Gravy"], price: 799, image: biryani },
  { name: "Celebration Combo", serves: "Serves 8", items: ["Mandi Platter", "Biryani", "Kebabs", "Beverages"], price: 2499, image: party },
];

export const partyTypes = [
  { title: "Birthday Parties", desc: "Mandi platters and biryani that make the day tastier." },
  { title: "Family Gatherings", desc: "Big portions, shared platters, happy families." },
  { title: "Office Parties", desc: "Easy bulk combos for teams and colleagues." },
  { title: "Small Celebrations", desc: "Compact combos for intimate get-togethers." },
  { title: "Friends Get-Together", desc: "Kebabs, biryani and mandi for the whole gang." },
  { title: "Anniversaries", desc: "A special meal for your special evening." },
];

export const whyUs = [
  { icon: "🍗", title: "Freshly Prepared", desc: "Every order is cooked fresh, never reheated." },
  { icon: "🔥", title: "Full of Flavour", desc: "Bold Indian spices in every single bite." },
  { icon: "🍚", title: "Authentic Mandi & Biryani", desc: "Traditional slow-cooked preparation." },
  { icon: "👨‍👩‍👧", title: "Family Friendly", desc: "Comfortable dining for families of all sizes." },
  { icon: "🎉", title: "Party Combos", desc: "Celebration-ready packs for any occasion." },
  { icon: "💰", title: "Value for Money", desc: "Generous portions — full paisa vasool." },
];

export const gallery = [
  { src: heroMandi, alt: "Chicken mandi platter at KGN Mandi House", cat: "Mandi" },
  { src: biryani, alt: "Chicken dum biryani served in a copper handi", cat: "Biryani" },
  { src: familyFeast, alt: "Family meal spread of biryani, mandi and curries", cat: "Family Meals" },
  { src: party, alt: "Party combo spread with mandi, biryani and drinks", cat: "Party Combos" },
  { src: restaurant, alt: "Warm dining area of KGN Mandi House", cat: "Restaurant" },
  { src: starters, alt: "Chicken seekh kebabs and starters platter", cat: "Customer Moments" },
  { src: curry, alt: "Butter chicken curry with naan", cat: "Family Meals" },
  { src: drinks, alt: "Lassi, masala lemonade and chilled drinks", cat: "Restaurant" },
];

export const galleryCats = ["All", "Mandi", "Biryani", "Family Meals", "Party Combos", "Restaurant", "Customer Moments"];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Offers", href: "#offers" },
  { label: "Party Booking", href: "#party" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
