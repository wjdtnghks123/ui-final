import React, { useState } from "react";
import Graph from "./Graph";

export default function Chat(chatName: any) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [inputText, setInputText] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const userMessage = { sender: "user", text: inputText };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText("");

      setTimeout(() => {
        const chatbotResponse = {
          sender: "chatbot",
          text: "I am a chatbot. You said: " + inputText,
        };
        setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
      }, 1000);
    }
  };

  const handleToggleGraph = () => {
    setShowGraph((prevState) => !prevState);
  };

  return (
    <div style={{ display: "flex", height: "90vh", backgroundColor: "white" }}>
      <div style={{ flex: 42, padding: "20px", borderRight: "1px solid #ccc" }}>
        <div
          style={{
            height: "580px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === "user" ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              {message.sender === "chatbot" && (
                <div
                  style={{
                    backgroundColor: "#f1f1f1",
                    color: "black",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "inline-block",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  {message.text}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "0",
                    }}
                  >
                    <span
                      onClick={handleToggleGraph}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "12px",
                      }}
                    >
                      상세보기
                    </span>
                    <span
                      onClick={handleSendMessage}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "12px",
                      }}
                    >
                      선택하기
                    </span>
                  </div>
                </div>
              )}
              {message.sender === "user" && (
                <div
                  style={{
                    backgroundColor: "#b83333",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "inline-block",
                    textAlign: "right",
                  }}
                >
                  {message.text}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#b83333",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
      {showGraph && <Graph />}
    </div>
  );
}
