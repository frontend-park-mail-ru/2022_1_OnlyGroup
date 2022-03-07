const fs = require('fs');
const path = require('path');

const correctLaunchDir = 'nodeRouter';
const root = 'public';
const targetFile = 'globals.js';

const currentDir = path.basename(path.resolve('.'));

const mode = !(process.argv[2] === 'false');
const sw = process.argv[3] === 'sw';

fs.readFile(root + '/' + targetFile, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const currentMode = mode ? 'false' : 'true';
    const currentModeReg = new RegExp(currentMode, 'gs');

    let result = data.replace(currentModeReg, `${mode}`);

    if (sw && mode) {
        result = result.replace('disableSW = true', 'disableS = false');
    }

    fs.writeFileSync(root + '/' + targetFile, result, 'utf8');
});
