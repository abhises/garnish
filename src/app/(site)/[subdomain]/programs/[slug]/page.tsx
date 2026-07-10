// Re-export the entire dynamic course rendering and metadata generation logic
// from the shop/[slug] route. This handles both /shop/[slug] and /programs/[slug]
// URLs interchangeably to support all legacy links and blocks.
import ProductDetailPage, { generateMetadata } from '../../shop/[slug]/page';

export { generateMetadata };
export default ProductDetailPage;
