const fs = require('fs');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.post('/api/theme/:filename', bodyParser.text({ type: '*/*', limit: '50mb' }), (req, res) => {
        fs.writeFile(`./themes/${req.params.filename}`, req.body, (err) => {
            if (err) {
                console.error(err);
                res.status(500);
            }
            res.send();
        });
    });

    app.put('/api/theme', (req, res) => {
        res.send('put')
    });

    app.get('/api/theme', (req, res) => {
        res.json(['1.0', '1.1', '1.2']);
    });

    app.delete('/api/theme', (req, res) => {
        res.json(['1.0', '1.1', '1.2']);
    });
};