import { Link } from '@tanstack/react-router';
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBanners, type HeroSlide } from '@/lib/banner-store';
import heroWoman from '@/assets/hero-woman.jpg';

function Slide({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const imgSrc = slide.imageData || heroWoman;
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      aria-hidden={!active}
    >
      <div className="grid h-full grid-cols-1 items-center gap-4 px-8 py-6 md:grid-cols-2 md:px-14 md:py-8">
        {/* Text */}
        <div className="flex flex-col justify-center">
          {slide.badge && (
            <span className="mb-3 inline-block self-start rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary-foreground">
              {slide.badge}
            </span>
          )}
          <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-3 max-w-sm text-sm text-foreground/70 leading-relaxed">{slide.subtitle}</p>
          )}
          {slide.buttonText && slide.buttonLink && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={slide.buttonLink as '/'}
                className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                {slide.buttonText}
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                See All Deals
              </Link>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="hidden md:flex items-end justify-center h-full pt-4">
          <img
            src={imgSrc}
            alt={slide.title}
            className="h-full max-h-72 w-auto object-contain drop-shadow-xl lg:max-h-80"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const { slides } = useBanners();
  const active = slides.length > 0 ? slides : [{ id: 'fallback', imageData: '', badge: 'Free Delivery Across Rwanda', title: 'Top Phones & Gadgets Delivered Across Rwanda', subtitle: 'Genuine products, best prices, 30-day returns.', buttonText: 'Shop Now', buttonLink: '/category/all' }];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % active.length), [active.length]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + active.length) % active.length), [active.length]);

  useEffect(() => {
    if (active.length <= 1 || paused) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [active.length, paused, next]);

  // Reset index if slides shrink
  useEffect(() => {
    if (current >= active.length) setCurrent(0);
  }, [active.length, current]);

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-accent"
      style={{ minHeight: '380px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative" style={{ minHeight: '380px' }}>
        {active.map((slide, i) => (
          <Slide key={slide.id} slide={slide} active={i === current} />
        ))}
      </div>

      {/* Arrows — only when multiple slides */}
      {active.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground shadow hover:bg-background transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground shadow hover:bg-background transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {active.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-primary' : 'w-2 bg-primary/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
