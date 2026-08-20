import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu as MenuIcon,
  X,
  Star,
  ShoppingBag,
  Clock,
  PartyPopper,
  ArrowRight,
  Utensils,
} from "lucide-react";
import {
  business,
  bestSellers,
  comboPacks,
  directionsUrl,
  gallery,
  galleryCats,
  images,
  inr,
  mapEmbedUrl,
  menu,
  navLinks,
  partyTypes,
  restaurantStatus,
  reviewsUrl,
  telUrl,
  waLink,
  whyUs,
} from "@/data/site";
import { useCart } from "@/components/cart";

const ORDER_MSG = `Hi ${business.name}, I would like to place an order.`;
const PARTY_MSG = `Hi ${business.name}, I want to enquire about a party booking.`;

/* ---------- small helpers ---------- */

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    const fallback = setTimeout(() => setSeen(true), 1500);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${seen ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-gold" : "text-copper"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl sm:text-4xl ${light ? "text-cream" : "text-foreground"}`}>{title}</h2>
      {sub && (
        <p className={`mt-3 text-sm sm:text-base ${light ? "text-cream/75" : "text-muted-foreground"}`}>{sub}</p>
      )}
    </div>
  );
}

function CtaStrip({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center">
      <span className="text-sm font-medium text-muted-foreground">{text}</span>
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
      >
        {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function StatusBadge({ light = false }: { light?: boolean }) {
  const [status, setStatus] = useState(restaurantStatus());
  useEffect(() => {
    const t = setInterval(() => setStatus(restaurantStatus()), 60000);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        light ? "bg-cream/10 text-cream" : "bg-muted text-foreground"
      }`}
    >
      <span aria-hidden="true">{status.isOpen ? "🟢" : "🔴"}</span>
      {status.isOpen ? "Open Now" : "Closed Now"}
      <span className={light ? "font-normal text-cream/70" : "font-normal text-muted-foreground"}>
        · {status.note}
      </span>
    </span>
  );
}

/* ---------- navbar ---------- */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brown/95 py-2 shadow-lift backdrop-blur" : "bg-brown/70 py-4 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 lg:flex lg:justify-between"
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src="/favicon.png"
            alt="KGN Mandi House logo"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-gold/50"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base text-cream sm:text-lg">
              {business.name}
            </span>
            <span className="block truncate text-[11px] text-gold">{business.tagline}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-cream/80 transition-colors hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-brown transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Order Now
            {count > 0 && (
              <span className="rounded-full bg-brown px-2 text-xs text-cream">{count}</span>
            )}
          </button>
          <a
            href={waLink(ORDER_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="rounded-full bg-green p-2 text-cream lg:hidden"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-cream lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="mx-4 mt-3 space-y-1 rounded-2xl bg-brown p-3 shadow-lift lg:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-cream/90 hover:bg-cream/10"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                setCartOpen(true);
              }}
              className="mt-1 w-full rounded-xl bg-gold px-3 py-2 text-sm font-semibold text-brown"
            >
              Order Now
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}

/* ---------- hero ---------- */

export function Hero() {
  const { setOpen } = useCart();
  return (
    <section id="home" className="surface-dark relative overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="pattern-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <StatusBadge light />
          <h1 className="mt-5 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Authentic Mandi. <span className="text-gold">Bold Flavours.</span> Every Bite.
          </h1>
          <p className="mt-5 max-w-xl text-base text-cream/80">
            Experience delicious chicken mandi, biryani and celebration-ready meals at KGN Mandi
            House.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-brown transition-transform hover:scale-[1.03]"
            >
              Order Now
            </button>
            <a
              href="#party"
              className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
            >
              Book a Party
            </a>
            <a
              href={telUrl}
              className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:border-gold"
            >
              Call Now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-cream/75">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 font-semibold text-gold">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" /> {business.rating} ★
              Google Rating
            </span>
            <span>Freshly Prepared • Family Friendly • Party Combos</span>
          </div>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full bg-gold/15 blur-3xl"
            aria-hidden="true"
          />
          <img
            src={images.heroMandi}
            alt="Chicken mandi platter with saffron rice served at KGN Mandi House"
            width={1408}
            height={1104}
            fetchPriority="high"
            className="relative w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- quick actions ---------- */

const quickActions = [
  { icon: "🍗", label: "Order Food", href: "#menu" },
  { icon: "📞", label: "Call", href: telUrl },
  { icon: "💬", label: "WhatsApp", href: waLink(ORDER_MSG) },
  { icon: "📍", label: "Directions", href: directionsUrl },
  { icon: "🎉", label: "Party Booking", href: "#party" },
];

export function QuickActions() {
  return (
    <section aria-label="Quick actions" className="relative z-10 -mt-8 px-4">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-3xl bg-card p-4 shadow-lift sm:grid-cols-5">
        {quickActions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            target={a.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-muted/70 px-3 py-4 text-center text-sm font-semibold transition-colors hover:bg-gold/25 max-sm:last:col-span-2"
          >
            <span className="text-xl" aria-hidden="true">
              {a.icon}
            </span>
            {a.label}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- offers ---------- */

export function Offers() {
  return (
    <section id="offers" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Today's Special"
          title="Best Sellers From Our Kitchen"
          sub="Is your meal missing a kick of flavor? Every Bite."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((o) => (
            <Reveal key={o.name}>
              <article className="group h-full overflow-hidden rounded-3xl bg-card shadow-soft">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={o.image}
                    alt={`${o.name} at KGN Mandi House`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 text-[10px] font-bold tracking-wider text-cream">
                    {o.label}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg">{o.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- menu ---------- */

export function MenuSection() {
  const [cat, setCat] = useState(menu[0]!.id);
  const { add, dec, qtyOf, setOpen } = useCart();
  const active = menu.find((m) => m.id === cat) ?? menu[0]!;

  return (
    <section id="menu" className="bg-muted/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Our Menu"
          title="Mandi, Biryani & More"
          sub="Freshly prepared, generously served. Try and Enjoy!"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {menu.map((m) => (
            <button
              key={m.id}
              onClick={() => setCat(m.id)}
              aria-pressed={cat === m.id}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                cat === m.id
                  ? "bg-green text-cream"
                  : "bg-card text-foreground hover:bg-gold/25"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.items.map((item) => {
            const qty = qtyOf(item.id);
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start gap-2">
                    <span
                      aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                      className={`mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${item.veg ? "border-green" : "border-maroon"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${item.veg ? "bg-green" : "bg-maroon"}`}
                      />
                    </span>
                    <h3 className="min-w-0 flex-1 text-lg">{item.name}</h3>
                    {item.spicy && (
                      <span className="shrink-0 text-sm" title="Spicy" aria-label="Spicy">
                        🌶️
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.desc}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold text-maroon">{inr(item.price)}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => add(item)}
                        className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-brown transition-transform hover:scale-[1.04]"
                      >
                        Add
                      </button>
                    ) : (
                      <span className="flex items-center gap-3 rounded-full bg-green px-3 py-1.5 text-cream">
                        <button onClick={() => dec(item.id)} aria-label={`Remove one ${item.name}`}>
                          −
                        </button>
                        <span className="text-sm font-semibold">{qty}</span>
                        <button onClick={() => add(item)} aria-label={`Add one ${item.name}`}>
                          +
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Hungry?</span>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
          >
            Order Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- party ---------- */

export function PartySection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    event: "Birthday Party",
    time: "",
    message: "",
  });

  const enquiry = [
    `Hi ${business.name}, I want to enquire about a party booking.`,
    "",
    `Name: ${form.name || "-"}`,
    `Phone: ${form.phone || "-"}`,
    `Date: ${form.date || "-"}`,
    `Guests: ${form.guests || "-"}`,
    `Event: ${form.event}`,
    `Preferred time: ${form.time || "-"}`,
    form.message ? `Message: ${form.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const field =
    "w-full rounded-xl border border-cream/20 bg-cream/5 px-3 py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold";

  return (
    <section id="party" className="surface-dark relative overflow-hidden px-4 py-20">
      <div className="pattern-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead
          light
          eyebrow="Party Booking"
          title="Party With Mandi Biryani? Possible Hi Nahi!"
          sub="Family packs and combos for all your celebrations — full paisa vasool!"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {partyTypes.map((p) => (
              <div key={p.title} className="rounded-2xl bg-cream/5 p-4 ring-1 ring-cream/10">
                <h3 className="flex items-center gap-2 text-base text-cream">
                  <PartyPopper className="h-4 w-4 text-gold" aria-hidden="true" /> {p.title}
                </h3>
                <p className="mt-1 text-sm text-cream/70">{p.desc}</p>
              </div>
            ))}
          </div>

          <form
            className="rounded-3xl bg-cream/5 p-5 ring-1 ring-cream/10"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(enquiry), "_blank", "noopener");
            }}
          >
            <h3 className="text-xl text-cream">Party Combo Book Karo</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className={field}
                placeholder="Your name"
                aria-label="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className={field}
                placeholder="Phone number"
                aria-label="Phone number"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                className={field}
                type="date"
                aria-label="Date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <input
                className={field}
                type="number"
                min={1}
                placeholder="Number of guests"
                aria-label="Number of guests"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
              />
              <select
                className={field}
                aria-label="Event type"
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
              >
                {partyTypes.map((p) => (
                  <option key={p.title} className="text-brown">
                    {p.title}
                  </option>
                ))}
              </select>
              <input
                className={field}
                type="time"
                aria-label="Preferred time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <textarea
                className={`${field} sm:col-span-2`}
                rows={3}
                placeholder="Message (optional)"
                aria-label="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-brown transition-transform hover:scale-[1.01]"
            >
              Party Combo Book Karo
            </button>
            <p className="mt-2 text-center text-xs text-cream/60">
              Your enquiry opens in WhatsApp so we can confirm instantly.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- family combos ---------- */

export function CombosSection() {
  const { add } = useCart();
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Family Combos"
          title="More People. More Mandi. More Memories."
          sub="Our Powerful Chicken Biryani — An Explosion of Taste and Aroma in Every Bite."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {comboPacks.map((c) => (
            <Reveal key={c.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft">
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} — ${c.serves}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl">{c.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-copper">{c.serves}</p>
                  <ul className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Utensils className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> {i}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-maroon">{inr(c.price)}</span>
                    <button
                      onClick={() => add({ id: `combo-${c.name}`, name: c.name, price: c.price })}
                      className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-brown transition-transform hover:scale-[1.04]"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <CtaStrip text="Planning a Celebration?" href="#party" label="Book Your Party" />
      </div>
    </section>
  );
}

/* ---------- why us + about ---------- */

export function WhyUs() {
  return (
    <section className="bg-muted/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Why Choose Us" title="Flavour You Can Trust" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-2xl bg-card p-5 shadow-soft">
              <span className="text-2xl" aria-hidden="true">
                {w.icon}
              </span>
              <h3 className="mt-2 text-lg">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <img
          src={images.restaurant}
          alt="Dining area at KGN Mandi House in Kalinganagar, Bhubaneswar"
          loading="lazy"
          width={1200}
          height={800}
          className="w-full rounded-3xl object-cover shadow-soft"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">About Us</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">The Taste of KGN Mandi House</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              At KGN Mandi House in Kalinganagar, Bhubaneswar, we cook mandi the way it should be —
              chicken slow-roasted until tender, laid over fragrant long-grain rice, and finished
              with warm Indian spices that fill the room with aroma.
            </p>
            <p>
              Our biryani is dum-cooked in small batches, our portions are generous, and everything
              is freshly prepared after you order. From weekday family dinners to full celebration
              spreads, we serve food that is meant to be shared.
            </p>
            <p className="font-semibold text-foreground">Try and Enjoy!</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-cream"
            >
              View Menu
            </a>
            <a
              href={waLink(ORDER_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-gold"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */

export function Gallery() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);
  return (
    <section id="gallery" className="bg-muted/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Gallery" title="Straight From Our Kitchen" />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {galleryCats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                cat === c ? "bg-maroon text-cream" : "bg-card hover:bg-gold/25"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {shown.map((g) => (
            <figure
              key={g.alt}
              className="group overflow-hidden rounded-2xl bg-card shadow-soft first:col-span-2 first:row-span-2"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews ---------- */

export function Reviews() {
  return (
    <section id="reviews" className="px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-card p-8 text-center shadow-soft sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">Reviews</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Loved by Our Customers</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <div>
            <p className="font-display text-5xl text-maroon">{business.rating}</p>
            <div className="mt-1 flex justify-center" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {business.reviewCount} Google Reviews
            </p>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Our guests rate us {business.rating} out of 5 on Google. Read what real customers say
            about our mandi, biryani and party combos.
          </p>
        </div>
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
        >
          Read Our Google Reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/* ---------- location ---------- */

export function Location() {
  return (
    <section id="contact" className="bg-muted/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Visit Us" title="Find KGN Mandi House" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-2xl">{business.name}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <span>{business.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <span>
                  Open daily {business.hours.label}
                  <span className="mt-2 block">
                    <StatusBadge />
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <span>
                  <a href={telUrl} className="font-semibold hover:text-maroon">
                    {business.phone}
                  </a>
                  <span className="block text-muted-foreground">Also: {business.altPhone}</span>
                </span>
              </li>
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={telUrl}
                className="rounded-xl bg-maroon px-4 py-3 text-center text-sm font-semibold text-cream"
              >
                Call
              </a>
              <a
                href={waLink(ORDER_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green px-4 py-3 text-center text-sm font-semibold text-cream"
              >
                WhatsApp
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gold px-4 py-3 text-center text-sm font-semibold text-brown"
              >
                Directions
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <iframe
              title="Map showing KGN Mandi House location"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 lg:h-full"
            />
          </div>
        </div>
        <CtaStrip text="Ready to Visit?" href={directionsUrl} label="Get Directions" />
      </div>
    </section>
  );
}

/* ---------- footer + floating ---------- */

export function Footer() {
  const { setOpen } = useCart();
  return (
    <footer className="surface-dark px-4 pt-16 pb-28 lg:pb-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/favicon.png"
            alt="KGN Mandi House logo"
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/40"
          />
          <h2 className="mt-3 font-display text-xl text-cream">{business.name}</h2>
          <p className="mt-2 text-sm text-cream/70">
            Authentic chicken mandi, biryani and celebration combos in Bhubaneswar.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/75">
            {navLinks
              .filter((l) => ["Home", "Menu", "About", "Offers", "Party Booking", "Contact"].includes(l.label))
              .map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/75">
            <li>
              <a href={telUrl} className="hover:text-gold">
                {business.phone}
              </a>
            </li>
            <li>{business.address}</li>
            <li>Open daily {business.hours.label}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Hungry?</h3>
          <button
            onClick={() => setOpen(true)}
            className="mt-3 w-full rounded-full bg-gold px-5 py-3 text-sm font-semibold text-brown"
          >
            Order Now
          </button>
          <a
            href="#party"
            className="mt-2 block w-full rounded-full border border-cream/25 px-5 py-3 text-center text-sm font-semibold text-cream hover:border-gold"
          >
            Book a Party
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-cream/10 pt-6 text-center text-xs text-cream/50">
        © 2026 KGN Mandi House. All rights reserved.
      </p>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(ORDER_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="group fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-green p-4 text-cream shadow-lift transition-transform hover:scale-105 lg:bottom-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-brown px-3 py-1.5 text-xs text-cream group-hover:block">
        Order on WhatsApp
      </span>
    </a>
  );
}

export function MobileBar() {
  const { count, setOpen } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-1 border-t border-cream/10 bg-brown px-2 py-2 text-cream lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold"
      >
        <ShoppingBag className="h-5 w-5 text-gold" aria-hidden="true" />
        Order{count > 0 ? ` (${count})` : ""}
      </button>
      <a
        href={waLink(ORDER_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold"
      >
        <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
        WhatsApp
      </a>
      <a href={telUrl} className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold">
        <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
        Call
      </a>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold"
      >
        <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
        Directions
      </a>
    </div>
  );
}

export { PARTY_MSG };
