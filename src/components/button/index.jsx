import React from "react";

const Button = ({ onClick, type, text }) => {
  return (
    <>
      <button className="button" type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
