import { Request, Response } from 'express';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT || '',
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || '',
});

const uploadFileHandler = async (req: Request, res: Response) => {
  try {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export { uploadFileHandler };
