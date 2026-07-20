import { getPayload } from 'payload';
import configPromise from '../src/payload.config';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });


// Multisite mapping — matches src/lib/sites.ts
const MULTISITE_MAP: Record<number, string> = {
  1: 'www',
  2: 'nsh',
  3: 'ber',
  4: 'hk',
  5: 'mia',
  7: 'la',
  8: 'edu',
  9: 'ny',
  18: 'tyo',
  21: 'sea',
  30: 'bcn',
  33: 'hou',
  35: 'syd',
  46: 'av',
  48: 'lis',
  51: 'sf',
  54: 'sg',
  55: 'pdx',
};

/**
 * Parses raw WordPress WPBakery content and extracts structured blocks for Payload CMS.
 */
export function parseWPBakeryToBlocks(rawContent: string, tenant: string) {
  const blocks: any[] = [];
  if (!rawContent) return blocks;

  // Check if content contains WPBakery shortcodes
  if (rawContent.includes('[vc_row') || rawContent.includes('[vc_column')) {
    // Extract heading from vc_custom_heading if present
    const headingMatch = rawContent.match(/\[vc_custom_heading[^\]]*text="([^"]+)"/i) ||
                         rawContent.match(/\[vc_custom_heading[^\]]*\]([^\[]+)\[\/vc_custom_heading\]/i);
    
    if (headingMatch && headingMatch[1]) {
      blocks.push({
        blockType: 'hero',
        badge: `Garnish ${tenant.toUpperCase()}`,
        heading: headingMatch[1].trim(),
        subheading: 'World-Class Music Production Education',
        buttons: [
          { label: 'Explore Programs', url: '/programs', style: 'primary' },
          { label: 'Contact Us', url: '/contact', style: 'secondary' },
        ],
      });
    }

    // Strip out all [vc_...] shortcodes to get clean text/HTML for our RichTextBlock fallback
    const cleanedHtml = rawContent
      .replace(/\[vc_[^\]]*\]/g, '')
      .replace(/\[\/vc_[^\]]*\]/g, '')
      .replace(/\[[a-z_]+[^\]]*\]/g, '')
      .replace(/\[\/[a-z_]+\]/g, '')
      .trim();

    if (cleanedHtml.length > 20) {
      blocks.push({
        blockType: 'richText',
        htmlContent: cleanedHtml,
        containerWidth: 'prose',
      });
    }

    // Add a Course Grid block by default on main landing pages
    if (rawContent.includes('course') || rawContent.includes('program')) {
      blocks.push({
        blockType: 'courseGrid',
        heading: 'Featured Programs',
        columns: '3',
      });
    }
  } else {
    // Standard WordPress WYSIWYG / Gutenberg content
    blocks.push({
      blockType: 'richText',
      htmlContent: rawContent,
      containerWidth: 'prose',
    });
  }

  return blocks;
}

async function importMedia(
  connection: mysql.Connection,
  payload: any,
  wpPostId: number,
  tablePrefix: string,
  blogId: number,
  tenant: string
): Promise<number | null> {
  try {
    // 1. Get the _thumbnail_id (attachment ID) from postmeta
    const [metaRows]: any = await connection.execute(`
      SELECT meta_value 
      FROM ${tablePrefix}postmeta 
      WHERE post_id = ? AND meta_key = '_thumbnail_id'
      LIMIT 1;
    `, [wpPostId]);

    if (!metaRows || metaRows.length === 0) return null;
    const attachmentId = Number(metaRows[0].meta_value);
    if (!attachmentId) return null;

    // 2. Get the relative path of the file from postmeta of the attachment ID
    const [fileRows]: any = await connection.execute(`
      SELECT meta_value 
      FROM ${tablePrefix}postmeta 
      WHERE post_id = ? AND meta_key = '_wp_attached_file'
      LIMIT 1;
    `, [attachmentId]);

    if (!fileRows || fileRows.length === 0) return null;
    const attachedFile = fileRows[0].meta_value;
    if (!attachedFile) return null;

    // 3. Resolve source file path in WordPress uploads directory
    let srcPath = '';
    if (blogId === 1) {
      srcPath = path.resolve('../uploads', attachedFile);
    } else {
      srcPath = path.resolve('../uploads/sites', String(blogId), attachedFile);
    }

    if (!fs.existsSync(srcPath)) {
      console.warn(`      ⚠️ Image file not found on disk at: ${srcPath}`);
      return null;
    }

    const filename = path.basename(attachedFile);

    // 4. Check if media record already exists in Payload
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: { equals: filename },
      },
    });

    if (existingMedia.totalDocs > 0) {
      return Number(existingMedia.docs[0].id);
    }

    // 5. Get alt text or title for the attachment
    const [attachmentPost]: any = await connection.execute(`
      SELECT post_title 
      FROM ${tablePrefix}posts 
      WHERE ID = ? 
      LIMIT 1;
    `, [attachmentId]);

    const altText = (attachmentPost && attachmentPost[0] && attachmentPost[0].post_title) || 'Featured Image';

    // 6. Read file from WordPress uploads directory into buffer
    const fileBuffer = fs.readFileSync(srcPath);
    const mimeType = filename.toLowerCase().endsWith('.png')
      ? 'image/png'
      : filename.toLowerCase().endsWith('.gif')
      ? 'image/gif'
      : 'image/jpeg';

    // 7. Create media record in Payload CMS with file parameter
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
        tenant: tenant,
        wpUploadPath: blogId === 1 ? attachedFile : `sites/${blogId}/${attachedFile}`,
      },
      file: {
        data: fileBuffer,
        name: filename,
        mimetype: mimeType,
      },
    });

    return Number(mediaDoc.id);
  } catch (err: any) {
    console.warn(`      ⚠️ Error importing media for post ${wpPostId}:`, err.message);
    return null;
  }
}

