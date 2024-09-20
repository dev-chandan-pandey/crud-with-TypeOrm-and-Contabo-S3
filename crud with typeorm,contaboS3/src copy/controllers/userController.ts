// import { CustomRequest } from "../types/CustomRequest";

// export const createUserHandler = async (req: Request, res: Response) => {
//   const form = new IncomingForm();

//   form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
//     if (err) {
//       logger.error(`Error parsing form data: ${err.message}`);
//       return res.status(400).json({ message: "Error parsing form data" });
//     }

//     const name: string = Array.isArray(fields.name) ? fields.name[0] : fields.name || "";
//     const email: string = Array.isArray(fields.email) ? fields.email[0] : fields.email || "";

//     const { error } = userSchema.validate({ name, email });
//     if (error) {
//       logger.warn(`Validation error: ${error.details[0].message}`);
//       return res.status(400).send(error.details[0].message);
//     }

//     try {
//       let imageUrl: string | undefined;

//       if (files.file) {
//         const file = files.file as any;
//         const filePath = file.path;
//         const fileName = file.name;

//         imageUrl = await uploadToS3(filePath, fileName);
//         logger.info(`File uploaded successfully: ${fileName}`);
//       }

//       const user = await createUser(name, email, imageUrl);
//       logger.info(`User created: ${JSON.stringify(user)}`);
//       res.status(201).json(user);
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(`Error creating user: ${err.message}`);
//         res.status(500).json({ message: err.message });
//       } else {
//         logger.error(`Unknown error: ${JSON.stringify(err)}`);
//         res.status(500).json({ message: "An unknown error occurred" });
//       }
//     }
//   });
// };
// export const createUserHandler = async (req: Request, res: Response) => {
//     const form = new IncomingForm();
  
//     form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
//       if (err) {
//         logger.error(`Error parsing form data: ${err.message}`);
//         return res.status(400).json({ message: "Error parsing form data" });
//       }
  
//       // Extract name and email fields
//       const name: string = Array.isArray(fields.name) ? fields.name[0] : fields.name || "";
//       const email: string = Array.isArray(fields.email) ? fields.email[0] : fields.email || "";
  
//       // Validate name and email
//       const { error } = userSchema.validate({ name, email });
//       if (error) {
//         logger.warn(`Validation error: ${error.details[0].message}`);
//         return res.status(400).send(error.details[0].message);
//       }
  
//       try {
//         let imageUrl: string | undefined;
  
//         // Handle the file (image) if it exists (check for 'imageUrl', not 'file')
//         if (files.imageUrl) {
//           const file = files.imageUrl as any;
//           const filePath = file.path;
//           const fileName = file.name;
  
//           // Upload the file to S3
//           imageUrl = await uploadToS3(filePath, fileName);
//           logger.info(`File uploaded successfully: ${fileName}`);
//         }
  
//         // Create the user in the database with the imageUrl (or undefined if no image)
//         const user = await createUser(name, email, imageUrl);
//         logger.info(`User created: ${JSON.stringify(user)}`);
//         res.status(201).json(user);
//       } catch (err) {
//         if (err instanceof Error) {
//           logger.error(`Error creating user: ${err.message}`);
//           res.status(500).json({ message: err.message });
//         } else {
//           logger.error(`Unknown error: ${JSON.stringify(err)}`);
//           res.status(500).json({ message: "An unknown error occurred" });
//         }
//       }
//     });
//   };

