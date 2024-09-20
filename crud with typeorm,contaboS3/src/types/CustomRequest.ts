// src/types/CustomRequest.ts
import { Request } from "express";

export interface CustomRequest extends Request {
  file?: {
    path: string;
    originalname: string;
  };
}
