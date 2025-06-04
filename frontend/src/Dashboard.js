// Dashboard.jsx
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://cuddly-places-brush.loca.lt/user", {
        method: "GET",
        credentials: "include"  // 👈 important line
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUser(data);
      } else {
        // window.location.href = "/login";
      }
    };
  
    fetchUser();
  }, []);
  

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <img src={user.picture} alt={user.name} width="100" />
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={logout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
