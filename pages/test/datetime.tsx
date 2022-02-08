import { NextPage } from "next";
import { Navbar2 } from "../../components/Navbar2";

const Datetimepage: NextPage = () => {
  const currentime = new Date().toISOString();
  return (
    <div>
      <Navbar2 />
      <div>{currentime}</div>
    </div>
  );
};

export default Datetimepage;
