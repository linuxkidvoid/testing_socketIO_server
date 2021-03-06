const express = require("express");
const app = express();
const io = require("socket.io");
const ev = require("./utils/events");
const logger = require("./utils/logger");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  logger.info("socketIO_server");
  logger.info(`Listening on port ${port}.`);
  logger.info("---------------------------------------");
});

const socketServer = io(server);

// socket CONNECT
socketServer.on(ev.CONNECT, socketClient => {
  logger.info(`Client ${socketClient.id} connected.`);

  //socket DISCONNECT
  socketClient.on(ev.DISCONNECT, () => {
    logger.info(`Client ${socketClient.id} disconnected.`);
    logger.info("---------------------------------------");
  });

  // ECHO
  socketClient.on(ev.req_ECHO, data4Server => {
    const { message } = data4Server;
    logger.info("Client says: " + message);
    const data4Client = { status: 200, message: "SERVER ECHO" };
    socketClient.emit(ev.res_ECHO, data4Client);
  });

  // BELLO
  socketClient.on(ev.req_BELLO, data4Server => {
    const { message } = data4Server;
    logger.info("Client says: " + message);
    const data4Client = { status: 200, message: "SERVER BELLO" };
    socketClient.emit(ev.res_BELLO, data4Client);
  });
});
