/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import { Upload } from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import { model } from '../../lib/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Prps {
  data: any;
}

export default function NewPrompt({ data }: Prps) {
  const endRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [answer, setAnswer] = useState('');
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<any>({
    isLoading: false,
    error: false,
    dbData: {},
    aiData: {},
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}chats/${data._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: image.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      console.log({ id });
      queryClient
        .invalidateQueries({ queryKey: ['chat', data._id] })
        .then(() => {
          setQuestion('');
          setAnswer('');
          setImage({
            isLoading: false,
            error: false,
            dbData: {},
            aiData: {},
          });
        });
      formRef?.current?.reset();
      // navigate(`/dashboard/chats/${id}`);
    },
  });

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [question, answer, image?.dbData, data]);

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

  const add = async (textValue: string, isInitial?: boolean) => {
    if (!isInitial) setQuestion(textValue);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(image?.aiData)?.length
          ? [image.aiData, textValue]
          : textValue
      );
      let acumulatedText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        acumulatedText += chunkText;
        setAnswer(acumulatedText);
      }

      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    const textValue = target.text.value;
    if (!textValue) return;
    add(textValue);
  };


  // in production we dont need it 
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, [data]);

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
      <form action="" className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImage={setImage} />
        <input type="text" name="text" id="" placeholder="Ask anything..." />
        <button type="submit">
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
}
