/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
import { Fragment } from 'react/jsx-runtime';
import './ChatPage.css';

export const ChatPage = () => {
  const params = useParams();
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;

  const { data, isLoading } = useQuery({
    queryKey: ['chat', params.id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}chats/${params.id}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isLoading ? (
            <>Loading</>
          ) : (
            data?.history?.map((message: any) => (
              <Fragment key={message._id}>
                {message.img && (
                  <IKImage
                    urlEndpoint={urlEndpoint}
                    path={message.img}
                    width="400"
                    height="300"
                    transformation={[{ width: '400', height: '300' }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div className={`message ${message.role}`}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </Fragment>
            ))
          )}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};
