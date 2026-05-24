import React, { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");



    useEffect(() => {

        init({ faceLandmarkerRef, videoRef, streamRef });

        return () => {

            if (faceLandmarkerRef.current) {
                faceLandmarkerRef.current.close();
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

        };

    }, []);



    async function handleClick() {

        const expression = await detect({
            videoRef,
            faceLandmarkerRef,
            canvasRef,
            setExpression
        });
        console.log(expression);
            onClick(expression);
        
    }



    return (
        <div style={{ textAlign: "center" }}>

            <h2>Face Tracking</h2>

            <div style={{ position: "relative", display: "inline-block" }}>

                <video
                    ref={videoRef}
                    style={{ width: "600px", transform: "scaleX(-1)" }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "600px",
                        transform: "scaleX(-1)"
                    }}
                />

            </div>

            <h3>{expression}</h3>

            <button onClick={handleClick}>
                Detect Expression
            </button>

        </div>
    );
}