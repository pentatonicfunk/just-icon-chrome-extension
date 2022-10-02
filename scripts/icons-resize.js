const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs')


fs.readdir('assets/icons/build/', (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join('assets/icons/build/', file), err => {
            if (err) throw err;
        });
    }
});


const sizes = [
    16,
    32,
    48,
    128,
]

glob('assets/icons/src/*.png', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    for (const file of files) {
        for (const size of sizes) {

            const filename = path.basename(file);
            const ext = path.extname(file);
            const noExtFilename = path.basename(filename, ext);

            const newFilename = noExtFilename + '-' + size + ext;

            sharp(file)
                .resize(size, size)
                .png()
                .toFile('assets/icons/build/' + newFilename, (err, info) => {
                    console.log(err);
                    console.log(info)
                });
        }
    }
});