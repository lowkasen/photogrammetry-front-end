import type { NextPage } from "next";

const Functionscope: NextPage = () => {
  var data = ["hi0"];

  function changeText1() {
    console.log("this is function1");
    console.log(data);
    data = [];
    data.push("hi1");
    console.log(data);
    return undefined;
  }

  function changeText2() {
    console.log("this is function2");
    console.log(data);
    data = [];
    data.push("hi2");
    console.log(data);
    return undefined;
  }

  return (
    <div>
      <button onClick={changeText1}>change text 1</button>
      <button onClick={changeText2}>change text 2</button>
    </div>
  );
};

export default Functionscope;
