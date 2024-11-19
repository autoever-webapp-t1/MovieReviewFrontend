import MainButton from "@/widgets/main-button/ui/MainButton";
import PostEditor from "./PostEditor";
import styles from "./PostEditor.module.css";
import { createPost } from "@/entities/post/api/postApi";
import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

export default function PostEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const editorRef = useRef<ReactQuill>();

  const getThumbnail = useCallback(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const editorContent = editor.getContents().ops;

      const foundItem = editorContent?.find(
        (item) => typeof item.insert === "object" && "image" in item?.insert
      );

      if (!foundItem) return "";

      const url = foundItem.insert.image;

      return url.substring(url.indexOf("/image/"));
    }
  }, []);

  const handleClick = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.getEditor().getText();
      const thumbnail = getThumbnail();
      createPost(title, content, textContent, thumbnail)
        .then(() => {
          // 성공 시 /post-list로 네비게이트
          navigate("/post-list");
        })
        .catch((error) => {
          // 실패 시 알러트 창 표시
          console.error("Failed to create post:", error);
          alert("포스트 작성에 실패했습니다. 다시 시도해주세요.");
        });
    }
  }, [title, content]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <input
            type="text"
            placeholder="제목을 적어주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.editor}>
          <PostEditor
            value={content}
            onChange={(value) => setContent(value)}
            ref={editorRef}
          />
        </div>
        <div className={styles.buttonContainer}>
          <MainButton
            color="primary"
            onClick={() => {
              handleClick();
            }}
          >
            작성
          </MainButton>
        </div>
      </div>
    </div>
  );
}
