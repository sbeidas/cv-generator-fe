//Install new relic monitoring
require('newrelic');

// Configure port
const port = process.env.PORT || 5000

// Install express server
const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

// Node prometheus exporter setup
const options = {
  appName: "cv-generator-fe",
  collectDefaultMetrics: true
};
const prometheusExporter = require('@tailorbrands/node-exporter-prometheus');
const promExporter = prometheusExporter(options);
app.use(promExporter.middleware);
app.get('/metrics', promExporter.metrics);

// compress responses
app.use(compression());

// Get geolocation
app.get('/geolocation', function (req, res, next) {
    res.redirect('https://api.ipgeolocation.io/ipgeo?apiKey=d0650adcae4143cfb48580bf521ffdd0');
});

// Redirect http to https
app.get('*', function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' &&
    !(['true', 'TRUE'].includes(process.env.CV_GENERATOR_SKIP_REDIRECT_TO_HTTPS || '') ||
      ['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'].includes(req.hostname))) {

    var url = 'https://' + req.hostname;
    // var port = app.get('port');
    // if (port)
    //   url += ":" + port;
    url += req.url;
    res.redirect(url);
  }
  else
    next();
});

// calc the root path
const root = path.join(__dirname, '/dist');

// Serve only the static files form the dist directory
app.use(express.static(root));

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: root });
});

function welcome(error) {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log('Listening on port: ' + port + '.')
  }
}

// Start the app by listening on the default port
app.listen(port, welcome);

// // Install http/2
// const spdy = require('spdy')
// const fs = require('fs');

// // Prepare http/2 options
// const spdy_options = {
//   // key: fs.readFileSync(__dirname + '/openssl.key'),
//   // cert: fs.readFileSync(__dirname + '/openssl.crt')
//   cert: fs.readFileSync(__dirname + '/cv-generator-fe.cer')
// }

// // Serve http/2
// spdy
//   .createServer(spdy_options, app)
//   .listen(port, welcome);
