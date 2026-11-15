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
      {/* Mobile background image — kept small and behind a strong gradient so text is always readable */}
      <div className="pointer-events-none absolute inset-0 flex justify-end overflow-hidden md:hidden" aria-hidden="true">
        <img src={imgSrc} alt="" className="relative z-10 h-full w-2/5 object-contain object-right opacity-80 drop-shadow-lg" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-accent from-[55%] via-accent/90 via-[75%] to-accent/10" />
      </div>
      <div className="grid h-full grid-cols-1 items-center gap-4 px-6 py-5 md:px-14 md:py-8">
        {/* Text */}
        <div className="relative z-20 flex max-w-lg flex-col justify-center">
          {slide.badge && (
            <span className="mb-3 inline-block self-start rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary-foreground">
              {slide.badge}
            </span>
          )}
          <h1 className="font-display text-lg font-extrabold leading-tight tracking-tight text-primary sm:text-2xl md:text-4xl">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-3 max-w-sm text-sm text-foreground/70 leading-relaxed">{slide.subtitle}</p>
          )}
        </div>

        {/* Image */}
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
      className="relative w-full overflow-hidden rounded-none bg-accent md:rounded-3xl"
      style={{ minHeight: 'clamp(240px, 55vw, 380px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative" style={{ minHeight: 'clamp(240px, 55vw, 380px)' }}>
        {/* Product images placed BEFORE slide divs with no z-index — this keeps them in the
            section's stacking context so mix-blend-multiply composites against the peach bg */}
        {active.map((slide, i) => {
          const imgSrc = slide.imageData || heroWoman;
          return (
            <div
              key={`pimg-${slide.id}`}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 hidden w-5/12 items-center justify-end pr-4 md:flex transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
              style={{ mixBlendMode: 'multiply' }}
            >
              <img src={imgSrc} alt="" className="h-full max-h-72 w-auto object-contain lg:max-h-80" />
            </div>
          );
        })}
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
