import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto';
import { readFile } from 'fs/promises';
import formidable, { File, Files } from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    },
};

// function getBase64(file: any) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//         console.log(reader.result);
//     };
//     reader.onerror = function (error) {
//         console.log('Error: ', error);
//     };
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            //console.log(typeof files.photo);
            req.body = fields;
            //console.log(files.photo[0].filepath);
            //const photo1 = getBase64(files.photo);
            //console.log(photo1)

            const myFile = files.photo as File

            const photo = await readFile(myFile.filepath);
            const REGION = "ap-southeast-1";
            const s3Client = new S3Client({ region: REGION });
            const params = {
                Bucket: "photogrammetry-capstone-bucket-1", // The name of the bucket. For example, 'sample_bucket_101'.
                Key: req.body.uuid + "/" + req.body.filename, // The name of the object. For example, 'sample_upload.txt'.
                Body: photo //Buffer.from(photo, 'base64'), // The content of the object. For example, 'Hello world!".
            };
            const command = new PutObjectCommand(params);
            const results = await s3Client.send(command);

            res.status(200).json({
                params: params
            })
        });
    } catch (err) {
        const errorJSON = JSON.stringify(err, Object.getOwnPropertyNames(err), '\t');
        res.status(500).json(errorJSON);
    }
}