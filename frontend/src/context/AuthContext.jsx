import { createContext } from "react";
//trạng thái của user và logout ở app.jsx
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

