import { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages((messages) => [...messages, { user: '', text: inputValue, isMain: true }]);
      setInputValue('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: inputValue })
        });

        const data = await response.json();
        setMessages((messages) => [...messages, { user: 'ChatGPT', text: data.message}]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  console.log({messages});

  return (
    <div className="container">
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index} className={`message ${message?.isMain ? "sent" : "received"}`}>
            {message.user && <span className="user">{message.user}</span>}
            <span className="text">{message.text}</span>
          </li>
        ))}
      </ul>
      <div className="input-box">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={({key}) => {
            key === "Enter" && sendMessage()
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
