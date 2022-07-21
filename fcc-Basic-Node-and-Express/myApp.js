let bodyParser = require('body-parser');
let express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { setupBackgroundApp } = require('fcc-express-bground');
let app = express();
require('dotenv').config();

// Q7/12 - Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// Q11/12 - Use body-parser to Parse POST Requests
// app.use((req, res, next) => {
//   bodyParser.urlencoded({ extended: false });
//   // console.log(bodyParser);
//   next();
// });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Q8/12 - Chain Middleware to Create a Time Server
function getTheCurrentTimeString() {
  return new Date().toString();
}

app.get(
  '/now',
  (reg, res, next) => {
    req.time = getTheCurrentTimeString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Q3/12 - Serve an HTML File
app.get('/', (reg, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Q4/12 - Serve Static Assets
app.use(express.static(__dirname + 'public'));
app.use('/public', express.static(__dirname + '/public'));

// Q5/12 - Serve JSON on a Specific Route
// app.get('/json', (reg, res) => {
//   res.json({ message: 'Hello json' });
// });

// Q6/12 - Use the .env File
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
});

// Q1/12 - Meet the node console
module.exports = app;
// bGround.log('Hello World');
console.log('Hello World');

// Q9/12 - Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// Q10/12 - Get Query Parameter Input from the Client
app.get('/name', function (req, res) {
  res.json({ name: req.query.first + ' ' + req.query.last });
  // console.log(reg.query);
});

// Q12/12 - Get Data from POST Requests
app.post('/name', function (req, res) {
  res.json({ name: req.body.first + ' ' + req.body.last });
});
// END OF COURSE
