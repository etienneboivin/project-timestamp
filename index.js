// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  //if regexIsUnix(req.params.date), convert
  const unixRegex = /\d{5,}/;
  let checkDate = new Date(req.params.date);

  if(unixRegex.test(req.params.date)) {
    let dateInt = parseInt(req.params.date);
    let dateTime = new Date(dateInt);
    res.json({unix: dateInt, utc: dateTime.toUTCString()});

  } else if (checkDate.toString() === "Invalid Date"){

      if(!req.params.date) {
        let rightNow = new Date();
        res.json({unix: Date.now(), utc: rightNow.toUTCString()});

      } else {
        res.json({error: "Invalid Date"});
      };
  } else {
      const dateObject = new Date(req.params.date);
      res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
    };
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
