import { OptimizedImage } from "../ui/OptimizedImage";

export const HeroImage = () => (
  <picture>
    <source
      srcSet="/images/GlampingHero-480.avif 480w,
              /images/GlampingHero-768.avif 768w,
              /images/GlampingHero-1200.avif 1200w"
      sizes="100vw"
      type="image/avif"
    />
    <source
      srcSet="/images/GlampingHero-480.webp 480w,
              /images/GlampingHero-768.webp 768w,
              /images/GlampingHero-1200.webp 1200w"
      sizes="100vw"
      type="image/webp"
    />
    <OptimizedImage
      src="/images/instagram/post1sunset.jpg"
      // src="/images/GlampingHero-1200.jpg"
      alt="Luxury geodesic dome glamping experience at The Glamping Spot"
      width={1200}
      height={675}
      priority
      sizes="100vw"
      className="w-full h-full object-cover"
    />
  </picture>
);