import { useState, useEffect } from "react";

export default function Thumb({ file }) {
  const [loading, setLoading] = useState("false");
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    let reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  if (!file) {
    return null;
  }
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="m-1" style={{ width: "48%" }}>
      <img src={image} alt={file.name} className="img-thumbnail mt-2" />
    </div>
  );
}
