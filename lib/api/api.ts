import axios, { type AxiosInstance } from 'axios';

//===========================================================================

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
