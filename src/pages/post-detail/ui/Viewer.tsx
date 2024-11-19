import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Viewer.css";

interface ViewerProps {
  value: string;
}

const Viewer = ({ value }: ViewerProps) => {
  return (
    <ReactQuill
      theme="snow"
      style={{ height: "auto" }}
      value={value}
      readOnly
      modules={{ toolbar: false }}
    />
  );
};

export default Viewer;
