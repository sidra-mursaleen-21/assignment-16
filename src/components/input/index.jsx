import React from "react";

const Input = ({ id, required, label, type, onChange, placeholder }) => {
  return (
    <>
      <h3 className="label">{label}</h3>
      <input
        id={id}
        required={required}
        className="inputField"
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </>
  );
};

export default Input;
