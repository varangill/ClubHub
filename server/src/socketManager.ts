import { Server } from "socket.io";

let io = null; //global object to keep track of io

export const init = (server) => {
  io = new Server(server);
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Web socket is not initialized");
  }
  return io;
};
