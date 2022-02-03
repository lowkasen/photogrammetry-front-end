import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Homebar } from "../../components/homebar";
import { Messagebox } from "../../components/Messagebox";
import Amplify, { Storage } from "aws-amplify";
import awsconfig from "../../aws-exports.js";
Amplify.configure(awsconfig);

const VideoAmplify2: NextPage = () => {
  const [message, setMessage] = useState("Choose video to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  let fileTypes: MutableRefObject<Array<string>> = useRef([]);
  let fileArray: MutableRefObject<Array<any>> = useRef([]);
  let fileNames: MutableRefObject<Array<string>> = useRef([]);
  let form: MutableRefObject<Array<FormData>> = useRef([]);
  let promise: MutableRefObject<Array<Promise<any>>> = useRef([]);
  let data: MutableRefObject<Array<any>> = useRef([]);

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitButtonDisabled(true);
    setMessage("Preparing upload");

    form.current = [];
    promise.current = [];
    data.current = [];

    try {
      const uuid: { [key: string]: any } = await (
        await fetch("/api/getuuid")
      ).json();
      const UUID: string = uuid.uuid;

      for (let i = 0; i < fileArray.current.length; i++) {
        form.current.push(new FormData());
        form.current[i].append("item", fileArray.current[i]);
        form.current[i].append("uuid", UUID);
        form.current[i].append("filename", fileNames.current[i]);
      }

      setMessage("Uploading");

      // Amplify Storage methods
      for (let i = 0; i < form.current.length; i++) {
        promise.current.push(
          Storage.put(UUID + "/" + fileNames.current[i], fileArray.current[i])
        );
      }

      const response = await Promise.all(promise.current);
      setMessage("Upload successful, uuid: " + UUID);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }

    setSubmitButtonDisabled(false);
  }

  // Function that runs when files are changed in the form
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setSubmitButtonDisabled(true);
      return;
    }

    if (event.target.files.length < 1) {
      setSubmitButtonDisabled(true);
      return;
    }

    fileNames.current = [];
    fileTypes.current = [];
    fileArray.current = [];

    for (let i = 0; i < 1; i++) {
      fileNames.current.push(event.target.files[0].name);
      fileTypes.current.push(event.target.files[0].type);
      fileArray.current.push(event.target.files[0]);
    }

    if (!fileTypes.current.every((v) => v.includes("video"))) {
      // case if not all the files selected are video
      setSubmitButtonDisabled(true);
      setMessage("Filetype: Only videos allowed");
    } else {
      // case if all files are images
      setSubmitButtonDisabled(false);
      setMessage("Ready to submit");
    }
  };

  return (
    <div>
      <Homebar />
      <h1>Upload video</h1>
      <form onSubmit={fileSubmitHandler}>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={fileChangeHandler}
        ></input>
        <input type="submit" disabled={submitButtonDisabled}></input>
      </form>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  );
};

export default VideoAmplify2;
