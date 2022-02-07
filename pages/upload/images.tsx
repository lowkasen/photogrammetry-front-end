import type { NextPage } from "next";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Navbar } from "../../components/Navbar";
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
      <Navbar />
      <h2>Upload images</h2>
      <form onSubmit={fileSubmitHandler}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={fileChangeHandler}
              disabled={filesButtonDisabled}
            />
            <Button
              component="span"
              size="small"
              disabled={filesButtonDisabled}
            >
              Choose files
            </Button>
          </label>
          <label htmlFor="contained-submit-button">
            <Input
              id="contained-submit-button"
              type="submit"
              disabled={submitButtonDisabled}
            />
            <Button
              variant="contained"
              component="span"
              disabled={submitButtonDisabled}
            >
              Submit
            </Button>
          </label>
        </Stack>
      </form>
      <hr></hr>
      <Messagebox message={message} />
    </div>
  );
};

export default Images;
