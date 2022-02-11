import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Navbar5 } from "../components/Navbar5";

const Getstarted: NextPage = () => {
  const router = useRouter();
  const stepNumbers = ["01", "02", "03", "04"];
  const stepDescriptions = [
    "Take pictures or a video recording of your prototype with your mobile camera.",
    "Navigate to AWS RealityStation Asset Studio to upload your images or your recording.",
    "Wait for your 3D model to be generated.",
    "Open up your phone and load up AWS RealityStation Streamer Client app to visualise your 3D model.",
  ];

  const getSteps = stepNumbers.map((stepNumber, index) => {
    const stepDescription = stepDescriptions[index];
    return (
      <div
        key={stepNumber}
        className="flex flex-row items-center md:items-start md:flex-col px-8"
      >
        <p className="text-left font-bold md:text-5xl text-3xl text-blue-500 my-4">
          {stepNumber}
        </p>
        <p className="text-left lg:text-lg text-base font-thin my-2 mx-4 md:mx-0">
          {stepDescription}
        </p>
      </div>
    );
  });

  return (
    <div>
      <Navbar5 />
      <div className="flex flex-col justify-center items-center pt-40 pb-20 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className="w-5/6 max-w-6xl">
          <h1>Getting started</h1>
          <p className="lg:text-3xl text-xl font-thin mx-8 lg:my-10 my-5 px-16">
            Follow the instructions below to generate your 3D assets now.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center font-bold lg:text-5xl text-3xl space-y-2 bg-gray-100">
        <div className="w-5/6 max-w-6xl py-10">
          <div className="hidden md:grid grid-cols-4 divide-x-2 ">
            {getSteps}
          </div>
          <div className="grid md:hidden grid-cols-1 divide-y">{getSteps}</div>
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
