import { DataStore } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await DataStore.clear();
    res.status(200).json({ message: "DataStore cleared" });
  } catch (err) {
    const errorJSON = JSON.stringify(
      err,
      Object.getOwnPropertyNames(err),
      "\t"
    );
    res.status(500).json(errorJSON);
  }
}
