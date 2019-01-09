const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const util = require('util');
const promisifiedUnlink = util.promisify(fs.unlink);

path.parse(filename).name; // hello
path.parse(filename).ext;  // .html

module.exports = function (app) {
    app.post('/api/themes/:filename', bodyParser.text({ type: '*/*', limit: '50mb' }), (req, res) => {
        fs.writeFile(`./themes/${req.params.filename}`, req.body, (err) => {
            if (err) {
                console.error(err);
                res.status(500);
            }
            res.send();
        });
    });

    app.put('/api/themes', (req, res) => {
        res.send('put')
    });

    app.get('/api/themes', (req, res) => {
        fs.readdir('./themes', (err, files) => {
            if (err) {
                console.error(err);
                res.status(500);
            } else {
                res.send(files);
            }
        });
    });

    app.get('/api/themes/:filename', (req, res) => {
        fs.readFile(`./themes/${req.params.filename}`, (err, buffer) => {
            if (err) {
                console.log(err);
                res.status(500);
            } else {
                res.send(buffer.toString('utf-8'));
            }
        });
    });

    app.delete('/api/themes/:filename', (req, res) => {
        const scssFilename = req.params.filename;
        const name = path.parse(scssFilename).name;
        const suffix = name.split('-')[2];
        const cssFilename = `custom-css-${suffix}.css`;
        Promise.all([
            promisifiedUnlink(`./themes/${scssFilename}`),
            promisifiedUnlink(`./themes/${cssFilename}`)])
            .then(() => {
                res.send();
            })
            .catch(err => res.status(500).send());
    });
};