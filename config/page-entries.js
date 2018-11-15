const path = require('path');
const glob = require('glob');
const config = require('./env.conf');

const options = {
    cwd: path.join(config.path.sourceRoot, '/main/'),
    sync: true
};

const globInstance = new glob.Glob('*.js', options);

const pageArr = globInstance.found;

let entries = {};
let templates = [];

pageArr.forEach((page) => {
    page = page.replace(/\.js$/, '');

    entries[page] = path.resolve(config.path.sourceRoot, 'main/' +　page);

    templates.push({
        title: 'Wizard',
        filename: path.join(config.path.assetsRoot, page + '.html'),
        template: path.join(__dirname, '../index.html'),
        chunks: [page]
    })
});

module.exports = { entries, templates };
