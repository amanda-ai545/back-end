import axios, { isAxiosError } from "axios";
import { BASE_URL } from ".";

export const getAllUsers = async (page: number = 1) => {
  try {
    const apiUrl = `${BASE_URL}/api/users?page=${page}`;

    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    // console.error('[server]: error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const apiUrl = `${BASE_URL}/api/users/${id}`;

    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export type CreateUser = {
  name: string;
  job: string;
};

export const createUser = async ({ name, job }: CreateUser) => {
  try {
    const apiUrl = `${BASE_URL}/api/users`;

    const response = await axios.post(apiUrl, { name, job });

    return response.data;
  } catch (error) {
    throw error;
  }
};
