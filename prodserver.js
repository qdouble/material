var compression = require('compression')
var express = require('express'),
path = require('path');

var app = express();
var ROOT = path.join(path.resolve(__dirname, '..'));

app.use(compression())
app.use(express.static('dist'));

var renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
}

app.get('/*', renderIndex);

app.listen(8080, () => {
  console.log('Listening on: http://localhost:8080');
});