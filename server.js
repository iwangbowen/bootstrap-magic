const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const app            = express();
const port = 8088;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes')(app, {});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});