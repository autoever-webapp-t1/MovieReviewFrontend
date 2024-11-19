import PostCard from "@/widgets/post-card";
import styles from "./PostListPage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { fetchPosts, fetchSearchResults } from "@/entities/post/api/postApi";
import { PostDetailDto } from "@/entities/post/model/types";
import { PageResponseDto } from "@/shared/model/types";
import { useNavigate } from "react-router-dom";
import MainButton from "@/widgets/main-button/ui/MainButton";
import ReactPaginate from "react-paginate";

export default function PostListPage() {
  const [posts, setPosts] = useState<PageResponseDto<PostDetailDto>>(); // 데이터 상태
  const [title, setTitle] = useState<string>(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const pageSize = 10; // 한 페이지 크기
  const navigate = useNavigate();

  // 데이터 로드 함수
  const loadPosts = async (page: number) => {
    let data;
    if (title.trim()) {
      // 검색어가 있으면 검색 API 호출
      data = await fetchSearchResults(title, page + 1, pageSize);
    } else {
      // 검색어가 없으면 기본 조회
      data = await fetchPosts(page + 1, pageSize);
    }
    setPosts(data);
    setTotalPages(data.totalPage);
  };

  // 페이지 변경 시 데이터 로드
  const handlePageClick = async (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  // 검색 시 처리
  const handleSearch = async () => {
    setCurrentPage(0); // 검색 시 항상 첫 페이지로 초기화
    await loadPosts(0);
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* 검색 바 */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="제목으로 검색"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SearchIcon
            sx={{
              color: "var(--color-gray-400)",
              fontSize: "32px",
              cursor: "pointer",
            }}
            onClick={handleSearch}
          />
        </div>

        {/* 글쓰기 버튼 */}
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

      {/* 포스트 리스트 */}
      <div className={styles.postList}>
        <ul>
          {posts?.dtoList.map((post, i) => (
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
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <ReactPaginate
            pageCount={totalPages} // 전체 페이지 수
            pageRangeDisplayed={5} // 한번에 표시할 페이지 버튼 수
            marginPagesDisplayed={1} // 시작과 끝에 표시할 페이지 버튼 수
            onPageChange={handlePageClick} // 페이지 변경 이벤트 핸들러
            containerClassName={styles.paginationContainer} // CSS 클래스명
            activeClassName={styles.activePage} // 활성화된 버튼 클래스명
            nextLabel="Next" // 다음 버튼 레이블
            previousLabel="Previous" // 이전 버튼 레이블
          />
        </div>
      </div>
    </div>
  );
}
