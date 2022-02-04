import type { NextPage } from "next";
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

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <h2>About</h2>
      <p>This project ...</p>
      <h2>Latest models</h2>
      <Modeltable
        table={[
          { date: "test1", uuid: "341231234123441234" },
          { date: "test2", uuid: "4234234234" },
        ]}
      />
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

export default Home;
