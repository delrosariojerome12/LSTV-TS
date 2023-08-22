import React from "react";
import Logo from "../assets/logo.jpg";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {handleClearUserStatus} from "../features/auth/auth";
import {RootState} from "../store"; // Make sure to import RootState

const Navbar: React.FC = React.memo(() => {
  const {user} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    {
      path: "/login",
      page: "Login",
    },
    {
      path: "/home",
      page: "Home",
    },
  ];

  const renderLinks = () => {
    if (!user) {
      return links
        .filter((item) => item.page !== "Home")
        .map((item, index) => (
          <button
            onClick={() => {
              navigate(item.path);
            }}
            key={index}
          >
            {item.page}
          </button>
        ));
    }

    return links
      .filter((item) => {
        if (currentPath.includes("home")) {
          return item.page !== "Home" && item.page !== "Login";
        }
        return item.page !== "Login";
      })
      .map((item, index) => (
        <button
          onClick={() => {
            navigate(item.path);
          }}
          key={index}
        >
          {item.page}
        </button>
      ));
  };

  return (
    <nav className="navbar">
      <div className="logo-holder" onClick={() => navigate("/")}>
        <img src={Logo} alt="LSTV Logo" />
        <h1>Lee Systems Technology Ventures</h1>
      </div>
      <ul className="links-holder">
        {renderLinks()}
        {user && (
          <button
            onClick={() => {
              dispatch(handleClearUserStatus());
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
