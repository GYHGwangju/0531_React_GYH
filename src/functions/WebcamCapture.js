import React, { useRef, useEffect } from 'react';
import axios from "axios";
import uuid from 'react-uuid'
import {useNavigate} from "react-router-dom";

const WebcamCapture = () => {
    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();

    //should be fixed
    const navigateHandler = (generation) => {
        if(generation === "young") {
            navigate("/usingai");
        }
        else if(generation === "middle"){
            navigate("/usingai");
        }
        else {
            navigate("/usingai");
        }
    }

    useEffect(() => {
        const enableVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        enableVideoStream();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(track => {
                    track.stop();
                });
            }
        };

    }, []);

    const takeSnapshot= async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            //웹캡 스펙에 따라 달라질 수 있음.
            console.log(video.videoWidth); //640
            console.log(video.videoHeight); //480

            //width, height 확인하고 설정
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;

            context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

            canvas.toBlob(blob => {
                sendSnapShotToServer(blob);
            }, 'image/jpeg');
        }
    };

    const sendSnapShotToServer = (blob) => {
        const formData = new FormData();
        const fileName = `captured_face_${uuid()}.jpg`
        formData.append('image_file', blob, fileName);

        axios.post('http://localhost:8000/fast/api/face-recognition', formData)
            .then(response => {
                console.log(response.data);
                navigateHandler(response.data.generation);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });

    }



    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
            <button onClick={takeSnapshot}>매장</button>
            <button onClick={takeSnapshot}>포장</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default WebcamCapture;
