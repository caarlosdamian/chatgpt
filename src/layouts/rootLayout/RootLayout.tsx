import { Link, Outlet } from 'react-router-dom';
import './RootLayout.css'

export const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/" className='logo'>
          <img src="/logo.png" alt="logo" />
          <span>LAMA AI</span>
        </Link>
        <div className="user">User</div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
