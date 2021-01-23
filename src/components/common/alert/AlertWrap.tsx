import React from "react";

const AlertWrap: React.FC = ({ children }) => {
  return (
    <div className="fixed top-0 h-screen w-full bg-black bg-opacity-30 flex justify-center items-center z-40">
      {children}
    </div>
  );
};

export default AlertWrap;
