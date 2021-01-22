const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('./tmp/input.txt');
const out = fs.createWriteStream('./tmp/input.txt.gz');

inp.pipe(gzip).pipe(out);
