const fs = require('fs');
const bodyParser = require('body-parser');

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
                res.send(files.filter(filter => filter.endsWith('.css')));
            }
        });
    });

    app.delete('/api/themes', (req, res) => {
        res.json(['1.0', '1.1', '1.2']);
    });
};