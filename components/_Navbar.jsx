import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setUserName } from "@/redux/userSlice";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    setActiveUser(localStorage.getItem("user"));
    console.log(activeUser);
  }, []);

  const handleLogout = () => {
    dispatch(setUserName(""));
    router.push("login");
  };
  return (
    <div className="navbar-todo df-row">
      <div className="left df-row">Todo</div>
      <div className="right df-row">
        {user ? (
          <div className="user" onClick={handleLogout}>
            {activeUser}
          </div>
        ) : (
          <Link href="/login">
            <div className="">Login</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
