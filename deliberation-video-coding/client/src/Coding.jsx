import { Video } from "./components/Video";
//import { usePlayer } from "@empirica/core/player/classic/react";
import React from "react";
import { EnterCodes } from "./components/EnterCodes";
import { ControlBar } from "./components/ControlBar";
import { Scheme } from "./components/Scheme";
//import scheme from "./components/scheme.json"
export function Coding() {
    //const player = usePlayer();
    const codes = [];

    const urls = [
        {
            video: "https://wattslab-video-test-public.s3.amazonaws.com/01GR9ED3G57XJBBA77068BNH90/1675354384929-1e60214d-05d1-401e-9bd9-d117f5bec0f0-cam-video-1675354390750", 
            audio: "https://wattslab-video-test-public.s3.amazonaws.com/01GR9ED3G57XJBBA77068BNH90/1675354384929-1e60214d-05d1-401e-9bd9-d117f5bec0f0-cam-audio-1675354390747", 
            audioOn: true, 
            id: 1
        }
    ]
    
    const scheme = [
        {
            category: "behavior",
            name: "smile",
            description: "This is the description.",
            id: "1"
        },
        {
            category: "behavior",
            name: "laugh",
            id: "2"
        },
        {
            category: "behavior",
            name: "eye contact",
            description: "This is the description.",
            id: "3"
        },
        {
            category: "emotion",
            name: "happy",
            description: "This is the description.",
            id: "4"
        },
        {
            category: "emotion",
            name: "sad",
            description: "This is the description.",
            id: "5"
        },
        {
            category: "emotion",
            name: "angry",
            description: "This is the description.",
            id: "6"
        },
        {
            category: "emotion",
            name: "confused",
            description: "This is the description.",
            id: "7"
        }
    ]
    
    
    const vidElements = []
    for (let i = 0; i < urls.length; i++) {
        const elt = urls[i];
        console.log("elt.video" + elt.video)
        vidElements.push(
            <Video 
                vidURL={elt.video}
                audioURL={elt.audio || ""}
                id={elt.id}
                audioOn={elt.audioOn}
            />
        )
    }
    const videos = document.getElementsByTagName("video");
    const audios = document.getElementsByTagName("audio");
    
    function startVideos() {
        console.log("starting videos and audios")
        for (let i = 0; i < videos.length; i++) {
            videos[i].play();
            if (i < audios.length) {
                audios[i].play()
            }
        }
    }

    function pauseVideos() {
        console.log("pausing videos and audios")
        for (let i = 0; i < videos.length; i++) {
            videos[i].pause();
            if (i < audios.length) {
                audios[i].pause()
            }
        }
        
    }

    function back10() {
        console.log("rewind")
        for (let i = 0; i < videos.length; i++) {
            videos[i].currentTime = videos[i].currentTime - 10
            if (i < audios.length) {
                audios[i].currentTime = audios[i].currentTime - 10
            }
        }
    }

    function forward10() {
        console.log("fast forward")
        for (let i = 0; i < videos.length; i++) {
            videos[i].currentTime = videos[i].currentTime + 10
            if (i < audios.length) {
                audios[i].currentTime = audios[i].currentTime + 10
            }
        }
    }

    function handleEntry() {
        pauseVideos()
    }

    function handleSubmit() {
        const time = videos[0].currentTime
        console.log("time " + videos[0].currentTime)
        console.log(document.getElementById("code-input").value);
        codes.push({
            time: time,
            code: document.getElementById("code-input").value
        })
        startVideos()
    }
    
    window.addEventListener("keydown", (e) => {
        if (e.defaultPrevented) {
            return;
        }
        let handled = false;
        if (e.key === " ") {
            videos[0].paused ? startVideos() : pauseVideos();
            handled = true;
        }
        if (e.key === "ArrowLeft") {
            back10();
        }
        if (e.key === "ArrowRight") {
            forward10();
        }

        if (handled) {
            e.preventDefault();
        }
    })
    

    return(
        <div className="coding">
            <div id="video">
                <div>
                    {vidElements}
                </div>
                <ControlBar play={startVideos} pause={pauseVideos} back={back10} forward={forward10} />
            </div>
            <EnterCodes handleSubmit={handleSubmit} scheme={scheme} handleEntry={handleEntry}/>
            <Scheme scheme={scheme} />
        </div>
    )
}