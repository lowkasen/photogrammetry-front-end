import type { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports.js";
import { Modeltable } from "../components/Modeltable";
Amplify.configure(awsconfig);

import { DataStore, Predicates } from "@aws-amplify/datastore";
import { UUIDModel } from "../models";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Navbar2 } from "../components/Navbar2";

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
      <Navbar />

      <h2>Getting started</h2>
      <p>
        Asset Studio allows you to automatically generate detailed 3D models
        from videos and photos.
      </p>
      <p>Follow the instructions below to generate your 3D assets now.</p>
      <ol>
        <li>
          Take pictures or a video recording of your prototype with your mobile
          phone's camera.
        </li>
        <li>
          Navigate to AWS RealityStation Asset Studio to upload your images or
          your recording.
        </li>
        <li>Wait for your 3D model to be generated.</li>
        <li>
          Open up your phone and load up AWS RealityStation Streamer Client
          application to visualise your 3D model.
        </li>
      </ol>
      <br></br>
      <h2>Latest models</h2>
      <Modeltable table={modelarrayCS} />
      <br></br>
      <h2>Create your own model</h2>
      <div>
        <Button
          variant="outlined"
          onClick={() => router.push("/upload/images")}
        >
          Upload images
        </Button>
      </div>
      <br></br>
      <div>
        <Button variant="outlined" onClick={() => router.push("/upload/video")}>
          Upload video
        </Button>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     // const models = await DataStore.query(UUIDModel, Predicates.ALL, {
//     //   sort: (s) => s.DateTime("DESCENDING"),
//     //   page: 0,
//     //   limit: 10,
//     // });

//     // const modelarray: Array<{ date: string; uuid: string }> = [];

//     // for (let i = 0; i < models.length; i++) {
//     //   modelarray.push({ date: models[i].DateTime, uuid: models[i].UUID });
//     // }

//     return {
//       props: {
//         modelarray: [{ date: "error", uuid: "error" }],
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: {
//         modelarray: [{ date: "error", uuid: "error" }],
//       },
//     };
//   }
// };

export default Home;
