import React from "react";
import { Stack } from "@mui/material";
import top from "../public/top-page.jpg";
import Divider from "@mui/material/Divider";
import "@mui/material"; // Import MUI CSS
import Image from "next/image";

const Home = () => {
  return (
    <Stack
      direction="row" // Added direction to specify horizontal stacking
      divider={<Divider orientation="vertical" flexItem />}
      style={{ backgroundColor: "secondary" }} // Fixed typo in backgroundColor
      height="100vh"
    >
      <div style={{ height: "100vh", flex: 5 }}>
        {" "}
        {/* Adjusted flex value */}
        <Image
          src={top.src}
          alt="Top Page"
          style={{ maxHeight: "100%", width: "100%" }}
        />
      </div>
      <div style={{ height: "100vh", flex: 3 }}>
        {" "}
        <h1>Login Component Placeholder</h1>
      </div>
    </Stack>
  );
};

export default Home;
