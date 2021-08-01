import axios from "axios";

const configuredAxios = axios.create({
  baseURL: process.env.FAUNA_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
  },
});

export default configuredAxios;
