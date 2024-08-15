import { Request, Response } from 'express';
import {
  CreateChatInput,
  GetChatInput,
  UpdateChatInput,
} from '../schema/chats.schema';
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

export const getChatsHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth;

    const userChats = await UserChat.find({ userId });
    if (userChats.length !== 0) {
      return res.status(200).json(userChats[0].chats);
    }
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getChatHandler = async (
  req: Request<GetChatInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    const chat = await Chat.findOne({ _id: id, userId });
    console.log(chat);
    if (chat) return res.status(200).json(chat);
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateChatHandler = async (
  req: Request<UpdateChatInput['params'], {}, UpdateChatInput['body']>,
  res: Response
) => {
  const { question, answer, img } = req.body;
  const { userId } = req.auth;
  const { id } = req.params;

  const newItems = [
    ...(question
      ? [{ role: 'user', parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: 'model', parts: [{ text: answer }] },
  ];
  try {
    const updatedChat = await Chat.updateOne(
      { _id: id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).json(updatedChat);
  } catch (error) {
    console.log(error);
  }
};
