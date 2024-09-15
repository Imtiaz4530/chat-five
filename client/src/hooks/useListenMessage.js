// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessages } = useConversation();

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//       newMessage.shouldShake = true;
//       const sound = new Audio(notificationSound);
//       sound.play(sound);
//       setMessages([...messages, newMessage]);
//     });

//     return () => socket.off("newMessage");
//   }, [socket, setMessages, messages]);
// };

// export default useListenMessages;

// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessages, selectedConversation } = useConversation();

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//       // Ensure the new message belongs to the currently selected conversation
//       if (newMessage.conversationId === selectedConversation?._id) {
//         newMessage.shouldShake = true;
//         const sound = new Audio(notificationSound);
//         sound.play(sound);
//         setMessages([...messages, newMessage]);
//       }
//     });

//     return () => socket.off("newMessage");
//   }, [socket, setMessages, messages, selectedConversation?._id]);
// };

// export default useListenMessages;

import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play(sound);
      setMessages([...messages, newMessage]);
    });

    return () => socket.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
