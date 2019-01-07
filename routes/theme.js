module.exports = function (app) {
    app.post('/api/theme', (req, res) => {
        res.send('post')
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