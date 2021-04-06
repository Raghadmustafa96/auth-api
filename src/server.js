'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const authRoutes = require('./auth/routes');
const logger = require('./middleware/logger');
const v1 = require('./routes/v1.js');
const v2 = require('./routes/v2.js');
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/v1', v1);
app.use('/api/v2', v2);

app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error("Missing Port"); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
