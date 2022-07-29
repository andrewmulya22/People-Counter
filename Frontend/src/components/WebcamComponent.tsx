import Webcam from "react-webcam";

type Cam = {
  camRef: any;
};

const WebcamComponent: React.FC<Cam> = ({ camRef }) => {
  return (
    <Webcam
      ref={camRef}
      muted={true}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        width: 640,
        height: 480,
        zIndex: 9,
      }}
    />
  );
};
export default WebcamComponent;
