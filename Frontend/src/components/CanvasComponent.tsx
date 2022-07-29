import { useRef } from "react";

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

type Canvas = {
  canvasSize: Array<number>;
  zindex: number;
  loc: Coordinate | undefined;
};

const CanvasComponent: React.FC<Canvas> = ({ canvasSize, zindex, loc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null;

  //set canvas size
  if (canvasRef.current) {
    canvasRef.current.width = canvasSize[0];
    canvasRef.current.height = canvasSize[1];
    ctx = canvasRef.current.getContext("2d");

    // iterate through object's length to display boxes
    if (loc && ctx) {
      for (let i = 0; i < loc?.length; i++) {
        ctx.beginPath();
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = "#" + randomColor;
        ctx.rect(
          loc.xmin[i],
          loc.ymin[i],
          loc.xmax[i] - loc.xmin[i],
          loc.ymax[i] - loc.ymin[i]
        );
        ctx.stroke();
      }
    }
  }

  // return drawn canvas
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        width: 640,
        height: 480,
        zIndex: zindex,
      }}
    />
  );
};

export default CanvasComponent;
