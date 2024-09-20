// import AWS from "aws-sdk";
// import fs from "fs";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: process.env.S3_REGION,
// });

// export const uploadToS3 = async (filePath: string, fileName: string) => {
//   const fileStream = fs.createReadStream(filePath);

//   const uploadParams = {
//     Bucket: process.env.S3_BUCKET_NAME || "hsncuexam",
//     Key: fileName,
//     Body: fileStream,
//   };

//   try {
//     const data = await s3.upload(uploadParams).promise();
//     return data.Location; // URL of the uploaded image
//   } catch (error) {
//     if (error instanceof Error) {
//                 // Now TypeScript knows `error` is of type `Error`
//                 throw new Error("Error uploading file: " + error.message);
//               } else {
//                 // Handle the case where `error` is not an instance of `Error`
//                 throw new Error("An unknown error occurred during the upload.");
//               }
//   }
// };
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import fs from "fs";

// // Initialize the S3 client
// const s3Client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
//   },
//   region: process.env.S3_REGION,
// });

// export const uploadToS3 = async (filePath: string, fileName: string) => {
//   const fileStream = fs.createReadStream(filePath);

//   const uploadParams = {
//     Bucket: process.env.S3_BUCKET_NAME || "hsncuexam", // Replace with your bucket name
//     Key: fileName, // File name (or path inside the bucket)
//     Body: fileStream, // File stream
//   };

//   try {
//     // Upload the file to S3 using the v3 SDK
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));

//     // Return the file location in S3
//     return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error("Error uploading file: " + error.message);
//     } else {
//       throw new Error("An unknown error occurred during the upload.");
//     }
//   }
// };

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import fs from "fs";

// // Initialize the S3 client
// const s3Client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
//   },
//   region: process.env.S3_REGION,
// });

// export const uploadToS3 = async (filePath: string, fileName: string) => {
//   const fileStream = fs.createReadStream(filePath);

//   const uploadParams = {
//     Bucket: process.env.S3_BUCKET_NAME || "hsncuexam", // Replace with your bucket name
//     Key: fileName, // File name (or path inside the bucket)
//     Body: fileStream, // File stream
//   };

//   try {
//     // Upload the file to S3 using the v3 SDK
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));

//     // Return the file location in S3
//     return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error("Error uploading file: " + error.message);
//     } else {
//       throw new Error("An unknown error occurred during the upload.");
//     }
//   }
// };




// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import fs from "fs";

// // Initialize the S3 client with Contabo credentials
// const s3Client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.CONTABO_S3_ACCESS_KEY_ID as string,  // Updated
//     secretAccessKey: process.env.CONTABO_S3_SECRET_ACCESS_KEY as string,  // Updated
//   },
//   region: process.env.CONTABO_S3_REGION,  // Updated
// });

// export const uploadToS3 = async (filePath: string, fileName: string) => {
//   const fileStream = fs.createReadStream(filePath);

//   const uploadParams = {
//     Bucket: process.env.CONTABO_S3_BUCKET_NAME || "hsncuexam",  // Updated
//     Key: fileName,  // File name (or path inside the bucket)
//     Body: fileStream,  // File stream
//   };

//   try {
//     // Upload the file to Contabo's S3 storage using the v3 SDK
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));

//     // Return the file location in Contabo S3 storage
//     return `${process.env.CONTABO_S3_BUCKET_URL}/${fileName}`;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error("Error uploading file: " + error.message);
//     } else {
//       throw new Error("An unknown error occurred during the upload.");
//     }
//   }
// };


import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

// Initialize the S3 client for Contabo
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.CONTABO_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CONTABO_S3_SECRET_ACCESS_KEY as string,
  },
  endpoint: process.env.CONTABO_S3_BUCKET_URL,  // Corrected for Contabo
  region: process.env.CONTABO_S3_REGION,  // Corrected for Contabo
  forcePathStyle: true,  // Required for S3-compatible services like Contabo
});

export const uploadToS3 = async (filePath: string, fileName: string) => {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.CONTABO_S3_BUCKET_NAME || "hsncuexam",  // Bucket name
    Key: fileName,  // File name (or path inside the bucket)
    Body: fileStream,  // File stream
  };

  try {
    // Upload the file to Contabo's S3 storage using the v3 SDK
    const data = await s3Client.send(new PutObjectCommand(uploadParams));

    // Return the file location in Contabo S3 storage
    return `${process.env.CONTABO_S3_BUCKET_URL}/${fileName}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error uploading file: " + error.message);
    } else {
      throw new Error("An unknown error occurred during the upload.");
    }
  }
};





// export const uploadToS3 = async (filePath: string, fileName: string) => {
//     const fileStream = fs.createReadStream(filePath);
  
//     const uploadParams = {
//       Bucket: process.env.S3_BUCKET_NAME || "hsncuexam",
//       Key: fileName,
//       Body: fileStream,
//     };
  
//     try {
//       const data = await s3.upload(uploadParams).promise();
//       return data.Location; // URL of the uploaded image
//     } catch (error) {
//       if (error instanceof Error) {
//         // Now TypeScript knows `error` is of type `Error`
//         throw new Error("Error uploading file: " + error.message);
//       } else {
//         // Handle the case where `error` is not an instance of `Error`
//         throw new Error("An unknown error occurred during the upload.");
//       }
//     }
//   };
  
