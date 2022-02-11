import type { NextPage } from "next";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Navbar4 } from "../../components/Navbar4";
import { Messagebox } from "../../components/Messagebox";
import Amplify, { DataStore, Storage } from "aws-amplify";
import awsconfig from "../../aws-exports.js";
Amplify.configure(awsconfig);
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { UUIDModel } from "../../models";
import JSZip from "jszip";

const Images: NextPage = () => {
  const [message, setMessage] = useState("Choose files to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [filesButtonDisabled, setfilesButtonDisabled] = useState(false);
  let fileTypes: MutableRefObject<Array<string>> = useRef([]);
  let fileArray: MutableRefObject<Array<any>> = useRef([]);
  let fileNames: MutableRefObject<Array<string>> = useRef([]);

  const Input = styled("input")({
    display: "none",
  });

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    const zip = new JSZip();

    event.preventDefault();
    setSubmitButtonDisabled(true);
    setfilesButtonDisabled(true);
    setMessage("Preparing upload");

    try {
      const uuid: { [key: string]: any } = await (
        await fetch("/api/getuuid")
      ).json();
      const UUID: string = uuid.uuid;

      setMessage("Uploading");

      // Amplify Storage methods
      for (let i = 0; i < fileArray.current.length; i++) {
        zip.file(fileNames.current[i], fileArray.current[i]);
        // promise.current.push(
        //   Storage.put(UUID + "/" + fileNames.current[i], fileArray.current[i])
        // );
      }
      //const response1 = await Promise.all(promise.current);
      const zipblob = await zip.generateAsync({ type: "blob" });
      const response = await Storage.put(UUID + "_compressed.zip", zipblob);

      // Save to Amplify DataStore
      await DataStore.save(
        new UUIDModel({
          DateTime: new Date().toISOString(),
          UUID: UUID,
        })
      );

      setMessage("Upload successful, uuid: " + UUID);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }

    setSubmitButtonDisabled(false);
    setfilesButtonDisabled(false);
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

    fileNames.current = [];
    fileTypes.current = [];
    fileArray.current = [];

    for (let i = 0; i < numberOfFiles; i++) {
      fileNames.current.push(event.target.files[i].name);
      fileTypes.current.push(event.target.files[i].type);
      fileArray.current.push(event.target.files[i]);
    }

    if (
      !fileTypes.current.every(
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
      <Navbar4 />
      <div className="flex flex-col justify-center items-center pt-40 pb-20 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className="w-5/6 max-w-6xl">
          <h1>Upload images</h1>
          <form onSubmit={fileSubmitHandler} className="">
            <label>
              <span className="sr-only">Choose profile photo</span>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={fileChangeHandler}
                disabled={filesButtonDisabled}
                className="
                  text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                "
              />
            </label>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="cursor-pointer border-[1px] border-blue-600 text-blue-600 px-6 py-3 rounded-md text-sm font-normal hover:bg-blue-50 my-6"
                disabled={submitButtonDisabled}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  );
};

export default Images;
