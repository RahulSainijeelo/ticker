// src/VideoPlayer.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@radix-ui/themes";
import { PlayIcon, PauseIcon, UpdateIcon } from "@radix-ui/react-icons";
import "./VideoPlayer.css";

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [userPaused, setUserPaused] = useState(false);
    const [videoFiles, setVideoFiles] = useState([]);

    // Fetch available videos
    async function fetchVideos() {
        try {
            const response = await fetch("/videos/videos.json");
            const files = await response.json();
            setVideoFiles(files);
            loadRandomVideo(files);
        } catch (error) {
            console.error("Error loading video files:", error);
        }
    }

    // Load a random video
    function loadRandomVideo(files = videoFiles) {
        if (files.length > 0) {
            const randomVideo = files[Math.floor(Math.random() * files.length)];
            const videoPath = `/videos/${randomVideo}`;
            if (videoRef.current) {
                videoRef.current.src = videoPath;
                setUserPaused(false); // Reset user pause state
                setIsPaused(false);   // Reset paused state
            }
        }
    }

    // Play/Pause functionality
    function togglePlayPause() {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPaused(false);
            setUserPaused(false); // User chose to play
        } else {
            videoRef.current.pause();
            setIsPaused(true);
            setUserPaused(true);  // User chose to pause
        }
    }

    // Create stable event handlers with useCallback
    const handleFocus = useCallback(() => {
        // Only auto-play if user didn't manually pause
        if (!userPaused && videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
            setIsPaused(false);
        }
    }, [userPaused]);

    const handleBlur = useCallback(() => {
        // Always pause on blur (but don't change userPaused state)
        if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPaused(true);
        }
    }, []);

    // Handle video events to sync state
    const handleVideoPlay = useCallback(() => {
        setIsPaused(false);
    }, []);

    const handleVideoPause = useCallback(() => {
        setIsPaused(true);
    }, []);

    // Initialize videos and event listeners
    useEffect(() => {
        fetchVideos();

        // Add window focus/blur listeners
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        // Add video event listeners to sync state
        const video = videoRef.current;
        if (video) {
            video.addEventListener('play', handleVideoPlay);
            video.addEventListener('pause', handleVideoPause);
        }

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            if (video) {
                video.removeEventListener('play', handleVideoPlay);
                video.removeEventListener('pause', handleVideoPause);
            }
        };
    }, []); // Remove userPaused from dependencies

    // Separate effect for handling focus/blur with current userPaused state
    useEffect(() => {
        const handleFocusWithState = () => {
            if (!userPaused && videoRef.current && videoRef.current.paused) {
                videoRef.current.play();
            }
        };

        // Update the event listener when userPaused changes
        window.removeEventListener('focus', handleFocus);
        window.addEventListener('focus', handleFocusWithState);

        return () => {
            window.removeEventListener('focus', handleFocusWithState);
        };
    }, [userPaused, handleFocus]);

    // Create portal for video controls
    const controlsPortal = createPortal(
        <div className="video-controls-card">
            <div className="controls-inner">
                <Button
                    variant="solid"
                    className={`control-button play-pause-button ${isPaused ? 'paused' : ''}`}
                    onClick={togglePlayPause}
                >
                    {isPaused ? (
                        <PlayIcon width="20" height="20" />
                    ) : (
                        <PauseIcon width="20" height="20" />
                    )}
                </Button>

                <Button
                    variant="solid"
                    className="control-button change-video-button"
                    onClick={() => loadRandomVideo()}
                >
                    <UpdateIcon width="18" height="18" />
                </Button>
            </div>
        </div>,
        document.body
    );

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                id="myVideo"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            >
                <source src="/videos/vid1.webm" type="video/webm" />
            </video>

            {controlsPortal}
        </>
    );
}
