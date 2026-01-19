import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const backendURL = 'https://fullstack-genesis-project.onrender.com';
// const backendURL = 'http://localhost:3000/';
const baseURL = `${backendURL}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
