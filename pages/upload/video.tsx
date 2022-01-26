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

const video: NextPage = () => {

  const [message, setMessage] = useState("Choose video to upload");
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

    if (event.target.files.length < 1) {
      setSubmitButtonDisabled(true);
      return
    }

    for (let i = 0; i < 1; i++) {
      fileNames.push(event.target.files[0].name);
      fileTypes.push(event.target.files[0].type);
      fileArray.push(event.target.files[0]);
    }

    if (!fileTypes.every(v => v.includes("video"))) {
      // case if not all the files selected are video
      setSubmitButtonDisabled(true);
      setMessage("Filetype: Only videos allowed");
    } else {
      // case if all files are images
      setSubmitButtonDisabled(false);
      setMessage("Ready to submit");
    }
  }

  return (
    <div>
      <Homebar />
      <h1>Upload video</h1>
      <form onSubmit={fileSubmitHandler}>
        <input type="file" id="myFile" name="filename" onChange={fileChangeHandler}></input>
        <input type="submit" disabled={submitButtonDisabled}></input>
      </form>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  )
}

export default video