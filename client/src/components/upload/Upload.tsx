/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';

type UploadResponse =
  import('imagekit-javascript/dist/src/interfaces').UploadResponse;

interface Props {
  setImage: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      error: boolean;
      dbData: UploadResponse;
    }>
  >;
}

export const Upload = ({ setImage }: Props) => {
  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  const ikUploadref = useRef(null);
  const authenticator = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/files/upload');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log('Error', err);
  };

  const onSuccess = (res: UploadResponse) => {
    console.log('Success', res);
    setImage((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log('Progress', progress);
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((prev) => ({
        ...prev,
        isLoading: true,
        error: false,
        aiData: {
          inlineData: {
            // @ts-ignore
            data: reader.result.split(',')[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        useUniqueFileName={true}
        style={{ display: 'none' }}
        ref={ikUploadref}
      />
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <label htmlFor="file" onClick={() => ikUploadref.current.click()}>
          <img src="/attachment.png" alt="attachment" />
        </label>
      }
    </IKContext>
  );
};
