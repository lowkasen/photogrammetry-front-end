import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Homebar } from '../../components/homebar'
import { Messagebox } from '../../components/Messagebox'

const fileTypes: Array<string> = []
const fileArray: Array<any> = []
const fileNames: Array<string> = []
const form: Array<FormData> = []
const promise: Array<Promise<any>> = []
const data: Array<any> = []

const images: NextPage = () => {

  const [message, setMessage] = useState("Choose files to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preparing upload");

    try {
      const uuid: { [key: string]: any } = await (await fetch("/api/getuuid")).json();
      const UUID: string = uuid.uuid

      for (let i = 0; i < fileArray.length; i++) {
        form.push(new FormData());
        form[i].append("item", fileArray[i]);
        form[i].append("uuid", UUID);
        form[i].append("filename", fileNames[i]);
      }

      setMessage("Uploading");

      for (let i=0; i < form.length; i++) {
        promise.push(fetch("/api/uploaditem", {method: 'POST', body: form[i]}));
      }

      Promise.all(promise).then((response) => {
        for (let i=0; i < form.length; i++) {
          data.push(response[i]);
        }
      })

      // const response = await fetch("/api/uploadimages", {
      //   method: 'POST',
      //   body: form[0]
      // });
      // const data = await response.json();

      setMessage("Upload successful, uuid: " + UUID);

    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }

  }

  // Function that runs when files are changed in the form
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    
    if (!event.target.files) {
      setSubmitButtonDisabled(true);
      return
    }

    const numberOfFiles = event.target.files.length;
    if (numberOfFiles > 50 || numberOfFiles < 1) {
      setSubmitButtonDisabled(true);
      return
    }

    for (let i = 0; i < numberOfFiles; i++) {
      fileNames.push(event.target.files[i].name);
      fileTypes.push(event.target.files[i].type);
      fileArray.push(event.target.files[i]);
    }

    if (!fileTypes.every(v => v === "image/jpeg" || v === "image/png" || v === "image/jpg")) {
      // case if not all the files selected are images
      setSubmitButtonDisabled(true);
      setMessage("Filetype: Only images allowed");
    } else {
      // case if all files are images
      setSubmitButtonDisabled(false);
      setMessage("Ready to submit");
    }
  }

  return (
    <div>
      <Homebar />
      <h1>Upload images</h1>
      {/* <form action="https://httpbin.org/post" method="POST" encType="multipart/form-data" id ="theForm"> */}
      <form onSubmit={fileSubmitHandler}>
        <input type="file" id="myFile" name="filename" onChange={fileChangeHandler} multiple></input>
        <input type="submit" disabled={submitButtonDisabled}></input>
      </form>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  )
}

export default images
