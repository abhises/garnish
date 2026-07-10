'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CourseImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function CourseImage({ src, alt, className = 'object-cover', sizes = '(max-w-768px) 100vw, 800px' }: CourseImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackSrc = '/studio-hero.png';

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority
      sizes={sizes}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
