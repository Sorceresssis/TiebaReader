const fs = require('fs');
const path = require('path');

const SELF_TO_ROOT = '../'

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

const srcDir = path.resolve(__dirname, SELF_TO_ROOT, 'src/main/assets');
const destDir = path.resolve(__dirname, SELF_TO_ROOT, 'dist/main/assets');

copyDir(srcDir, destDir);
