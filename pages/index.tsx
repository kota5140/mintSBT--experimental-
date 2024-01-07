import React from "react";
import { Stack } from "@mui/material";
import top from "../public/top-page.jpg";
import Divider from "@mui/material/Divider";
import "@mui/material"; // Import MUI CSS
import Image from "next/image";

const Home = () => {
  return (
    <div style={{ height: "100vh", flex: 5 }}>
      {" "}
      <Image
        fill={true}
        src={top.src}
        alt="Top Page"
        style={{ maxHeight: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Home;
