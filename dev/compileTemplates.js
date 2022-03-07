const fs = require('fs');
const path = require('path');
const pug = require('pug');

const saveTo = {
    appPage: 'appPage',
    signInPage: 'signInPage',
    signUpPage: 'signUpPage',
};

const correctLaunchDir = 'nodeRouter';
const devRoot = 'dev/';
const templatesDir = 'views/';
const outDir = 'public/views/';
const componentSuffix = 'Component';

const currentDir = path.basename(path.resolve('.'));

const debug = process.argv[2] || false;

fs.readdir(devRoot + templatesDir, (err, files) => {
    if (err) {
        return console.log(err);
    }

    files.forEach((filename) => {
        const dotPos = filename.lastIndexOf('.');
        if (dotPos === -1) {
            return;
        }

        const ext = filename.slice(dotPos + 1);
        if (ext != 'pug') {
            return;
        }

        const functionName = filename.slice(filename.lastIndexOf('/') + 1,
            filename.lastIndexOf('.'));

        const compiledTemplate = pug.compileFileClient(
            devRoot + templatesDir + filename,
            {
                name: `x(){};\n\nexport default function ${functionName + componentSuffix}`,
                compileDebug: debug ? true : false,
            },
        );

        let componentDir = functionName;
        if (functionName in saveTo) {
            componentDir = saveTo[functionName];
        }

        if (componentDir === '') {
            console.warn(`Шаблон ${filename} игнорируется`);
        }
        const JSFilename = outDir + componentDir + '/' + filename + '.js';

        if (!fs.existsSync(outDir + componentDir)) {
            fs.mkdirSync(outDir + componentDir);
        }

        fs.writeFileSync(JSFilename, compiledTemplate, 'utf8',);

        console.log(`Шаблон ${filename} преобразован в ${JSFilename}`);
    });
});
