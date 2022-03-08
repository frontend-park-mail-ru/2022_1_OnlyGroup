import {readdir, existsSync, mkdirSync, writeFileSync} from 'fs';
import {basename, resolve} from 'path';
import {compileFileClient} from 'pug';

const saveTo = {
    app: 'app',
    signin: 'signIn',
    signup: 'signUp',
    editProfile: 'editProfile'
};

const correctLaunchDir = 'nodeRouter';
const devRoot = 'dev/';
const templatesDir = 'views/';
const outDir = 'public/views/';
const componentSuffix = 'Component';

const currentDir = basename(resolve('.'));

const debug = process.argv[2] || false;

readdir(devRoot + templatesDir, (err, files) => {
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

        const compiledTemplate = compileFileClient(
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

        if (!existsSync(outDir + componentDir)) {
            mkdirSync(outDir + componentDir);
        }

        writeFileSync(JSFilename, compiledTemplate, 'utf8',);

        console.log(`Шаблон ${filename} преобразован в ${JSFilename}`);
    });
});
