import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#3f51b5"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
