const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('/tmp/live_song.html', 'utf8');
const $ = cheerio.load(html);
const wrapper = $('.vc_col-sm-9 .vc_column-inner > .wpb_wrapper').first();
console.log(`Length: ${wrapper.html().length}`);
console.log(`Preview: ${wrapper.text().substring(0, 300).replace(/\n/g, ' ')}`);
