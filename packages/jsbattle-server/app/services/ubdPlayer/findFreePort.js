const net = require('net');

module.exports = () => new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on('error', reject);
    server.listen(0, () => {
      const { port } = server.address();
      server.on('close', resolve.bind(null, port));
      server.close();
    });
  });
