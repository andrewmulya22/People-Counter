import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import WebcamComponent from "./components/WebcamComponent";
import CanvasComponent from "./components/CanvasComponent";
import Webcam from "react-webcam";
import axios from "axios";

interface Coordinate {
  xmax: {
    [key: number]: number;
  };
  xmin: {
    [key: number]: number;
  };
  ymax: {
    [key: number]: number;
  };
  ymin: {
    [key: number]: number;
  };
  length: number;
}

function App() {
  const webcamRef = useRef<Webcam>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const [countedPeople, setCountedPeople] = useState<number>(0);
  const [coordinate, setCoordinate] = useState<Coordinate>();
  const intervalTime = 500;
  let videoSize: Array<number> = [];
  if (webcamRef.current) {
    const video = webcamRef.current.video;
    videoSize = [video!["videoWidth"], video!["videoHeight"]];
  }

  const callAPI = () => {
    if (webcamRef.current && webcamRef.current.getScreenshot()) {
      var formData = new FormData();
      formData.append("img", webcamRef.current.getScreenshot()!);

      axios({
        method: "post",
        url: "http://localhost:8000/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          const detectedPeople = Object.keys(response.data.class).length;
          setCountedPeople(detectedPeople);
          setCoordinate({
            xmax: response.data.xmax,
            xmin: response.data.xmin,
            ymax: response.data.ymax,
            ymin: response.data.ymin,
            length: detectedPeople,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      callAPI();
    }, intervalTime);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header className="App-header">
        <WebcamComponent camRef={webcamRef} />
        <CanvasComponent canvasSize={videoSize} zindex={10} loc={coordinate} />
      </header>
      <h3 style={{ position: "relative", color: "black" }}>{countedPeople}</h3>
    </div>
  );
}

export default App;
