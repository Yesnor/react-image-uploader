import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { context } from "./context";

export default function MyDropzone() {
  const { dispatch } = useContext(context);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;

        fetch(binaryStr).then((res) => {
          res.arrayBuffer().then((buf) => {
            const _file = new File([buf], "image_data_url.jpg", {
              type: "image/jpeg",
            });
            dispatch({
              type: "add_files",
              payload: _file,
            });
          });
        });
      };
      // reader.readAsArrayBuffer(file);
      reader.readAsDataURL(file);
    });
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="container mb-3"
      style={{ border: "1px dashed grey", height: "150px" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="text-center align-middle">
        Drag 'n' drop some files here, or click to select files
      </p>
    </div>
  );
}
