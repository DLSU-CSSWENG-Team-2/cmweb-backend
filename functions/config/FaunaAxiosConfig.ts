/**
 * @file This file defines the default Axios request object that will be used for requests
 * to FaunaDB.
 * @author Adriel Isaiah V. Amoguis
 */

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
/**
 * The main configuration for the FaunaDB request needs.
 */
const configuredAxios = axios.create({
  /**
   * The base URL for FaunaDB's connection endpoint. This should be stored in an
   * environment variable.
   */
  baseURL: process.env.FAUNA_BASE_URL,
  headers: {
    /**
     * The authorization bearer token used by FaunaDB to identify the application's identity and
     * authorize this application.
     */
    Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
  },
});

export default configuredAxios;
