import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { X, Plus, Minus, ShoppingBag, Phone } from "lucide-react";
import { business, inr, telUrl, waLink, type MenuItem } from "@/data/site";

type Line = { id: string; name: string; price: number; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  total: number;
  add: (item: Pick<MenuItem, "id" | "name" | "price">) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  qtyOf: (id: string) => number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  const value: CartCtx = {
    lines,
    open,
    setOpen,
    count: lines.reduce((s, l) => s + l.qty, 0),
    total: lines.reduce((s, l) => s + l.qty * l.price, 0),
    qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
    add: (item) =>
      setLines((prev) =>
        prev.some((l) => l.id === item.id)
          ? prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
          : [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }],
      ),
    dec: (id) =>
      setLines((prev) =>
        prev.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])),
      ),
    remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

function CartDrawer() {
  const { lines, total, open, setOpen, add, dec, remove } = useCart();
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => {
    const itemLines = lines.map((l) => `• ${l.name} x${l.qty} — ${inr(l.price * l.qty)}`).join("\n");
    return [
      `Hi ${business.name}, I would like to place an order.`,
      "",
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Order type: ${mode}`,
      mode === "Delivery" ? `Address: ${address || "-"}` : null,
      "",
      "Items:",
      itemLines || "-",
      "",
      `Total: ${inr(total)}`,
      notes ? `Special instructions: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [lines, name, phone, mode, address, notes, total]);

  const field =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold";

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-brown/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-lift transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5 text-copper" aria-hidden="true" /> Your Order
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="rounded-full p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Your cart is empty. Add something delicious from the menu.
            </p>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{inr(l.price)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-background px-2 py-1">
                    <button onClick={() => dec(l.id)} aria-label={`Decrease ${l.name}`} className="p-1">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                    <button
                      onClick={() => add({ id: l.id, name: l.name, price: l.price })}
                      aria-label={`Increase ${l.name}`}
                      className="p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(l.id)}
                    aria-label={`Remove ${l.name}`}
                    className="shrink-0 text-xs text-muted-foreground underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {(["Delivery", "Pickup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                    mode === m
                      ? "border-green bg-green text-cream"
                      : "border-border bg-background text-foreground hover:border-gold"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Name
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Phone
              <input
                className={field}
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            {mode === "Delivery" && (
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Address
                <textarea
                  className={field}
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            )}
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Special instructions
              <textarea
                className={field}
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
          </div>
        </div>

        <footer className="space-y-3 border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>{inr(total)}</span>
          </div>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={lines.length === 0}
            className={`block rounded-xl bg-green px-4 py-3 text-center text-sm font-semibold text-cream transition-transform hover:scale-[1.01] ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            Order on WhatsApp
          </a>
          <a
            href={telUrl}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:border-gold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> Call to Order
          </a>
        </footer>
      </aside>
    </div>
  );
}
