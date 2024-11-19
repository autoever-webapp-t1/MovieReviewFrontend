import MovieCard, { MovieCardDto } from "@/entities/movie";
import ContentSegment from "./ContentSegment";
import styles from "./RelatedContent.module.css";
import { useNavigate } from "react-router-dom";

interface RelatedContentProps {
  relatedMovies: MovieCardDto[] | undefined;
}

export default function RelatedContent({ relatedMovies }: RelatedContentProps) {
  const navigate = useNavigate();

  return (
    <div>
      <ContentSegment label="비슷한 콘텐츠">
        {relatedMovies ? (
          <div className={styles.container}>
            {relatedMovies.map((movie, i) => (
              <MovieCard
                key={i}
                movieCard={movie}
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                }}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </ContentSegment>
    </div>
  );
}
