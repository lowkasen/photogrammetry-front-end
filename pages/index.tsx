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
      <h2>About</h2>
      <p>This project ...</p>
      <h2>Latest models</h2>
      <Modeltable table={modelarrayCS} />
      {/* <h2>Viewer</h2> */}
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
