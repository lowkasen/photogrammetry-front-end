import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Homebar } from "../../components/homebar";
import { Messagebox } from "../../components/Messagebox";
import Amplify, { Auth, Storage } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "XX-XXXX-X", // REQUIRED - Amazon Cognito Region
    userPoolId: "XX-XXXX-X_abcd1234", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "XX-XXXX-X_abcd1234", //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "", //REQUIRED -  Amazon S3 bucket name
      region: "XX-XXXX-X", //OPTIONAL -  Amazon service region
    },
  },
});

var fileTypes: Array<string> = [];
var fileArray: Array<any> = [];
var fileNames: Array<string> = [];
var form: Array<FormData> = [];
var promise: Array<Promise<any>> = [];
var data: Array<any> = [];

const Video: NextPage = () => {
  const [message, setMessage] = useState("Choose video to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preparing upload");

    form = [];
    promise = [];
    data = [];

    try {
      const uuid: { [key: string]: any } = await (
        await fetch("/api/getuuid")
      ).json();
      const UUID: string = uuid.uuid;

      for (let i = 0; i < fileArray.length; i++) {
        form.push(new FormData());
        form[i].append("item", fileArray[i]);
        form[i].append("uuid", UUID);
        form[i].append("filename", fileNames[i]);
      }

      setMessage("Uploading");

      for (let i = 0; i < form.length; i++) {
        promise.push(
          fetch("/api/uploaditem", { method: "POST", body: form[i] })
        );
      }

      const response = await Promise.all(promise);

      let isOK = true;
      for (let i = 0; i < form.length; i++) {
        data.push(response[i]);
        console.log(response[0]);
        if (response[i].ok !== true) {
          isOK = false;
        }
      }

      if (isOK === true) {
        setMessage("Upload successful, uuid: " + UUID);
      } else {
        throw new Error("uploaditem API return not OK.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
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

    fileNames = [];
    fileTypes = [];
    fileArray = [];

    for (let i = 0; i < 1; i++) {
      fileNames.push(event.target.files[0].name);
      fileTypes.push(event.target.files[0].type);
      fileArray.push(event.target.files[0]);
    }

    if (!fileTypes.every((v) => v.includes("video"))) {
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

export default Video;