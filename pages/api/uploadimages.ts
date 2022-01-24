import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto';
import { readFile } from 'fs/promises';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const photo = await readFile("public/Screenshot 2022-01-22 105541.png");
        const REGION = "ap-southeast-1";
        const s3Client = new S3Client({ region: REGION });
        const params = {
            Bucket: "photogrammetry-capstone-bucket-1", // The name of the bucket. For example, 'sample_bucket_101'.
            Key: randomUUID() + "/sample_upload.png", // The name of the object. For example, 'sample_upload.txt'.
            Body: photo, // The content of the object. For example, 'Hello world!".
        };
        const command = new PutObjectCommand(params);
        const results = await s3Client.send(command);

        res.status(200).json({
            params: params
        })

    } catch (err) {
        const errorJSON = JSON.stringify(err, Object.getOwnPropertyNames(err),'\t');
        res.status(500).json(errorJSON);
    }
}