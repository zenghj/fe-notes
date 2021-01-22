const zlib = require('zlib');
const gunzip = zlib.createGunzip();
const fs = require('fs');

const gunzipInp = fs.createReadStream('./tmp/input.txt.gz');
const gunzipOut = fs.createWriteStream('./tmp/unzip.input.txt');
gunzipInp.pipe(gunzip).pipe(gunzipOut);