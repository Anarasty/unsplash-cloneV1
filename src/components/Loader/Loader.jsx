import "./Loader.css";

const Loader = ({ className = "", label = "Loading" }) => {
  const loaderClassName = `loader ${className}`.trim();

  return (
    <div className={loaderClassName} role="status" aria-label={label}>
      <span className="loader__spinner" aria-hidden="true" />
    </div>
  );
};

export default Loader;
