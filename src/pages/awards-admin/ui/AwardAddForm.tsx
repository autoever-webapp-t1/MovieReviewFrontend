import React, { useState } from "react";
import axios from "axios";
import styles from "./AwardsAdminPage.module.css";

interface AwardAddMovieDto {
  awardName: string;
  movieIds: (number | null)[];
}

const AwardAddForm: React.FC = () => {
  const [awardName, setAwardName] = useState<string>("");
  const [movieIds, setMovieIds] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const dto: AwardAddMovieDto = {
      awardName,
      movieIds,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:8080/api/admin/add",
        dto,
        {
          withCredentials: true, // 인증이 필요한 경우
        }
      );
      console.log("Award added successfully:", response.data);
    } catch (error) {
      console.error("Error adding award:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <label htmlFor="awardName">Award Name</label>
      <input
        type="text"
        id="awardName"
        value={awardName}
        onChange={(e) => setAwardName(e.target.value)}
        required
      />

      <div className={styles["form-group"]}>
        <label>Movie Nominations</label>
        {movieIds.map((movieId, index) => (
          <input
            key={index}
            type="number"
            value={movieId || ""}
            onChange={(e) =>
              setMovieIds((prev) =>
                prev.map((id, idx) =>
                  idx === index ? Number(e.target.value) : id
                )
              )
            }
            placeholder={`Movie ${index + 1}`}
          />
        ))}
      </div>

      <button
        className={styles.submitButton}
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Submitting..." : "Submit Award"}
      </button>
    </>
  );
};

export default AwardAddForm;
