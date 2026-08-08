import HeroDivider from "@/components/hero/HeroDivider";
import HeroSubtitle from "@/components/hero/HeroSubtitle";
import HeroTitle from "@/components/hero/HeroTitle";

type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <HeroTitle>{title}</HeroTitle>
      <HeroDivider />
      <HeroSubtitle>{subtitle}</HeroSubtitle>
    </div>
  );
}