async function runMigration() {
  console.log('🚀 Starting WordPress (1.29 GB DB) -> Payload CMS Migration...');

  // 1. Initialize Payload CMS instance
  const payload = await getPayload({ config: configPromise });
  console.log('✅ Payload CMS initialized.');

  // 2. Connect to local WordPress MariaDB/MySQL container
  const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'wp_user',
    password: process.env.MYSQL_PASSWORD || 'wp_password',
    database: process.env.MYSQL_DATABASE || 'garnish_wp_local',
  };

  let connection;
  try {
    console.log(`Connecting to MySQL database '${dbConfig.database}' at ${dbConfig.host}:${dbConfig.port}...`);
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connection established.');
  } catch (error) {
    console.warn('⚠️ Could not connect to live MySQL instance on port 3306.');
    console.warn('Ensure your Docker environment (`docker compose up -d`) is running and imported.');
    console.warn('Migration script is ready and structured to run as soon as MySQL container is active.');
    process.exit(0);
  }

  // 3. Loop over all multisite blog IDs and extract pages & posts
  for (const [blogIdStr, tenant] of Object.entries(MULTISITE_MAP)) {
    const blogId = Number(blogIdStr);
    const tablePrefix = blogId === 1 ? 'D0QbVivoEg_' : `D0QbVivoEg_${blogId}_`;

    console.log(`\n==========================================`);
    console.log(`Processing Subsite Blog ID: ${blogId} (Tenant: ${tenant} -> Prefix: ${tablePrefix})`);
    console.log(`==========================================`);

    try {
      // Check if posts table exists for this subsite
      const [rows]: any = await connection.execute(`
        SELECT ID, post_title, post_name, post_content, post_excerpt, post_type, post_date 
        FROM ${tablePrefix}posts 
        WHERE post_status = 'publish' 
          AND post_type IN ('page', 'post', 'course', 'program', 'product')
        ORDER BY ID ASC;
      `);

      console.log(`Found ${rows.length} published records across pages/posts/courses/products for '${tenant}'.`);

      for (const row of rows) {
        const title = row.post_title || 'Untitled';
        const slug = row.post_name || `post-${row.ID}`;
        const rawContent = row.post_content || '';
        const excerpt = row.post_excerpt || '';
        const postType = row.post_type;

        // Parse WPBakery layouts into clean Payload blocks
        const blocks = parseWPBakeryToBlocks(rawContent, tenant);

        if (postType === 'page') {
          // Check if already exists in Payload
          const existing = await payload.find({
            collection: 'pages',
            where: {
              and: [
                { slug: { equals: slug } },
                { tenant: { equals: tenant } },
              ],
            },
          });

          // Import media
          const mediaId = await importMedia(connection, payload, row.ID, tablePrefix, blogId, tenant);

          if (existing.totalDocs === 0) {
            await payload.create({
              collection: 'pages',
              data: {
                title,
                slug,
                tenant: tenant as any,
                wpPostId: row.ID,
                layout: blocks,
                featuredImage: mediaId || undefined,
                seo: {
                  metaTitle: `${title} | Garnish ${tenant.toUpperCase()}`,
                  metaDescription: excerpt.replace(/<[^>]*>/g, '').substring(0, 160) || `${title} at Garnish Music Production`,
                },
              },
            });
            console.log(`   [Page Created] -> /${tenant}/${slug} (${title})`);
          } else {
            if (mediaId) {
              await payload.update({
                collection: 'pages',
                id: existing.docs[0].id,
                data: { featuredImage: mediaId },
              });
            }
            console.log(`   [Page Exists] -> /${tenant}/${slug}`);
          }
        } else if (postType === 'post') {
          const existing = await payload.find({
            collection: 'posts',
            where: {
              and: [
                { slug: { equals: slug } },
                { tenant: { equals: tenant } },
              ],
            },
          });

          // Import media
          const mediaId = await importMedia(connection, payload, row.ID, tablePrefix, blogId, tenant);

          if (existing.totalDocs === 0) {
            await payload.create({
              collection: 'posts',
              data: {
                title,
                slug,
                tenant: tenant as any,
                wpPostId: row.ID,
                excerpt: excerpt || rawContent.replace(/<[^>]*>/g, '').substring(0, 200),
                htmlFallback: rawContent,
                featuredImage: mediaId || undefined,
              },
            });
            console.log(`   [Post Created] -> /${tenant}/blog/${slug} (${title})`);
          } else {
            if (mediaId) {
              await payload.update({
                collection: 'posts',
                id: existing.docs[0].id,
                data: { featuredImage: mediaId },
              });
            }
            console.log(`   [Post Exists] -> /${tenant}/blog/${slug}`);
          }
        } else if (postType === 'product' || postType === 'course' || postType === 'program') {
          const existing = await payload.find({
            collection: 'courses',
            where: {
              and: [
                { slug: { equals: slug } },
                { tenant: { equals: tenant } },
              ],
            },
          });

          // Import media
          const mediaId = await importMedia(connection, payload, row.ID, tablePrefix, blogId, tenant);

          if (existing.totalDocs === 0) {
            // Fetch WooCommerce/ACF price & duration from postmeta
            let price = '';
            let duration = '';
            try {
              const [metaRows]: any = await connection.execute(`
                SELECT meta_key, meta_value 
                FROM ${tablePrefix}postmeta 
                WHERE post_id = ? AND meta_key IN ('_price', 'duration', 'schedule', 'level')
              `, [row.ID]);
              
              const metaMap: Record<string, string> = {};
              for (const mRow of metaRows) {
                metaMap[mRow.meta_key] = mRow.meta_value;
              }
              price = metaMap['_price'] ? `$${metaMap['_price']}` : '';
              duration = metaMap['duration'] || metaMap['schedule'] || '';
            } catch (metaErr: any) {
              console.warn(`      Error fetching metadata for product ${row.ID}:`, metaErr.message);
            }

            await payload.create({
              collection: 'courses',
              data: {
                title,
                slug,
                tenant: tenant as any,
                wpPostId: row.ID,
                shortDescription: excerpt || rawContent.replace(/<[^>]*>/g, '').substring(0, 160),
                description: rawContent,
                price: price || '$1,295',
                duration: duration || '120 Hours',
                featuredImage: mediaId || undefined,
              },
            });
            console.log(`   [Course Created] -> /${tenant}/shop/${slug} (${title} - Price: ${price || 'N/A'})`);
          } else {
            if (mediaId) {
              await payload.update({
                collection: 'courses',
                id: existing.docs[0].id,
                data: { featuredImage: mediaId },
              });
            }
            console.log(`   [Course Exists] -> /${tenant}/shop/${slug}`);
          }
        }
      }
    } catch (err: any) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log(`Table ${tablePrefix}posts does not exist yet (or subsite not initialized). Skipping.`);
      } else {
        console.error(`Error querying subsite ${blogId}:`, err.message);
      }
    }
  }

  await connection.end();
  console.log('\n🎉 WordPress (1.29 GB) to Payload CMS migration check complete!');
  process.exit(0);
}

runMigration().catch(err => {
  console.error('Migration Fatal Error:', err);
  process.exit(1);
});
