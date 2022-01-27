import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand, QuoteFields } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import formidable, { Fields, File, Files } from "formidable";

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

    const promiseForm = new Promise<{ fields: Fields; files: Files }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      }
    );

    const test = await promiseForm;
    const myFile = test.files.item as File;

    const item = await readFile(myFile.filepath);
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
      params: params,
    });
  } catch (err) {
    const errorJSON = JSON.stringify(
      err,
      Object.getOwnPropertyNames(err),
      "\t"
    );
    res.status(500).json(errorJSON);
  }
}