import { Request, Response } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../services/userService";
import { uploadToS3 } from "../utils/s3Uploader";
import { userSchema } from "../utils/validation";
import { IncomingForm, Fields, Files } from "formidable";
import logger from "../utils/logger";  // Import the logger
import fs from "fs";
export const createUserHandler = async (req: Request, res: Response) => {
  const form = new IncomingForm({
    keepExtensions: true,  // Keep file extensions
    uploadDir: './uploads',  // Directory where files will be temporarily stored
    multiples: false,  // To handle single file uploads
    maxFileSize: 200 * 1024 * 1024,  // Set max file size limit (e.g. 200MB)
  });

  // Create the uploads directory if it does not exist
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      logger.error(`Error parsing form data: ${err.message}`);
      return res.status(400).json({ message: "Error parsing form data" });
    }

    // Log the files object to verify what is being received
    logger.info(`Files received: ${JSON.stringify(files)}`);

    const name: string = Array.isArray(fields.name) ? fields.name[0] : fields.name || "";
    const email: string = Array.isArray(fields.email) ? fields.email[0] : fields.email || "";

    // Validate name and email
    const { error } = userSchema.validate({ name, email });
    if (error) {
      logger.warn(`Validation error: ${error.details[0].message}`);
      return res.status(400).send(error.details[0].message);
    }

    try {
      let imageUrl: string | undefined;

      // Handle the file (image) if it exists
      if (files.imageUrl && Array.isArray(files.imageUrl)) {
        // Cast the file as any to avoid TypeScript issues
        const file = files.imageUrl[0] as any;

        // Use the correct properties for filepath and filename
        const filePath = file.filepath;  // Use 'filepath' from Formidable v2+
        const fileName = file.originalFilename;  // Use 'originalFilename' from Formidable

        // Log file path and name for debugging
        logger.info(`File path: ${filePath}, File name: ${fileName}`);

        // Ensure filePath is defined
        if (!filePath) {
          throw new Error("File path is undefined");
        }

        // Upload the file to S3
        imageUrl = await uploadToS3(filePath, fileName);
        logger.info(`File uploaded successfully: ${fileName}`);
      }

      // Create the user in the database with the imageUrl (or undefined if no image)
      const user = await createUser(name, email, imageUrl);
      logger.info(`User created: ${JSON.stringify(user)}`);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error creating user: ${err.message}`);
        res.status(500).json({ message: err.message });
      } else {
        logger.error(`Unknown error: ${JSON.stringify(err)}`);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });
};
export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    logger.info(`Fetched all users: ${users.length} records`);
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error fetching users: ${err.message}`);
      res.status(500).json({ message: err.message });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(err)}`);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(+req.params.id);
    if (!user) {
      logger.warn(`User not found: ${req.params.id}`);
      return res.status(404).send("User not found");
    }
    logger.info(`Fetched user: ${JSON.stringify(user)}`);
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error fetching user by ID: ${err.message}`);
      res.status(500).json({ message: err.message });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(err)}`);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// export const updateUserHandler = async (req: Request, res: Response) => {
//   try {
//     const user = await updateUser(+req.params.id, req.body);
//     logger.info(`User updated: ${JSON.stringify(user)}`);
//     res.json(user);
//   } catch (err) {
//     if (err instanceof Error) {
//       logger.error(`Error updating user: ${err.message}`);
//       res.status(500).json({ message: err.message });
//     } else {
//       logger.error(`Unknown error: ${JSON.stringify(err)}`);
//       res.status(500).json({ message: "An unknown error occurred" });
//     }
//   }
// };


export const updateUserHandler = async (req: Request, res: Response) => {
  const form = new IncomingForm({
    keepExtensions: true,  // Keep file extensions
    uploadDir: './uploads',  // Directory where files will be temporarily stored
    multiples: false,  // To handle single file uploads
    maxFileSize: 200 * 1024 * 1024,  // Set max file size limit (e.g. 200MB)
  });

  // Create the uploads directory if it does not exist
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      logger.error(`Error parsing form data: ${err.message}`);
      return res.status(400).json({ message: "Error parsing form data" });
    }

    try {
      // Fetch the user by ID to update
      const user = await getUserById(+req.params.id);
      if (!user) {
        logger.warn(`User not found: ${req.params.id}`);
        return res.status(404).send("User not found");
      }

      // Update fields if provided
      const name: string = Array.isArray(fields.name) ? fields.name[0] : fields.name || user.name;
      const email: string = Array.isArray(fields.email) ? fields.email[0] : fields.email || user.email;
      let imageUrl: string | undefined = user.imageUrl;

      // Handle the file (image) if it exists
      if (files.imageUrl && Array.isArray(files.imageUrl)) {
        const file = files.imageUrl[0] as any;
        const filePath = file.filepath;  // Correct for Formidable v2+
        const fileName = file.originalFilename;  // Use 'originalFilename'

        // Log file path and name for debugging
        logger.info(`File path: ${filePath}, File name: ${fileName}`);

        if (!filePath) {
          throw new Error("File path is undefined");
        }

        // Upload the file to S3
        imageUrl = await uploadToS3(filePath, fileName);
        logger.info(`File uploaded successfully: ${fileName}`);
      }

      // Update the user with the new data
      const updatedUser = await updateUser(+req.params.id, {
        name,
        email,
        imageUrl,
      });

      logger.info(`User updated: ${JSON.stringify(updatedUser)}`);
      res.json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error updating user: ${err.message}`);
        res.status(500).json({ message: err.message });
      } else {
        logger.error(`Unknown error: ${JSON.stringify(err)}`);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });
};
export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    await deleteUser(+req.params.id);
    logger.info(`User deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error deleting user: ${err.message}`);
      res.status(500).json({ message: err.message });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(err)}`);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

