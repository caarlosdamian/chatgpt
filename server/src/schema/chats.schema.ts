import { object, string, TypeOf } from 'zod';

export const createChatSchema = object({
  body: object({
    text: string({
      required_error: 'Text is required',
    }).min(1, 'Text is to shoord - should be min 1 chard'),
  }),
});

export const getChatSchema = object({
  params: object({
    id: string().min(1, 'Id is requrier'),
  }),
});

export const updateChatSchema = object({
  params: object({
    id: string().min(1, 'Id is requrier'),
  }),
  body: object({
    question: string().optional(),
    answer: string().min(1, 'Id is requrier'),
    img: string().optional(),
  }),
});

export type CreateChatInput = TypeOf<typeof createChatSchema>['body'];
export type GetChatInput = TypeOf<typeof getChatSchema>['params'];
export type UpdateChatInput = TypeOf<typeof updateChatSchema>;
