import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  console.log("called");
  const io=new Server(res.socket.server)
  res.socket.server.io=io;
  console.log("connection request");
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler