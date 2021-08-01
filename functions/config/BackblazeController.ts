import BackBlazeB2 from "backblaze-b2";
import dotenv from "dotenv";
dotenv.config();

// Check env variables for undefined values
if (typeof process.env.BACKBLAZE_APPLICATION_KEY === "undefined")
  throw new Error("Backblaze Application Key is Undefined");
if (typeof process.env.BACKBLAZE_KEY_ID === "undefined")
  throw new Error("Backblaze Key ID is Undefined");
if (typeof process.env.BACKBLAZE_BUCKET_ID === "undefined")
  throw new Error("Backblaze Bucket ID is Undefined");

const b2Instance = new BackBlazeB2({
  applicationKey: process.env.BACKBLAZE_APPLICATION_KEY || "",
  applicationKeyId: process.env.BACKBLAZE_KEY_ID || "",
});

const getUploadURL = async () => {
  try {
    await b2Instance.authorize();

    const response = await b2Instance.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID || "",
    });

    if (Number(response.status) !== 200)
      throw new Error("The upload URL was not found.");

    const uploadURL = {
      url: response.data.uploadUrl,
      authToken: response.data.authorizationToken,
    };

    return uploadURL;
  } catch (ex) {
    console.error(ex);
  }
};

export { b2Instance, getUploadURL };
