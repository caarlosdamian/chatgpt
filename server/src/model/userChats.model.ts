import mongoose from 'mongoose';

const UserChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const UserChat =
  mongoose.models.UserChat || mongoose.model('UserChat', UserChatsSchema);
