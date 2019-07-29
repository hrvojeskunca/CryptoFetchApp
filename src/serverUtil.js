const express = require('express');
const path = require('path');
require('./db/mongoose');

const apiDataRouter = require('./routers/apiData');
const renderRouter = require('./routers/renderers');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(apiDataRouter);
app.use(renderRouter);

app.set('view engine', 'html');
app.set('views', publicDirectoryPath);
app.engine('html', require('hbs').__express);

module.exports = app;
