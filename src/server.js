const http = require('http');
const app = require('./app');
const connection = require('./utils/connection');

// setting server post
const PORT = process.env.PORT || 5000;

// creatinng the server
const server = http.createServer(app);

connection.on('open', () => {
  console.log('Connection to MongoDB Atlas established successfully');
});

server.listen(PORT, () => console.log('Server running at PORT: ', PORT));
  