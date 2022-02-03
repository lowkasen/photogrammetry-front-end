import type { NextPage } from "next";
import { useState } from "react";

const Functionscope: NextPage = () => {
  let text = "hi";
  const [bool, setBool] = useState(true);

  function changeText1() {
    console.log("this is function1");
    console.log(text);
    text = "hi1";
    console.log(text);
    return undefined;
  }

  function changeText2() {
    console.log("this is function2");
    console.log(text);
    text = "hi2";
    console.log(text);
    return undefined;
  }

  return (
    <div>
      <button onClick={changeText1}>change text 1</button>
      <button onClick={changeText2}>change text 2</button>
      <button onClick={() => setBool(!bool)}>change state</button>
    </div>
  );
};

export default Functionscope;
