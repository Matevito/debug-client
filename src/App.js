import { useEffect} from "react"
import { Router } from "./Router"

import { Container } from "@mui/material";

// redux comp
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

// api com
import get_userInfo from "./features/get_userInfo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAPI() {
      const storedToken = localStorage.getItem("deb-token");
      if (storedToken) {
        const userData = await get_userInfo(storedToken);
        if (!userData) {
          //invalid token.
          localStorage.removeItem("deb-token");
        } else {
          // login.
          dispatch(login(userData));
        }
      }
    };
    
    fetchAPI();
  })
  return (
        <Router />
  );
}

export default App;
