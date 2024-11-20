import MainButton from "@/widgets/main-button/ui/MainButton";
import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styles from "./PostDetailPage.module.css";
import CommentBox from "./CommentBox";
import { useNavigate, useParams } from "react-router-dom";
import { CommentDto, PostDetailDto } from "@/entities/post/model/types";
import {
  createComment,
  deleteComment,
  deletePost,
  fetchComments,
  fetchPostDetail,
  toggleLike,
  updateComment,
} from "@/entities/post/api/postApi";
import Viewer from "./Viewer";

// const post: PostDetailDto = {
//   postId: 123,
//   memberId: 1232312,
//   title:
//     "효율적인 시간 관리 방법, 이렇게 해보세요 효율적인 시간 관리 방법,  이렇게 해보세요",
//   content: "아아아아아아아아아아아 좀 되라",
//   profileImage: "../../../src/assets/jackeylove.jpg",
//   nickname: "재키러브",
//   likesCount: 26,
//   isLiked: true,
//   createdDate: "2024-11-05 08:15:00",
//   updatedDate: "2024-11-05 08:15:00",
// };

export default function PostDetailPage() {
  const userId = sessionStorage.getItem("userId") ?? "";

  const { postId } = useParams();
  const [post, setPost] = useState<PostDetailDto>();
  const [comments, setComments] = useState<CommentDto[]>();
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();

  const postIdNumber = Number(postId);

  const loadPostDetail = async () => {
    const data = await fetchPostDetail(postIdNumber);
    setPost(data);
  };
  const loadComments = async () => {
    const data = await fetchComments(postIdNumber);
    setComments(data);
  };
  const handleEditComment = async (commentId: number, content: string) => {
    updateComment(commentId, content)
      .then(() => {
        loadComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemoveComment = async (commentId: number) => {
    const sureToDelete = confirm("댓글을 정말 삭제하시겠습니까?");
    if (sureToDelete) {
      deleteComment(commentId)
        .then(() => {
          alert("댓글이 삭제되었습니다");
          loadComments();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleAddComments = async () => {
    if (commentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    createComment(postIdNumber, commentContent)
      .then(() => {
        alert("댓글이 등록되었습니다.");
        setCommentContent(""); // textarea 초기화
        loadComments();
      })
      .catch((error) => {
        console.error(error);
        alert("댓글 등록에 실패했습니다.");
      });
  };

  useEffect(() => {
    loadPostDetail();
    loadComments();
  }, [postIdNumber]);

  const handleLikeToggle = () => {
    if (post) {
      const updatedPost = {
        ...post,
        liked: !post.liked,
        likesCount: post.liked ? post.likesCount - 1 : post.likesCount + 1,
      };
      setPost(updatedPost);
      toggleLike(postIdNumber, updatedPost.liked);
    }
  };

  const handleDelete = () => {
    const sureToDelete = confirm("게시글을 정말 삭제하시겠습니까?");
    if (sureToDelete) {
      deletePost(postIdNumber)
        .then(() => {
          alert("삭제되었습니다");
          navigate("/post-list");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className={styles["vertical-center-alignment"]}>
      {post ? (
        <>
          {" "}
          <div className={`${styles.container} ${styles["post-header"]}`}>
            <div className={`${styles.title}`}>
              <span className="header-h2">{post.title}</span>
              <PostMeta
                authorProfileImage={post.profileImage}
                author={post.nickname}
                createdAt={post.createdDate}
                likeCount={post.likesCount}
              />
            </div>
            <div className={styles.actions}>
              {Number(userId) === post.memberId ? (
                <>
                  <MainButton
                    color="primary"
                    onClick={() => {
                      navigate(`/post-edit/${postId}`);
                    }}
                    disabled={false}
                  >
                    수정
                  </MainButton>
                  <MainButton
                    color="primary"
                    onClick={() => {
                      handleDelete();
                    }}
                    disabled={false}
                  >
                    삭제
                  </MainButton>
                </>
              ) : (
                <div className={styles.button}>
                  {/* {post.liked ? (
                    <Favorite
                      sx={{ color: "var(--color-sub-light)", fontSize: 36 }}
                      onClick={handleLikeToggle}
                    />
                  ) : (
                    <FavoriteBorder
                      sx={{ color: "var(--color-sub-light)", fontSize: 36 }}
                      onClick={handleLikeToggle}
                    />
                  )} */}
                </div>
              )}
            </div>
          </div>
          <div className={styles["divide-line"]} />
          <div className={`${styles["post-body"]} ${styles.container}`}>
            <div className={styles["body-content"]}>
              <Viewer value={post.content}></Viewer>
            </div>
          </div>
          <div className={`${styles["comment-container"]} ${styles.container}`}>
            {comments ? (
              <>
                <div className={styles["comment-header"]}>
                  댓글{" "}
                  <span className={styles["comment-count"]}>
                    {comments.length}
                  </span>
                </div>
                <div>
                  <ul>
                    {comments.map((comment, i) => (
                      <CommentBox
                        key={i}
                        commentId={comment.commentId}
                        postId={comment.postId}
                        memberId={comment.memberId}
                        content={comment.content}
                        author={comment.nickname}
                        createdAt={comment.createdAt}
                        updatedAt={comment.updatedAt}
                        authorProfileImage={comment.profile}
                        handleRemoveComment={handleRemoveComment}
                        handleEditComment={handleEditComment}
                      />
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={styles.inputWrapper}>
              <textarea
                className={styles.input}
                maxLength={500}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <div className={styles.add}>
                <MainButton
                  color="sub"
                  onClick={() => {
                    handleAddComments();
                  }}
                  fontSize="xs"
                >
                  등록
                </MainButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
