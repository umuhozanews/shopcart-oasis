import { ShoppingCart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground/10">
              <ShoppingCart size={18} />
            </div>
            <span className="text-lg font-bold">Shopcart</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-80">
            Premium electronics and audio gear, curated for the way you listen.
          </p>
        </div>
        {[
          { title: "Shop", links: ["Categories", "Deals", "What's New", "Delivery"] },
          { title: "Support", links: ["Contact", "Shipping", "Returns", "FAQ"] },
          { title: "Company", links: ["About", "Careers", "Press", "Privacy"] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:opacity-100 hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs opacity-70">
          © {new Date().getFullYear()} Shopcart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
