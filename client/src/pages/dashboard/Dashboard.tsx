import { FormEvent } from 'react';
import './Dashboard.css';

export const Dashboard = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    const textValue = target.text.value;
    try {
      await fetch('http://localhost:3000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textValue }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
          <h1>Carlos AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="./chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="./image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="./code.png" alt="" />
            <span>Help me with Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="./arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
