import { FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import codeImg from '../../../public/code.png';
import imageImg from '../../../public/image.png';
import chatImg from '../../../public/chat.png';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text: string) => {
      return fetch(`${import.meta.env.VITE_API_URL}chats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      console.log({ id });
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    const textValue = target.text.value;
    try {
      mutation.mutate(textValue);
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
            <img src={chatImg} alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src={imageImg} alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src={codeImg} alt="" />
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
