export function resolveImageUrl(urlOrPath: string | undefined | null): string | null {
  if (!urlOrPath || typeof urlOrPath !== 'string' || urlOrPath.trim() === '') return null;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 's7pus8t5';

  if (urlOrPath.startsWith('https://res.cloudinary.com/')) {
    return urlOrPath;
  }
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }
  if (urlOrPath.startsWith('/media/')) {
    const filename = urlOrPath.replace(/^\/media\//, '');
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-media/${filename}`;
  }
  if (urlOrPath.startsWith('/studio-hero')) {
    const filename = urlOrPath.replace(/^\//, '');
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-media/${filename}`;
  }
  if (urlOrPath.startsWith('local-hero/')) {
    const filename = urlOrPath.replace('local-hero/', '');
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-media/${filename}`;
  }
  if (urlOrPath.startsWith('/uploads/')) {
    const relativePath = urlOrPath.replace(/^\/uploads\//, '');
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-uploads/${relativePath}`;
  }
  if (/^(sites\/\d+\/)?\d{4}\/\d{2}\//.test(urlOrPath)) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-uploads/${urlOrPath.replace(/^\//, '')}`;
  }
  const wpMatch = urlOrPath.match(/[\/a-zA-Z0-9.:_-]*\/wp-content\/uploads\/(.+)/i);
  if (wpMatch && wpMatch[1]) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/garnish-uploads/${wpMatch[1].split('?')[0]}`;
  }

  return urlOrPath;
}
