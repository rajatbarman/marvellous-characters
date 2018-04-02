const Express = require('express');
const path = require('path');

// Initialize the Express App
const app = new Express();

app.use('/static', Express.static(path.resolve(__dirname, './build/static')));

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/build/index.html'));
    // res.sendFile('../client/dist/index.html', {root: __dirname })
});

// start app
app.listen(process.env.PORT || 8300, (error) => {
  if (!error) {
    console.log(`Server is up at ${process.env.PORT || 8300}`);
  }
});

module.exports = app;
