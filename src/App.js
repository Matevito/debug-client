import { Router } from "./Router"

import { Container } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

const appTitle = "Tackle Issue"
function App() {
  return (
    <Container maxWidth="lg">
      <Header title={appTitle}/>
      <Router />
      <Footer />
    </Container>
  );
}

export default App;
