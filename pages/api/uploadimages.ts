import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const REGION = "ap-southeast-1";
        const s3Client = new S3Client({ region: REGION });
        const params = {
            Bucket: "photogrammetry-capstone-bucket-1", // The name of the bucket. For example, 'sample_bucket_101'.
            Key: "hello/sample_upload.txt", // The name of the object. For example, 'sample_upload.txt'.
            Body: "Hello world!", // The content of the object. For example, 'Hello world!".
        };
        const command = new PutObjectCommand(params);
        const results = await s3Client.send(command);
        console.log(results);
    } catch(err) {
        console.error(err);
    }
    
    res.status(200).json({ name: 'John Doe' })
}