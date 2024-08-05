import { useEffect, useRef } from 'react';
import './NewPrompt.css';

export default function NewPrompt() {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
    {/* Add new chat */}
    <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm">
        <label htmlFor="file">
          <img src="/attachment.png" alt="attachment" />
        </label>
        <input id="file" type="file" name="" multiple={false} hidden />
        <input type="text" name="" id="" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
}
