import Image from "next/image";

type HeroSectionProps = {
  imageSrc: string;
  imageAlt: string;
  names: string;
  venue: string;
  dateTime: string;
};

export default function HeroSection({
  imageSrc,
  imageAlt,
  names,
  venue,
  dateTime,
}: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={308}
        height={453}
        className="mt-12"
        priority
      />
      <p className="mt-12 text-base text-black">{names}</p>
      <p className="mt-12 text-center text-xs text-black">
        {venue}
        <br />
        {dateTime}
      </p>
    </section>
  );
}
