import { createBrowserRouter } from 'react-router-dom';
import { Homepage } from '../pages/homepage/Homepage';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { ChatPage } from '../pages/chatpage/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/dashboard',
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard/chats/:id',
        element: <ChatPage />,
      },
    ],
  },
]);
