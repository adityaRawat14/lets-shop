"use client"
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import io from "socket.io-client";
export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string>();
  const [socket,setSocket]=useState<any | Socket>(null)
  useEffect(() => {
    initialize();

    return () => {
      if(socket){
        socket.disconnect()
      }
    }
  }, []);

  async function initialize() {
  await fetch("/api/socket");
  const newSocket=io()
  newSocket.on('connected',()=>{
    console.log("socket connected");
    
  })

  }

  function handleSubmit(e:any) {
    e.preventDefault();

   if(socket){
    socket.emit("send-message", { name, message });
   }else{
    console.log("socket not connected");
    
   }
  }

  return (
    <div>
      <h1>NEXT SOCKET.IO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter your message"
          value={message!}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
      <hr />
      
      <h2>Message</h2>
    </div>
  );
};