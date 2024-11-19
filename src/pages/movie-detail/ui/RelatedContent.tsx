import MovieCard, { MovieCardDto } from "@/entities/movie";
import ContentSegment from "./ContentSegment";
import styles from "./RelatedContent.module.css";

interface RelatedContentProps {
  relatedMovies: MovieCardDto[] | undefined;
}

export default function RelatedContent({ relatedMovies }: RelatedContentProps) {
  return (
    <div>
      <ContentSegment label="비슷한 콘텐츠">
        {relatedMovies ? (
          <div className={styles.container}>
            {relatedMovies.map((movie, i) => (
              <MovieCard key={i} movieCard={movie} onClick={() => {}} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </ContentSegment>
    </div>
  );
}
