import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        Task Manager Pro v2.0 - &copy; {new Date().getFullYear()} | All rights
        reserved
      </p>
    </footer>
  );
};

export default Footer;
