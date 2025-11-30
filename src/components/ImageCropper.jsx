import { useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ImageCropper({ onFileSelect }) {
  const [fileName, setFileName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file ? file.name : "");
    onFileSelect?.(file);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150px x 150px.");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="imageCrop">
        <div className="file-container">
          <span className="choosePic">Choose File</span>

          {/* name right next to the button */}
          <span className={`file-name ${fileName ? "has-file" : ""}`}>
            {fileName || "No file chosen"}
          </span>
        </div>

        <input type="file" accept="image/*" onChange={handleChange} className="modal-file" />
      </label>
      {error && <p className="imgErrorMsg">{error}</p>}
      {imgSrc && (
        <>
          <div className="imgDisplay">
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img src={imgSrc} alt="Upload" className="img-to-crop" onLoad={onImageLoad} />
            </ReactCrop>
          </div>
          <button
            className="crop-btn"
            onClick={() => {
              setCanvasPreview();
            }}
          >
            Crop Image
          </button>
        </>
      )}
    </>
  );
}
