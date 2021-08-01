/**
 * @file Handles the needed operations with the backblaze-b2 bucket.
 * @author Adriel Isaiah V. Amoguis
 */

import BackBlazeB2 from "backblaze-b2";
import dotenv from "dotenv";
import RandExp from "randexp";

// Load environment variables
dotenv.config();

// Interfaces
/**
 * This interface defines the UploadUrl type definition.
 */
interface UploadUrl {
  /**
   * This defines the blazebucket upload link that should be used.
   */
  url: string;

  /**
   * This is the authorization token that is required when using the provided upload link.
   */
  authToken: string;
}

// Check env variables for undefined values
if (typeof process.env.BACKBLAZE_APPLICATION_KEY === "undefined")
  throw new Error("Backblaze Application Key is Undefined");
if (typeof process.env.BACKBLAZE_KEY_ID === "undefined")
  throw new Error("Backblaze Key ID is Undefined");
if (typeof process.env.BACKBLAZE_BUCKET_ID === "undefined")
  throw new Error("Backblaze Bucket ID is Undefined");

/**
 * This variable houses the main backblaze-b2 instance that this entire controller will use.
 */
const b2Instance = new BackBlazeB2({
  applicationKey: process.env.BACKBLAZE_APPLICATION_KEY || "",
  applicationKeyId: process.env.BACKBLAZE_KEY_ID || "",
});

// Utility Functions
/**
 * This method generates a random file name based on the format the developers agreed on.
 * The format is given by the following regular expression: /[a-z]|[A-Z]|[0-9]{11}/.
 * This ensures that the string is 11 alphanumeric characters long.
 * @returns filename as a string
 */
const generateFileName = (): string => {
  const randomKey = new RandExp(/[a-z]|[A-Z]|[0-9]{11}/).gen();
  const dateString = new Date().toISOString().replace(/-|:/g, ".");
  return `${dateString}:${randomKey}`;
};

// Operation Functions
/**
 * This method grabs the upload url from the given backblaze bucket ID from the environment variables.
 * @returns an object that contains the upload url and the authorization token for that upload url.
 */
const getUploadURL = async (): Promise<UploadUrl> => {
  let uploadUrl: UploadUrl = { url: "", authToken: "" };
  try {
    await b2Instance.authorize();

    const response = await b2Instance.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID || "",
    });

    if (Number(response.status) !== 200)
      throw new Error("The upload URL was not found: " + response.statusText);

    uploadUrl = {
      url: response.data.uploadUrl,
      authToken: response.data.authorizationToken,
    };
  } catch (ex) {
    console.error(ex);
  }

  return uploadUrl;
};

/**
 * This method does the actual uploading of the file blob to the backblaze server.
 * The data type is implicit and is automatically determined by the backblaze server.
 * @param dataBuffer is the NodeJS/JavaScript data buffer to be uploaded.
 * @param fileExt is the original file extension of the file to be uploaded, without the period (.).
 * @returns the generated filename as a string that should be stored somewhere for later access.
 */
const uploadFile = async (
  dataBuffer: Buffer,
  fileExt: string
): Promise<string> => {
  // Get the upload url and deconstruct
  const { url, authToken }: UploadUrl = await getUploadURL();
  let filename = "";
  if (url === "" || authToken === "")
    throw new Error("UploadUrl details are missing.");

  try {
    filename = `${generateFileName()}.${fileExt.replace(/./g, "")}`;
    const fileUpload = await b2Instance.uploadFile({
      uploadUrl: url,
      uploadAuthToken: authToken,
      fileName: filename,
      data: dataBuffer,
    });

    if (Number(fileUpload.status) !== 200)
      throw new Error("The file upload has failed: " + fileUpload.statusText);
  } catch (ex) {
    console.error(ex);
  }
  return filename;
};

export { b2Instance, getUploadURL, uploadFile };
