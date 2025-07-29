// src/video-main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import VideoPlayer from "./VideoPlayer.jsx";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("video-root")).render(
    <Theme appearance="dark" accentColor="violet">
        <VideoPlayer />
    </Theme>
);
