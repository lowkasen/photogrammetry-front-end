import { strictEqual } from "assert";
import type { NextPage } from "next";
import { stringify } from "querystring";
import { useRef, useState } from "react";

const Functionscopearray: NextPage = () => {
  const [message, setMessage] = useState("Choose video to upload");
  let data = useRef(["hi0"]);

  function changeText1() {
    console.log("this is function1");
    console.log(data);
    data.current.push("hi1");
    console.log(data);
    return undefined;
  }

  function changeText2() {
    console.log("this is function2");
    console.log(data);
    data.current.push("hi2");
    console.log(data);
    return undefined;
  }

  function clearArray() {
    console.log(data);
    data.current = [];
    console.log(data);
  }

  function setstate1() {
    let abc = Math.random();
    console.log(abc);
    console.log(data.current[0]);
    setMessage("test" + abc.toString());
    console.log(data.current[0]);
  }

  return (
    <div>
      <button onClick={changeText1}>change text 1</button>
      <button onClick={changeText2}>change text 2</button>
      <button onClick={clearArray}>clear array</button>
      <button onClick={setstate1}>set state</button>
    </div>
  );
};

export default Functionscopearray;
