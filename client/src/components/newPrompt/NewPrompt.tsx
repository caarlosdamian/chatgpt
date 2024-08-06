import { useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import { Upload } from '../upload/Upload';
import { IKImage } from 'imagekitio-react';

export default function NewPrompt() {
  const endRef = useRef<HTMLDivElement>(null);
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<any>({
    isLoading: false,
    error: false,
    dbData: null,
  });

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  console.log(image);

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
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm">
        <Upload setImage={setImage} />
        {/* <label htmlFor="file">
          <img src="/attachment.png" alt="attachment" />
        </label> */}
        <input id="file" type="file" name="" multiple={false} hidden />
        <input type="text" name="" id="" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  );
}
