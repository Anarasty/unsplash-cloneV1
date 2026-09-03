import "./Button.css";

const Button = ({
  children = "Button",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  const buttonClassName = `btn ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      {children}
    </button>
  );
};

export default Button;
