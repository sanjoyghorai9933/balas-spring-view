type HeroTitleProps = {
  children: string;
};

export default function HeroTitle({ children }: HeroTitleProps) {
  return (
    <h1 className="font-display text-5xl font-light leading-tight tracking-[0.08em] text-luxury-cream sm:text-6xl md:text-7xl lg:text-8xl">
      {children}
    </h1>
  );
}
