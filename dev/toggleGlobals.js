import {readFile, writeFileSync} from 'fs';
import {basename, resolve} from 'path';

const correctLaunchDir = 'nodeRouter';
const root = 'public';
const targetFile = 'globals.js';

const currentDir = basename(resolve('.'));

const mode = !(process.argv[2] === 'false');
const sw = process.argv[3] === 'sw';

readFile(root + '/' + targetFile, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const currentMode = mode ? 'false' : 'true';
    const currentModeReg = new RegExp(currentMode, 'gs');

    let result = data.replace(currentModeReg, `${mode}`);

    if (sw && mode) {
        result = result.replace('disableSW = true', 'disableS = false');
    }

    writeFileSync(root + '/' + targetFile, result, 'utf8');
});
