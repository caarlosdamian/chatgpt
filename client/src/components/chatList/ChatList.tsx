import { Link } from 'react-router-dom';
import './ChatList.css';
import { useQuery } from '@tanstack/react-query';

export const ChatList = () => {
  const { data } = useQuery({
    queryKey: ['chats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}chats`, {
        credentials: 'include',
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <div className="navlinks">
        <Link to="/">Create new Chat</Link>
        <Link to="/">Explore Carlos AI</Link>
        <Link to="/">Contact</Link>
      </div>
      <hr />
      <span className="title">RECENT CHAT</span>
      <div className="list">
        {data?.map((chat: any) => (
          <Link to="/" key={chat._id}>
            {chat.title}
          </Link>
        ))}
      </div>
      <hr />
      <div className="upgrate">
        <img src="/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrate to Carlos AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};
