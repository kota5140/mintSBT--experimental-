import React from "react";
import top from "../public/top-page.jpg";
import "@mui/material"; // Import MUI CSS
import Image from "next/image";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={top.src}
        alt="Top Page"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
};

export default Home;
