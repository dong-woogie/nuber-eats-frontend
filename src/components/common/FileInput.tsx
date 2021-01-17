import React, { ChangeEvent, useRef } from "react";
import CameraImage from "../../images/camera.svg";

interface IFileInputProps {
  uploadImg: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function FileInput({ uploadImg, onChange }: IFileInputProps) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const onClickFileInput = () => {
    if (uploadInputRef.current === null) return;
    uploadInputRef.current.click();
  };
  return (
    <div className="relative flex">
      <div
        className="relative w-24 h-24 bg-cover bg-center bg-no-repeat border border-gray-300 cursor-pointer mb-10"
        style={{
          backgroundImage: `url(${CameraImage})`,
          backgroundSize: "32px",
        }}
        onClick={onClickFileInput}
      >
        <input
          ref={uploadInputRef}
          placeholder="photo"
          type="file"
          name="file"
          multiple
          className="top-0 left-0 abolute w-full h-full cursor-pointer hidden"
          onChange={onChange}
          accept="image/*"
        />
      </div>
      {uploadImg && (
        <div
          className="absolute w-24 h-24 bg-cover bg-center bg-no-repeat left-32 z-10"
          style={{ backgroundImage: `url(${uploadImg})` }}
        ></div>
      )}
    </div>
  );
}

export default FileInput;
