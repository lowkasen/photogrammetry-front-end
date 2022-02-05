import { NextPage } from "next";

const Datetimepage: NextPage = () => {
  const currentime = new Date().toISOString();
  return <div>{currentime}</div>;
};

export default Datetimepage;
