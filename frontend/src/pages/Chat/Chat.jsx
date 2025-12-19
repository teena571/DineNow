// import React, { useState } from "react";
// import "./Chat.css"; // optional if you want to style it

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { role: "user", content: input };
//     setMessages([...messages, newMessage]);

//     try {
//       const response = await fetch("http://localhost:4000/api/gemini/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       const botReply = { role: "assistant", content: data.reply };

//       setMessages((prev) => [...prev, botReply]);
//     } catch (error) {
//       console.error("Error chatting with Gemini:", error);
//     }

//     setInput("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`message ${msg.role === "user" ? "user" : "bot"}`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Ask Gemini something..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState, useEffect, useRef } from "react";
// import "./Chat.css"; // Optional: style your chat UI

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // Auto-scroll to bottom when messages update
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:4000/api/gemini/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const data = await response.json();
//       const botReply = { role: "assistant", content: data.reply || "No reply received." };
//       setMessages((prev) => [...prev, botReply]);
//     } catch (error) {
//       console.error("Error chatting with Gemini:", error);
//       const errorReply = {
//         role: "assistant",
//         content: "⚠️ Gemini couldn't respond. Please try again later.",
//       };
//       setMessages((prev) => [...prev, errorReply]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`message ${msg.role === "user" ? "user" : "bot"}`}
//           >
//             {msg.content}
//           </div>
//         ))}
//         {loading && (
//           <div className="message bot typing-indicator">Gemini is typing...</div>
//         )}
//         <div ref={chatEndRef} />
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Ask Gemini something..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} disabled={loading}>
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Chat.css"; // Optional: style your chat UI

const formatMessage = (text) => {
  return { __html: text.replace(/\n/g, "<br/>") };
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const { url } = useContext(StoreContext);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${url}/api/gemini/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }), // ✅ Corrected key
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = {
        role: "assistant",
        content: data.reply || "⚠️ Gemini didn't return a reply.",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error chatting with Gemini:", error);
      const errorReply = {
        role: "assistant",
        content: "⚠️ Gemini couldn't respond. Please try again later.",
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <p dangerouslySetInnerHTML={formatMessage(msg.content)} />
          </div>
        ))}
        {loading && (
          <div className="message bot typing-indicator">
            Gemini is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask Gemini something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
