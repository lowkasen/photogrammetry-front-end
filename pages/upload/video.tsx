import type { NextPage } from "next";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Messagebox } from "../../components/Messagebox";
import { Navbar5 } from "../../components/Navbar5";
import { Uploadsuccessfuldialog } from "../../components/Uploadsuccesfuldialog";
import Amplify, { DataStore, Storage } from "aws-amplify";
import awsconfig from "../../aws-exports.js";
Amplify.configure(awsconfig);
import { UUIDModel } from "../../models";

const Video: NextPage = () => {
  const [message, setMessage] = useState("Choose files to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [filesButtonDisabled, setfilesButtonDisabled] = useState(false);
  const [showDialog, setshowDialog] = useState(false);
  let UUID: MutableRefObject<string> = useRef("");
  let fileTypes: MutableRefObject<Array<string>> = useRef([]);
  let fileArray: MutableRefObject<Array<any>> = useRef([]);
  let fileNames: MutableRefObject<Array<string>> = useRef([]);

  async function fileSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitButtonDisabled(true);
    setfilesButtonDisabled(true);
    setMessage("Preparing upload");

    try {
      if (fileArray.current.length > 1) {
        throw new Error("More than 1 file selected");
      }

      const uuid: { [key: string]: any } = await (
        await fetch("/api/getuuid")
      ).json();

      UUID.current = uuid.uuid;
      console.log(UUID.current);
      setMessage("Uploading");

      //   // Amplify Storage methods
      //   for (let i = 0; i < fileArray.current.length; i++) {
      //     zip.file(fileNames.current[i], fileArray.current[i]);
      //     // promise.current.push(
      //     //   Storage.put(UUID + "/" + fileNames.current[i], fileArray.current[i])
      //     // );
      //   }
      //   //const response1 = await Promise.all(promise.current);
      //   const zipblob = await zip.generateAsync({ type: "blob" });
      //   const response = await Storage.put(UUID + "_compressed.zip", zipblob);

      // Amplify Storage methods
      const response = await Storage.put(
        UUID.current + "_" + fileNames.current[0],
        fileArray.current[0]
      );

      // Save to Amplify DataStore
      await DataStore.save(
        new UUIDModel({
          DateTime: new Date().toISOString(),
          UUID: UUID.current,
        })
      );

      console.log("Done");
      setshowDialog(true);
      setMessage("Upload successful, UUID: " + UUID.current);
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
      console.log("Target files is null.");
      setSubmitButtonDisabled(true);
      setMessage("No files selected");
      return;
    }

    const numberOfFiles = event.target.files.length;
    if (numberOfFiles < 1) {
      setSubmitButtonDisabled(true);
      setMessage("No files selected");
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

    // if (
    //   !fileTypes.current.every(
    //     (v) => v === "image/jpeg" || v === "image/png" || v === "image/jpg"
    //   )
    // ) {
    //   // case if not all the files selected are images
    //   console.log("Filetype mismatch");
    //   setSubmitButtonDisabled(true);
    //   setMessage("Filetype: Only images allowed");
    // } else {
    //   // case if all files are images
    //   setSubmitButtonDisabled(false);
    //   setMessage("Ready to submit");
    // }

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
      <Navbar5 />
      <div className="flex flex-col justify-center items-center pt-40 pb-20 text-center font-bold lg:text-8xl text-6xl space-y-2">
        <div className="w-5/6 max-w-6xl">
          <h1>Upload video</h1>
          <form onSubmit={fileSubmitHandler} className="">
            <label className="flex flex-col items-center mt-14 mb-5 lg:mt-24 lg:mb-0 text-sm font-normal ">
              Email to
              <input
                type="email"
                required
                className="border-b-[1px] text-base font-thin w-56 focus:outline-none text-center mt-2"
                placeholder="email@realitystation.com"
              ></input>
            </label>
            <label>
              <span className="sr-only">Choose video</span>
              <input
                accept="video/*"
                type="file"
                onChange={fileChangeHandler}
                disabled={filesButtonDisabled}
                className="
                  text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-[1px] file:border-blue-600 file:text-sm file:font-normal
                  file:bg-white file:text-blue-600 hover:file:bg-blue-100 hover:file:cursor-pointer hover:cursor-pointer
                  rounded-md border-2 border-slate-200 py-5 px-2 border-dashed
                  disabled:opacity-40 disabled:hover:cursor-not-allowed
                  hover:file:disabled:bg-white hover:file:disabled:cursor-not-allowed
                  file:disabled:text-gray-200 file:disabled:border-gray-200
                "
              />
            </label>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="
                  cursor-pointer text-white bg-blue-600 px-6 py-3 rounded-md text-sm font-normal hover:bg-black my-6
                  disabled:bg-gray-100 disabled:text-gray-200 disabled:cursor-not-allowed
                "
                disabled={submitButtonDisabled}
              >
                Submit
              </button>
            </div>
          </form>
          <Messagebox message={message} />
        </div>
      </div>
      <Uploadsuccessfuldialog
        showDialog={showDialog}
        setshowDialog={setshowDialog}
        uuid={UUID.current}
      />
    </div>
  );
};

export default Video;
