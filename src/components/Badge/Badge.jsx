import "./Badge.css";

const Badge = ({
  label,
  value,
  icon: Icon,
  showLabel = true,
  children,
  className = "",
  ...restProps
}) => {
  const badgeClassName = `badge ${className}`.trim();

  return (
    <span className={badgeClassName} {...restProps}>
      {children ?? (
        <>
          {Icon && <Icon className="badge__icon" aria-hidden="true" />}
          {showLabel && <span className="badge__label">{label}:</span>}
          <span className="badge__value">{value}</span>
        </>
      )}
    </span>
  );
};

export default Badge;
