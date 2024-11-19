import PostCard from "@/widgets/post-card";
import styles from "./PostListPage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/entities/post/api/postApi";
import { PostDetailDto } from "@/entities/post/model/types";
import { PageResponseDto } from "@/shared/model/types";
import { useNavigate } from "react-router-dom";
import MainButton from "@/widgets/main-button/ui/MainButton";

export default function PostListPage() {
  const [posts, setPosts] = useState<PageResponseDto<PostDetailDto>>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      console.log(data);
    };
    loadPosts();
    console.log(posts);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="제목으로 검색" />
          <SearchIcon
            sx={{ color: "var(--color-gray-400)", fontSize: "32px" }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <MainButton
            color="primary"
            onClick={() => {
              navigate("/post-edit");
            }}
            fontSize="md"
          >
            글 쓰기
          </MainButton>
        </div>
      </div>
      <div className={styles.postList}>
        <ul>
          {posts?.dtoList.map((post, i) => {
            return (
              <PostCard
                key={i}
                title={post.title}
                preview={post.textContent}
                author={post.nickname}
                authorProfileImage={post.profileImage}
                likeCount={post.likesCount}
                thumbnail={post.mainImgUrl || ""}
                createdAt={post.createdDate}
                onClick={() => {
                  navigate(`/post/${post.postId}`);
                }}
              />
            );
          })}

          {/* <PostCard
            title="타노스의 계획은 극단적이지만 일리가 있는가?"
            preview="타노스는 우주의 자원 부족 문제를 해결하고자, 무작위로 우주 생명체의 절반을 없애는 극단적인 방안을 제시한다. 그의 주장은, 인구가 지나치게 증가하면 자원이 고갈되고 결국 모든 생명체가 멸망할 수밖에 없다는 것이다. 하지만 이러한 논리는 어처구니가 없다"
            author="재키러브"
            authorProfileImage="../../../src/assets/jackeylove.jpg"
            likeCount={23}
            thumbnail="https://pds.joongang.co.kr//news/component/htmlphoto_mmdata/201805/19/5c5d6ec8-7fc7-4b5a-8897-a1ec06ae41f2.jpg"
            createdAt="2024-11-05 08:15:00"
          /> */}
        </ul>
      </div>
    </div>
  );
}
