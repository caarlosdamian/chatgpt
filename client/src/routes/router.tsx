import { createBrowserRouter } from 'react-router-dom';
import { Homepage } from '../pages/homepage/Homepage';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { ChatPage } from '../pages/chatpage/ChatPage';
import { RootLayout } from '../layouts/rootLayout/RootLayout';
import { DashboardLayout } from '../layouts/dashboardLayout/DashboardLayout';
import { SingIn } from '../pages/signIn/SingIn';
import { SingUp } from '../pages/signUp/SingUp';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/sign-in',
        element: <SingIn />,
      },
      {
        path: '/sign-up',
        element: <SingUp />,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
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
    ],
  },
]);
