import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Homebar } from "../components/homebar";
import styles from "../styles/Home.module.css";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports.js";
Amplify.configure(awsconfig);

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Homebar />
      <h1>Photogrammetry Capstone</h1>
      <h2>Models</h2>
      <h2>Viewer</h2>
      <h2>Create your own model</h2>
      <div>
        <button onClick={() => router.push("/upload/images")}>
          Upload images
        </button>
      </div>
      <br></br>
      <div>
        <button onClick={() => router.push("/upload/video")}>
          Upload video
        </button>
      </div>
    </div>
  );
};

export default Home;
