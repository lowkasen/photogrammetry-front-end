import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Homebar } from "../../components/homebar";
import { Messagebox } from "../../components/Messagebox";

var fileTypes: Array<string> = [];
var fileArray: Array<any> = [];
var fileNames: Array<string> = [];
var form: Array<FormData> = [];
var promise: Array<Promise<any>> = [];
var data: Array<any> = [];

const Images: NextPage = () => {
  const [message, setMessage] = useState("Choose files to upload");
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
      console.log("target files is null.");
      setSubmitButtonDisabled(true);
      return;
    }

    const numberOfFiles = event.target.files.length;
    if (numberOfFiles > 50 || numberOfFiles < 1) {
      console.log("number of target files is: " + String(numberOfFiles));
      console.log("target files is none or more than 50");
      setSubmitButtonDisabled(true);
      return;
    }

    fileNames = [];
    fileTypes = [];
    fileArray = [];

    for (let i = 0; i < numberOfFiles; i++) {
      fileNames.push(event.target.files[i].name);
      fileTypes.push(event.target.files[i].type);
      fileArray.push(event.target.files[i]);
    }

    if (
      !fileTypes.every(
        (v) => v === "image/jpeg" || v === "image/png" || v === "image/jpg"
      )
    ) {
      // case if not all the files selected are images
      console.log("Filetype mismatch");
      setSubmitButtonDisabled(true);
      setMessage("Filetype: Only images allowed");
    } else {
      // case if all files are images
      setSubmitButtonDisabled(false);
      setMessage("Ready to submit");
    }
  };

  return (
    <div>
      <Homebar />
      <h1>Upload images</h1>
      <form onSubmit={fileSubmitHandler}>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={fileChangeHandler}
          multiple
        ></input>
        <input type="submit" disabled={submitButtonDisabled}></input>
      </form>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  );
};

export default Images;
