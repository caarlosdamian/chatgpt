import { Link } from 'react-router-dom';
import './HomePage.css';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

export const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState('human1');
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="orbital" className="orbital" />
      <div className="left">
        <h1>Carlos AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          blanditiis dolores aperiam pariatur expedita exercitationem, rem
          corporis molestiae autem accusamus, eveniet dolor fugiat ipsa, facilis
          iure fugit minima quod eius.
        </h3>
        <Link to="/dashboard">Get started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="bot" className="bot" />
          <div className="chat">
            <img src={`/${typingStatus}.png`} alt="human" />
            <TypeAnimation
              sequence={[
                'Human1: We produce food for Mice',
                1000,
                () => {
                  setTypingStatus('bot');
                },
                'Bot: We produce food for Hamsters',
                1000,
                () => {
                  setTypingStatus('human2');
                },
                'Human2: We produce food for Guinea Pigs',
                1000,
                () => {
                  setTypingStatus('bot');
                },
                'Bot: We produce food for Chinchillas',
                1000,
                () => {
                  setTypingStatus('human1');
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor
              omitDeletionAnimation
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="logo" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};
