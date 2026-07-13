'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/wordpress';

interface CourseImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function CourseImage({ src, alt, className = 'object-cover', sizes = '(max-w-768px) 100vw, 800px' }: CourseImageProps) {
  const resolved = resolveImageUrl(src) || src;
  const [imgSrc, setImgSrc] = useState(resolved);
  const fallbackSrc = '/studio-hero.png';

  useEffect(() => {
    setImgSrc(resolveImageUrl(src) || src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority
      unoptimized={imgSrc.startsWith('http')}
      sizes={sizes}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
