import "./App.css";
import { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Thumb from "./Thumb";
import Dropzone from "./Dropzone";
import { context } from "./context";

function UploadForm() {
  const { state } = useContext(context);
  const saveImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `Image-${index + 1}.jpeg`;
    a.click();
    a.remove();
  };
  return (
    <div
      className="container p-5"
      style={{ border: "1px solid grey", minWidth: "370px", maxWidth: "550px" }}
    >
      <div className="row">
        <Formik
          initialValues={{ file: null }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            alert(
              JSON.stringify(
                {
                  fileName: values.file.name,
                  type: values.file.type,
                  size: `${values.file.size} bytes`,
                },
                null,
                2
              )
            );
          }}
          validationSchema={yup.object().shape({
            file: yup.mixed().required(),
          })}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="container text-center mb-5">
                  {values.file || state.files.length > 0 ? (
                    <h3>
                      <span
                        className="material-icons p-1"
                        style={{
                          background: "green",
                          borderRadius: "50%",
                          color: "white",
                          fontSize: "1.5rem",
                        }}
                      >
                        done
                      </span>
                      {"  "}
                      Image uploaded
                    </h3>
                  ) : (
                    <h3>Upload your image</h3>
                  )}
                </div>
                <div className="form-group">
                  <Dropzone />
                  {isSubmitting ? (
                    <h3 className="text-center">
                      Uploading...
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </h3>
                  ) : (
                    <h6 className="text-center">OR</h6>
                  )}
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                    disabled={state.files.length > 0 ? true : false}
                  />
                  {state.files.length > 0 ? (
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                      {state.files.map((file, index) => (
                        <Thumb key={file + index} file={file} />
                      ))}
                    </div>
                  ) : (
                    <Thumb file={values.file} />
                  )}
                </div>
                <div className="buttons mt-3 d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="text"
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="btn btn-danger"
                  >
                    Clear all
                  </button>
                  <button
                    type="text"
                    onClick={() => {
                      const images = document.querySelectorAll(
                        ".img-thumbnail"
                      );
                      images.forEach((img, i) => {
                        saveImage(img.src, i);
                      });
                    }}
                    className="btn btn-success"
                  >
                    Download
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default UploadForm;
