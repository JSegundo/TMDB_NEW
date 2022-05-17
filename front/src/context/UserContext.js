import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useContext,
} from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const value = useMemo(() => {
    return {
      user,
      setUser,
      token,
      setToken,
    };
  }, [user, token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}

export default UserProvider;
