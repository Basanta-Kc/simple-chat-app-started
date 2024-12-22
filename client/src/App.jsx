// import { useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");
import Chat from "./Chat";
function App() {
  // useEffect(() => {
  //   socket.on("mssg", (message) => {
  //     alert(message);
  //   });
  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);

  return (
    <div className="App">
      {/* <button
        onClick={() => {
          socket.emit("mssg", "hello from the client");
        }}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Send
      </button> */}
      <Chat />
    </div>
  );
}

// client message => server => client

export default App;
