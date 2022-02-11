import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import iPhone from "../public/iPhoneStreamerClient.png";
import { Navbar4 } from "../components/Navbar4";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports.js";
import { Modeltable } from "../components/Modeltable";
Amplify.configure(awsconfig);

import { DataStore, Predicates } from "@aws-amplify/datastore";
import { UUIDModel } from "../models";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [modelarrayCS, setmodelarrayCS] = useState<
    Array<{ date: string; uuid: string }>
  >([]);

  useEffect(() => {
    async function dataStoreQuery() {
      try {
        var modelarray = [];
        const models = await DataStore.query(UUIDModel, Predicates.ALL, {
          sort: (s) => s.DateTime("DESCENDING"),
          page: 0,
          limit: 10,
        });

        for (let i = 0; i < models.length; i++) {
          modelarray.push({ date: models[i].DateTime, uuid: models[i].UUID });
        }
        console.log(modelarray);
        setmodelarrayCS(modelarray);
      } catch (err) {
        console.error(err);
      }
    }

    dataStoreQuery().catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar4 />
      <div className="flex flex-col justify-center items-center pt-40 pb-20 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className="w-5/6 max-w-6xl">
          <h1>Asset Studio</h1>
          <p className="lg:text-3xl text-xl font-thin mx-8 lg:my-10 my-5">
            Automatically generate{" "}
            <p className="inline text-blue-500">detailed 3D models</p> from
            videos and photos, enabling you to share highly detailed prototypes
            more efficiently.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center font-bold lg:text-5xl text-3xl space-y-2 bg-gray-100">
        <div className="w-5/6 max-w-6xl pt-10 pb-5">
          <p className="text-left font-medium lg:text-2xl text-xl text-blue-500 my-4">
            App
          </p>
          <h2 className="text-left">Streamer Client</h2>
          <p className="text-left lg:text-xl text-lg font-thin mt-2 mb-10">
            Visualise 3D prototypes in{" "}
            <p className="inline text-blue-500">augmented reality</p>{" "}
            replicating the experience of physically collaborating on a
            prototype in the same room.
          </p>
          <div>
            <Image src={iPhone} alt="Streamer client screenshot" />
          </div>
          <button
            onClick={() => router.push("/getstarted")}
            className="cursor-pointer border-[1px] border-blue-600 text-blue-600 px-6 py-3 rounded-md text-sm font-normal hover:bg-blue-50 my-6"
          >
            Get started now
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center font-bold lg:text-5xl text-3xl space-y-2">
        <div className="w-5/6 max-w-6xl pt-10 pb-5">
          <h2 className="text-left">Latest models</h2>
          <br></br>
          <Modeltable table={modelarrayCS} />
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Home;
