import MainButton from "@/widgets/main-button/ui/MainButton";
import PostEditor from "./PostEditor";
import styles from "./PostEditor.module.css";
import {
  createPost,
  fetchPostDetail,
  updatePost,
} from "@/entities/post/api/postApi";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

export default function PostEditPage() {
  const { postId } = useParams();
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

  const handleSubmit = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.getEditor().getText();
      const thumbnail = getThumbnail();

      if (postId) {
        // 수정 로직
        updatePost(Number(postId), title, content, textContent, thumbnail)
          .then(() => {
            navigate(`/post/${postId}`); // 수정 후 해당 포스트로 이동
          })
          .catch((error) => {
            console.error("Failed to update post:", error);
            alert("포스트 수정에 실패했습니다. 다시 시도해주세요.");
          });
      } else {
        // 작성 로직
        createPost(title, content, textContent, thumbnail)
          .then(() => {
            navigate("/post-list"); // 작성 성공 시 포스트 리스트로 이동
          })
          .catch((error) => {
            console.error("Failed to create post:", error);
            alert("포스트 작성에 실패했습니다. 다시 시도해주세요.");
          });
      }
    }
  }, [postId, title, content]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        const data = await fetchPostDetail(Number(postId));
        setTitle(data.title);
        setContent(data.content);
      }
    };
    fetchPostData();
  }, [postId]);

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
          <MainButton color="primary" onClick={handleSubmit}>
            {postId ? "수정" : "작성"}
          </MainButton>
        </div>
      </div>
    </div>
  );
}
