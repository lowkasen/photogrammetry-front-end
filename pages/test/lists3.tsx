import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Amplify, { API, Storage } from "aws-amplify";

const ListS3: NextPage = ({}) => {
  return (
    <div>
      <h1>List S3 files from Amplify</h1>
    </div>
  );
};

export async function getServerSideProps() {
  //   async function getlist() {
  //     console.log("starting get");
  //     const response = await Storage.list("public/");
  //     console.log(response);
  //     return response;
  //   }

  //   await getlist();

  //   Storage.list("photos/") // for listing ALL files without prefix, pass '' instead
  //     .then((result) => console.log(result))
  //     .catch((err) => console.log(err));

  const response = await API.get("api67ce2af8", "/helloamplifyapi", "");
  console.log(response);

  const response1 = await Storage.get("demo-day-2-(1)-(1).png", {
    level: "public",
  });
  console.log(response1);

  //   const response2 = await Storage.list("/", {
  //     level: "public",
  //   });
  //   console.log(response2);

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ListS3;
