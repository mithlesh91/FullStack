import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ faceLandmarkerRef, videoRef, streamRef }) => {

    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },
            outputFaceBlendshapes: true,
            outputFaceLandmarks: true,
            runningMode: "VIDEO",
            numFaces: 1,
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });

    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};



export const detect = async ({ videoRef, faceLandmarkerRef, canvasRef, setExpression }) => {

    if (!videoRef.current || !faceLandmarkerRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const results = faceLandmarkerRef.current.detectForVideo(
        videoRef.current,
        Date.now()
    );

    let detectedExpression = "neutral";

    if (results.faceLandmarks.length > 0) {

        const landmarks = results.faceLandmarks[0];

        ctx.fillStyle = "lime";

        landmarks.forEach(point => {
            ctx.beginPath();
            ctx.arc(
                point.x * canvas.width,
                point.y * canvas.height,
                1.5,
                0,
                2 * Math.PI
            );
            ctx.fill();
        });

        const expressions = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            expressions.find(e => e.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browInnerUp = getScore("browInnerUp");
        const mouthFrownLeft = getScore("mouthFrownLeft");
        const mouthFrownRight = getScore("mouthFrownRight");


        if (smileLeft > 0.6 && smileRight > 0.2) {
            detectedExpression = "happy";
        }
        else if (jawOpen > 0.3 && browInnerUp > 0.3) {
            detectedExpression = "surprise";
        }
        else if (mouthFrownLeft > 0.0001 && mouthFrownRight > 0.0001) {
            detectedExpression = "sad";
        }
        else {
            detectedExpression = "neutral";
        }

        setExpression(detectedExpression);
        return detectedExpression;
    }

    // return detectedExpression;
};