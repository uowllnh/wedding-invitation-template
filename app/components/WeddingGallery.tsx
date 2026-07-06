"use client";

import Image from "next/image";
import Section from "./Section";

function photo(src: string) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[15px]">
      <Image
        src={src}
        alt="웨딩사진"
        fill
        sizes="(max-width: 430px) calc((100vw - 64px) / 3), 112px"
        className="object-cover object-center"
      />
    </div>
  );
}

export default function WeddingGallery() {
  return (
    <Section entitle="GALLERY" title="웨딩 갤러리">
      <div className=" grid w-full grid-cols-2 gap-2">
        {photo("/wedding/wd1.png")}
        {photo("/wedding/wd2.png")}
        {photo("/wedding/wd3.png")}
        {photo("/wedding/wd4.png")}
        {photo("/wedding/wd5.png")}
        {photo("/wedding/wd6.png")}
      </div>
    </Section>
  );
}
