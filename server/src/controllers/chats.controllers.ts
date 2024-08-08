import { Request, Response } from 'express';
import { CreateChatInput } from '../schema/chats.schema';

export const createChatHandler = async (
  req: Request<{}, {}, CreateChatInput>,
  res: Response
) => {
  // const { text } = req.body;
  console.log(req.body)
  try {
    
  } catch (error) {
    
  }
};
