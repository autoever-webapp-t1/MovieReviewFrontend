import { fetchPosts, fetchSearchResults } from "@/entities/post/api/postApi";
import { PostDetailDto } from "@/entities/post/model/types";
import { PageResponseDto } from "@/shared/model/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./PostListPage.module.css";
import MainButton from "@/widgets/main-button/ui/MainButton";
import PostCard from "@/widgets/post-card";
import ReactPaginate from "react-paginate";

export default function PostListPage() {
  const [posts, setPosts] = useState<PageResponseDto<PostDetailDto>>(); // 데이터 상태
  const [title, setTitle] = useState<string>(""); // 검색어 상태
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const pageSize = 10; // 한 페이지 크기

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 파라미터 관리

  // URL에서 현재 페이지 번호 가져오기 (기본값 1-based index)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // 데이터 로드 함수
  const loadPosts = async (page: number) => {
    let data;
    if (title.trim()) {
      // 검색어가 있으면 검색 API 호출 (1-based index 그대로 전달)
      data = await fetchSearchResults(title, page, pageSize);
    } else {
      // 검색어가 없으면 기본 조회 (1-based index 그대로 전달)
      data = await fetchPosts(page, pageSize);
    }
    setPosts(data);
    setTotalPages(data.totalPage);
  };

  // 페이지 변경 시 데이터 로드 및 URL 업데이트
  const handlePageClick = async (event: { selected: number }) => {
    const newPage = event.selected + 1; // 0-based index를 1-based로 변환
    setSearchParams({ page: newPage.toString() }); // URL에 페이지 번호 반영
    await loadPosts(newPage);
  };

  // 검색 시 처리
  const handleSearch = async () => {
    setSearchParams({ page: "1" }); // 검색 시 항상 첫 페이지로 초기화
    await loadPosts(1);
  };

  // 컴포넌트 로드 시 URL에 따른 데이터 로드
  useEffect(() => {
    loadPosts(currentPage); // 1-based index 그대로 전달
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
            forcePage={currentPage - 1} // ReactPaginate는 0-based index를 사용하므로 -1
          />
        </div>
      </div>
    </div>
  );
}
