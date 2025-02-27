require('dotenv').config();
const cookieParser = require("cookie-parser");
const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

var indexRouter = require('./routes/index');
var bigmanRouter = require('./routes/bigman');
var signupRouter = require('./routes/signup')
var loginRouter = require('./routes/login')
var tutorRouter = require('./routes/tutor')

const mongoose = require('mongoose');

mongoose.connect(process.env.uri)
.then(console.log('Connected to Database'))
.catch(err => console.log(err))

// Define allowed origins for CORS
const allowedOrigins = ['https://www.koalitytutoring.com', 'http://localhost:5173'];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
};


// Apply CORS middleware before any other routes or middleware
app.use(cookieParser())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true , limit: '50mb'}))
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/bigman', bigmanRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/tutor', tutorRouter);

// Error handling for unknown routes (404)
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error response
  res.status(err.status || 500);
  res.send('error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
