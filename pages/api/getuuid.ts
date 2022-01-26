import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const uuid = randomUUID();
        res.status(200).json({uuid:uuid});
    } catch (err) {
        const errorJSON = JSON.stringify(err, Object.getOwnPropertyNames(err), '\t');
        res.status(500).json(errorJSON);
    }
}