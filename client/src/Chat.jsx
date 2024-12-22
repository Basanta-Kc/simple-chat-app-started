import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on("message", (srvMssg) => {
      setMessages((prev) => [...prev, srvMssg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    if (name && room) {
      setJoined(true);
      socket.emit("join", room);
    }
  };

  const sendMessage = () => {
    socket.emit("message", { room, message, name });
  };

  if (!joined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={joinRoom}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Join Chat Room
          </h2>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Room"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={sendMessage}
            className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Chat Room: {room}</h2>
        <div className="h-64 overflow-y-scroll">
          {/* {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 ${
                msg.name === name ? "text-right" : ""
              } bg-gray-200 rounded`}
            >
              {msg.text}
            </div>
          ))} */}
          {messages.map(({ name: chatName, message }, index) => (
            <div
              key={index}
              className={`mb-2 p-2 ${
                chatName === name ? "text-right" : ""
              } bg-gray-200 rounded`}
            >
              {`${chatName}: ${message}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
