import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <center>
      <HashLoader size={100} color="#1f57c0" speedMultiplier={1.2} />
      <div className="mt-4">Loading...</div>
    </center>
  );
};

export default LoadingSpinner;
