import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {useSelector , useDispatch} from "react-redux"
import { showMessage } from "@/utils/notify";
import { IRootState } from "./store";
import { createUserSession } from "./store/authSlice";
import { setAuthToken } from "@/client/backendClient";


export type TUserSession = {
  user: {
    id: number;
    firstName:string;
    lastName:string;
    email: string;
    phoneNumber: string;
    phone_code: string;
    address: string;
    last_login_at: string;
    created_at: string;
    timezone: string;
  };
  accessToken: string;
  refreshToken: string;
  client: {
    company_url: string;
    sub_domain: string;
  }
};

export const useSession = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userSession = useSelector((state: IRootState) => state.auth);
  const [session, setSession] = useState<TUserSession | null>(null);

  useEffect(() => {
    if (userSession?.user) {
      setSession(userSession?.user);
    } else {
      setSession(null);
    }
  }, [userSession, pathname]);

  const setUserSession = (res: TUserSession) => {
    setAuthToken(res.accessToken);
    dispatch(createUserSession(res));
  };

  const updateUserSession = (res: TUserSession) => {
    dispatch(createUserSession(res));
  };

  const logout = (showToast: boolean = true) => {
   
  };

  return { session, setUserSession, logout, updateUserSession };
};
