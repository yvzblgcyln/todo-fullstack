import Navbar from "./_Navbar";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="layout df-col">
      <Navbar />
      <div className="df-row">
        <SideBar />
        {children}
      </div>
    </div>
  );
};
export default Layout;
