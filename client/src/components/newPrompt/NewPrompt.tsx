import { FormEvent, useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import { Upload } from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import { model } from '../../lib/gemini';
import Markdown from 'react-markdown';

export default function NewPrompt() {
  const endRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<any>({
    isLoading: false,
    error: false,
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [question, answer, image?.dbData]);

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
      },
    ],
    generationConfig: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    const textValue = target.text.value;
    if (!textValue) return;
    setQuestion(textValue);
    try {
      const result = await chat.sendMessageStream(
        Object.entries(image?.aiData)?.length
          ? [image.aiData, textValue]
          : textValue
      );
      let acumulatedText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        acumulatedText += chunkText;
        setAnswer(acumulatedText);
      }

      setImage({
        isLoading: false,
        error: false,
        dbData: {},
        aiData: {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Add new chat */}
      {image.isLoading && <div>Loading....</div>}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={urlEndpoint}
          path={image.dbData?.filePath}
          width="380"
          transformation={[{ width: '380' }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm" onSubmit={handleSubmit}>
        <Upload setImage={setImage} />
        <input type="text" name="text" id="" placeholder="Ask anything..." />
        <button type="submit">
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
}
