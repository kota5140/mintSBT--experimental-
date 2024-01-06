import React from "react";
import { Login } from "./login";
import Verification from "./Verification";
import Header from "./Header";

// Define the Home component
const Home = () => {
  return (
    <>
      <Header />
      <Login />
    </>
  );
};
//<Verification />
// Export the Home component
export default Home;
