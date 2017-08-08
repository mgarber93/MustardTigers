const { app } = require('./server');

const port = process.env.port || 8080;

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});