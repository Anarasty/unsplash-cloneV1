import "./Loader.css";

const Loader = ({ className = "" }) => {
  const loaderClassName = `loader ${className}`.trim();

  return <div className={loaderClassName} aria-hidden="true" />;
};

export default Loader;
