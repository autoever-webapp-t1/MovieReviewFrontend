import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

interface PostEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const PostEditor = forwardRef(({ value, onChange }: PostEditorProps, ref) => {
  const editorRef = useRef<ReactQuill | null>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => {
      return editorRef.current?.getEditor();
    },
  }));

  const handleUploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const editor = editorRef.current?.getEditor();
      if (!editor) return;
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("images", file);

      // 현재 커서 위치 저장
      const range = editor?.getSelection(true);

      console.log(file.name);

      try {
        const response = await axios.post(
          `http://api.gasanne.site:8080/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const url = response.data;

        editor?.insertEmbed(range.index, "image", url);
        editor?.setSelection(range.index + 1, 0);
      } catch (e) {
        alert("이미지 업로드 실패");
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const toolbar = editorRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleUploadImage);
    }
  }, []);

  return (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      value={value}
      onChange={onChange}
      style={{ height: "100%", width: "800px" }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
      ]}
      modules={{
        toolbar: {
          container: [
            ["link", "image", "video"],
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
          ],
        },
      }}
    />
  );
});

export default PostEditor;
