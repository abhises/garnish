// Re-export the entire dynamic course rendering and metadata generation logic
// from the shop/[slug] route. This handles /shop/[slug], /courses/[slug],
// /programs/[slug], /academy/[slug], and /music/[slug] URLs interchangeably to support all legacy links.
import ProductDetailPage, { generateMetadata } from '../../shop/[slug]/page';

export { generateMetadata };
export default ProductDetailPage;
