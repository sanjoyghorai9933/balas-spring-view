type HeroSubtitleProps = {
  children: string;
};

export default function HeroSubtitle({ children }: HeroSubtitleProps) {
  return (
    <p className="font-body text-sm font-light uppercase tracking-[0.35em] text-luxury-gold sm:text-base md:text-lg">
      {children}
    </p>
  );
}
