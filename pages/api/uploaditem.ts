import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand, QuoteFields } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import formidable from "formidable";
//const formidable = require("formidable-serverless");
import { Fields, File, Files } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("using formidable");
    const form = formidable({ multiples: true });

    console.log("using promiseForm");
    const promiseForm = new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        console.log("parsing form");
        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) {
            console.log("rejected form");
            console.log(req);
            console.log(err);
            reject(err);
          } else {
            console.log("successfully parsed form");
            console.log(req);
            resolve({ fields, files });
          }
        });
      }
    );

    console.log("await promiseForm");
    const test = await promiseForm;
    const myFile = test.files.item[0] as File;
    console.log(myFile);
    // const myFile = test.files.item as File & {
    //   path: string;
    //   originalFilename: string;
    //   newFilename: string;
    // };

    console.log("originalFilename: " + myFile.originalFilename);
    console.log("newFilename: " + myFile.newFilename);
    const item = await readFile(myFile.filepath);
    console.log("path parsed: " + myFile.filepath);

    const REGION = "ap-southeast-1";
    const s3Client = new S3Client({ region: REGION });
    const params = {
      Bucket: "photogrammetry-capstone-bucket-1", // The name of the bucket. For example, 'sample_bucket_101'.
      Key: test.fields.uuid + "/" + test.fields.filename, // The name of the object. For example, 'sample_upload.txt'.
      Body: item, // The content of the object. For example, 'Hello world!".
    };
    const command = new PutObjectCommand(params);
    const results = await s3Client.send(command);

    res.status(200).json({
      params: {
        Bucket: params.Bucket,
        Key: params.Key,
      },
    });
  } catch (err) {
    console.log(err);
    const errorJSON = JSON.stringify(
      err,
      Object.getOwnPropertyNames(err),
      "\t"
    );
    res.status(500).json(errorJSON);
  }
}
