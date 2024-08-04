"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color='#7c3aed'
      cssOverride={override}
      size={150}
      aria-label='Loading'
    />
  );
};
export default LoadingPage;
