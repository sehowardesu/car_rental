import React, { useState, useEffect } from "react";
import Frontpage from "./pages/Frontpage";
import AuthChoice from "./pages/AuthChoice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [page, setPage] = useState(localStorage.getItem("page") || "frontpage");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [fullname, setFullname] = useState(localStorage.getItem("fullname") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || ""); // ✅ add username state

  const handleLogin = (userData) => {
    setRole(userData.role);
    setUserId(userData.id);
    setUsername(userData.username || ""); // ✅ set username
    setFullname(userData.fullname || "");

    const nextPage = userData.role === "admin" ? "adminDashboard" : "userDashboard";
    setPage(nextPage);

    localStorage.setItem("role", userData.role);
    localStorage.setItem("page", nextPage);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("fullname", userData.fullname || "");
    localStorage.setItem("username", userData.username || ""); // ✅ store username
  };

  const handleLogout = () => {
    setRole("");
    setUserId(null);
    setFullname("");
    setUsername(""); // ✅ clear username
    setPage("frontpage");

    localStorage.removeItem("role");
    localStorage.removeItem("page");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");
    localStorage.removeItem("username"); // ✅ remove username
  };

  const handleNavigate = (nextPage, data = {}) => {
    setPage(nextPage);
    localStorage.setItem("page", nextPage);

    // update state if passed
    if (data.userId) setUserId(data.userId);
    if (data.fullname) setFullname(data.fullname);
    if (data.username) setUsername(data.username);
  };

  useEffect(() => {
    const storedPage = localStorage.getItem("page");
    if (storedPage) setPage(storedPage);
  }, []);

  switch (page) {
    case "authChoice":
      return <AuthChoice onNavigate={handleNavigate} />;

    case "login":
      return (
        <Login
          onLogin={handleLogin}
          onBack={() => handleNavigate("authChoice")}
          onNavigate={handleNavigate}
        />
      );

    case "register":
      return (
        <Register
          onBack={() => handleNavigate("authChoice")}
          onNavigate={handleNavigate}
        />
      );

    case "userDashboard":
      return (
        <UserDashboard
          onLogout={handleLogout}
          userId={userId}
          fullname={fullname}
          username={username} // ✅ pass username
          onNavigate={handleNavigate}
        />
      );

    case "profile":
      return (
        <Profile
          userId={userId}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          fullname={fullname}
          username={username} // ✅ pass username
        />
      );

    case "about":
      return <About onNavigate={handleNavigate} />;

    case "contact":
      return <Contact onNavigate={handleNavigate} />;

    default:
      return <Frontpage onNavigate={() => handleNavigate("authChoice")} />;
  }
}

export default App;
