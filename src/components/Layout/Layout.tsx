import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Layout as LayoutAntDesign } from "antd";
import "./Layout.css";

export const Layout = () => {
  return (
    <LayoutAntDesign className="layout">
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </LayoutAntDesign>
  );
};

export default Layout;
