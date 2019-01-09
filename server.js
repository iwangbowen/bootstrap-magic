const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 8088;
const themesDir = './themes';

// Create themes folder if not exists
fs.exists(themesDir, (exists) => {
    if (!exists) {
        fs.mkdir(themesDir, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes')(app, {});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});