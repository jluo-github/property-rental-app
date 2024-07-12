import ClipLoader from "react-spinners/ClipLoader";

const override = `
    display: block;
    margin: 100px auto;
  `;

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color='#7c3aed'
      loading={loading}
      // @ts-ignore
      css={override}
      size={150}
      aria-label='spinner'
    />
  );
};
export default Spinner;
