const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/next/dist/layouts/Root/index.js'
);

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, 'utf8');

  // Check if already patched
  if (!content.includes('suppressHydrationWarning: true,\n      children: /*#__PURE__*/_jsx("style"')) {
    const original = `children: [/*#__PURE__*/_jsx("head", {
      children: /*#__PURE__*/_jsx("style", {
        children: \`@layer payload-default, payload;\`
      })
    }), /*#__PURE__*/_jsxs("body", {`;

    const replacement = `children: [/*#__PURE__*/_jsx("head", {
      suppressHydrationWarning: true,
      children: /*#__PURE__*/_jsx("style", {
        suppressHydrationWarning: true,
        children: \`@layer payload-default, payload;\`
      })
    }), /*#__PURE__*/_jsxs("body", {
      suppressHydrationWarning: true,`;

    if (content.includes(original)) {
      content = content.replace(original, replacement);
      fs.writeFileSync(targetPath, content, 'utf8');
      console.log('Successfully applied suppressHydrationWarning patch to @payloadcms/next Root layout.');
    } else {
      console.log('@payloadcms/next Root layout target string not found or already modified.');
    }
  } else {
    console.log('@payloadcms/next Root layout is already patched.');
  }
} else {
  console.log('@payloadcms/next not found in node_modules, skipping patch.');
}
