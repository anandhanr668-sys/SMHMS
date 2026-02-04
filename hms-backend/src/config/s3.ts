// src/config/s3.ts

import { env } from "./env.js";

export interface S3Client {
  upload: (key: string, body: Buffer) => Promise<string>;
}

/**
 * Dummy S3 client (used when S3 is not configured)
 */
const noopClient: S3Client = {
  upload: async () => {
    throw new Error("S3 is not configured");
  }
};

/**
 * Returns a usable S3 client only if enabled
 */
export const s3Client: S3Client = env.s3.enabled
  ? {
      upload: async (key: string, body: Buffer) => {
        // Placeholder – real AWS SDK added later
        console.log(`Uploading ${key} (${body.length} bytes) to S3`);
        return `s3://${env.s3.bucket}/${key}`;
      }
    }
  : noopClient;
