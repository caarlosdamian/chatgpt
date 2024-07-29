import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
