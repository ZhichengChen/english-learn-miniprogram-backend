var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: '' });
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(6666);
handler.on('error', function (err) {
  console.error('Error:', err.message)
});
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    runCommand();
});
function runCommand( cmd, args, callback ){
  var child_process = require('child_process');
  child_process.exec('build.bat', function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
  });
}
