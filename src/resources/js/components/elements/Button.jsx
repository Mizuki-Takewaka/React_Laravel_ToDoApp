import React from 'react';

const Button = ({ children, className, type,  onClick }) => {
  return (
    <Button
      className={className}
      type= {type}
      onClick= {onClick}
    >
      {children}
    </Button>
  );
};

export default Button;

// type ButtonProps = {
//   children?: string;
//   className?: string;
//   onClick?: any;
// }