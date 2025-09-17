// client/endpoints/auth/login.ts
import { backendClient, setAuthToken } from "@/client/backendClient";

export const LOGIN_KEY = "login";

export type TLogin = {
  email: string;
  password: string;
};

export const loginRequest = async (payload: TLogin) => {
  const response = await backendClient.post("/auth/login", payload);

 
  const { token, role } = response.data;

  if (token) {
    setAuthToken(token); 
    localStorage.setItem("role", role);
  }

  return response;
};
