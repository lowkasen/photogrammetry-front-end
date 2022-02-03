import type { NextPage } from "next";
import { Storage } from "aws-amplify";
import { Homebar } from "../../components/homebar";
import { Messagebox } from "../../components/Messagebox";
import { ChangeEvent, FormEvent, useState } from "react";

const VideoAmplify: NextPage = () => {
  const [message, setMessage] = useState("Choose video to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [fileNames, setfileNames] = useState<Array<string>>([]);
  const [fileTypes, setfileTypes] = useState<Array<string>>([]);
  const [fileArray, setfileArray] = useState<Array<any>>([]);
  const [form, setForm] = useState<Array<FormData>>([]);
  const [promise, setPromise] = useState<Array<Promise<any>>>([]);
  const [data, setData] = useState<Array<any>>([]);

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preparing upload");

    setForm([]);
    setPromise([]);
    setData([]);

    try {
      const uuid: { [key: string]: any } = await (
        await fetch("/api/getuuid")
      ).json();
      const UUID: string = uuid.uuid;
      //console.log(fileArray);

      for (let i = 0; i < fileArray.length; i++) {
        //console.log(form);
        form.push(new FormData());
        form[i].append("item", fileArray[i]);
        form[i].append("uuid", UUID);
        form[i].append("filename", fileNames[i]);
      }

      setMessage("Uploading");

      for (let i = 0; i < form.length; i++) {
        //console.log(form);
        promise.push(
          fetch("/api/uploaditem", { method: "POST", body: form[i] })
        );
      }

      const response = await Promise.all(promise);

      let isOK = true;
      for (let i = 0; i < form.length; i++) {
        data.push(response[i]);
        //console.log(response[0]);
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

    setfileNames([]);
    setfileTypes([]);
    setfileArray([]);

    console.log(fileNames);

    for (let i = 0; i < 1; i++) {
      fileNames.push(event.target.files[0].name);
      fileTypes.push(event.target.files[0].type);
      fileArray.push(event.target.files[0]);

      setfileNames(fileNames);
      setfileTypes(fileTypes);
      setfileArray(fileArray);
    }

    console.log(fileNames);

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

export default VideoAmplify;
