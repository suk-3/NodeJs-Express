const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet")
const config = require('./config');

require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet()); // Helmet middleware for security

app.disable('x-powered-by'); // Diable x-powered-by headers for security reasons
app.set('etag', 'strong'); // changing etag from default weak to strong

// CORS
app.use(cors(config.corsOptions)); 

// Custom middleware
const middleware = require('./middlewares/middleware');
app.use(middleware);

// Routes
const indexRouter = require('./routes/route');
app.use('/', indexRouter);

// Start the server
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
