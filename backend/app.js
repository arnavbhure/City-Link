const http = require("http");
const express = require("express");

const app = express();
const PORT = 5000;

const server = http.createServer(app);

app.use(express.json());

server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
