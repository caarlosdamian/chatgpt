import { Request, Response } from 'express';
import { CreateChatInput } from '../schema/chats.schema';
import { Chat } from '../model/chat.model';
import { UserChat } from '../model/userChats.model';

declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

export const createChatHandler = async (
  req: Request<{}, {}, CreateChatInput>,
  res: Response
) => {
  const { text } = req.body;
  const { userId } = req?.auth;
  // create new chat

  // const { text } = req.body;
  try {
    const newChat = new Chat({
      userId,
      history: [
        {
          role: 'user',
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    // check if chats exists

    const userChats = await UserChat.find({ userId });
    // if user dont have chats
    if (userChats.length === 0) {
      const newUserchats = await new UserChat({
        userId,
        chats: [
          {
            _id: savedChat.id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserchats.save();
    } else {
      await UserChat.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      // if chats already exist
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error Creating Chat' });
  }
};

export const getChatHandler = async (req: Request, res: Response) => {
  console.log('Entrando');
  try {
    const { userId } = req.auth;
    console.log(userId);

    const userChats = await UserChat.find({ userId });
    console.log(userChats);
    if (userChats.length !== 0) {
      res.status(200).json(userChats[0].chats);
    }
    res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
