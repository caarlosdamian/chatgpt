import { object, string, TypeOf } from 'zod';

export const createChatSchema = object({
  body: object({
    text: string({
      required_error: 'Text is required',
    }).min(1, 'Text is to shoord - should be min 1 chard'),
  }),
});

export type CreateChatInput = TypeOf<typeof createChatSchema>['body'];
