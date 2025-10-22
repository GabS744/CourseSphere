import React from "react";
import Label from "../1-atoms/Label";
import Input from "../1-atoms/Input";

function FormField({ label, type, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default FormField;
