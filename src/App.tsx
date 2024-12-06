import React, { useEffect, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import TextField from "./component/TextField";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [dear, setDear] = useState("");
  const [message, setMessage] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [from, setFrom] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
    }
  };

  useEffect(() => {
    setLine1(message.substring(0, 27));
    setLine2(message.substring(27, 54));
  }, [message, setLine1, setLine2]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop,
    maxFiles: 1,
  });

  const handleDownload = () => {
    const content = document.getElementById("image-container");
    if (content) {
      html2canvas(content).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, "gift-card.png");
          }
        });
      });
    }
  };

  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            height: "100%",
          }}
        >
          <div
            style={{
              padding: "30px",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Gift Card
          </div>
          <div className="divider" />
          {image && (
            <div style={{ textAlign: "center", paddingTop: "40px" }}>
              <div
                id="image-container"
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
                <p style={{ position: "absolute", top: "25%", left: "45%" }}>
                  {dear}
                </p>
                <p style={{ position: "absolute", top: "34%", left: "28%" }}>
                  {line1}
                </p>
                <p style={{ position: "absolute", top: "42%", left: "28%" }}>
                  {line2}
                </p>
                <p style={{ position: "absolute", top: "50%", left: "41%" }}>
                  {from}
                </p>
              </div>
            </div>
          )}
          <div className="subtitle">File Upload</div>
          <div {...getRootProps()} className="image-input">
            <input {...getInputProps()} />
            <FaCloudUploadAlt
              style={{ color: "#B4B9C8", height: "40px", width: "40px" }}
            />
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Browse files
            </p>
            <p>Drag & drop files here</p>
          </div>
          <TextField
            title={"Dear"}
            value={dear}
            setValue={setDear}
            length={16}
          />
          <TextField
            title={"Message"}
            value={message}
            setValue={setMessage}
            length={54}
          />
          <TextField
            title={"From"}
            value={from}
            setValue={setFrom}
            length={20}
          />

          {image && (
            <>
              <div
                className="divider"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              />
              <button className="download-btn" onClick={handleDownload}>
                Download
              </button>
            </>
          )}

          <div style={{ paddingTop: "50px" }} />
        </div>
      </div>
    </div>
  );
}

export default App;
