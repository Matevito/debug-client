import { useEffect, useRef } from "react"
import { Router } from "./Router"

// redux comp
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

// api com
import get_userInfo from "./features/get_userInfo";

function App() {
  const dispatch = useDispatch();
  const ref = useRef(null)
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
    }
    fetchAPI();
    ref.current = setInterval(fetchAPI, 3 * 60 * 1000)
    return () => {
      if (ref.current) {
        clearInterval(ref.current)
      }
    }
  }, [dispatch])

  return (
        <Router />
  );
}

export default App;
