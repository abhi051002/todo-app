import React from "react";
import { AlertCircle, Check } from "lucide-react";

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {type === "error" ? <AlertCircle size={18} /> : <Check size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
