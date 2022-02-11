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

const Videoold: NextPage = () => {
  const [message, setMessage] = useState("Choose video to upload");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [filesButtonDisabled, setfilesButtonDisabled] = useState(false);
  let fileTypes: MutableRefObject<Array<string>> = useRef([]);
  let fileArray: MutableRefObject<Array<any>> = useRef([]);
  let fileNames: MutableRefObject<Array<string>> = useRef([]);

  const Input = styled("input")({
    display: "none",
  });

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
      const UUID: string = uuid.uuid;

      setMessage("Uploading");

      // Amplify Storage methods
      const response = await Storage.put(
        UUID + "_" + fileNames.current[0],
        fileArray.current[0]
      );

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
      <Navbar />
      <h2>Upload video</h2>
      <form onSubmit={fileSubmitHandler}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <label htmlFor="contained-button-file">
            <Input
              accept="video/*"
              id="contained-button-file"
              type="file"
              onChange={fileChangeHandler}
              disabled={filesButtonDisabled}
            />
            <Button
              component="span"
              size="small"
              disabled={filesButtonDisabled}
            >
              Choose video
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

export default Videoold;
