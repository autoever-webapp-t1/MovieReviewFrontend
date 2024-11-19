import ProfileImage from "@/widgets/profile-image";
import styles from "./SideBox.module.css";
import { useCallback, useState } from "react";
import EditImg from "@assets/edit.svg";
import SaveImg from "@assets/save_2.svg";
import { updateNickname } from "@/entities/user";
import MenuItem from "./MenuItem";

interface SideBoxProps {
  selectedContent: string;
  onMenuItemSelect: (newContent: string) => void;
}

export default function SideBox({
  selectedContent,
  onMenuItemSelect,
}: SideBoxProps) {
  console.log(selectedContent);
  const userId = sessionStorage.getItem("userId")!;
  const profileImg = sessionStorage.getItem("userProfile")!;
  const nickname = sessionStorage.getItem("userNickname")!;
  const email = sessionStorage.getItem("userEmail")!;

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [isNicknameEditMode, setNicknameEditMode] = useState(false);

  const handleNicknameSaveClick = useCallback(async () => {
    await updateNickname(nicknameValue);

    sessionStorage.setItem("userNickname", nicknameValue);
    setNicknameEditMode(false);
  }, [userId, nicknameValue]);

  return (
    <div className={styles.container}>
      <div className={styles["profile-box"]}>
        <div className={styles["profile-img-wrapper"]}>
          <ProfileImage src={profileImg} alt="ProfileImg" size={150} />
        </div>
        {isNicknameEditMode ? (
          <div className={styles["input-box"]}>
            <input
              className={`${styles["nickname-input"]} text-bold text-lg`}
              value={nicknameValue}
              onChange={(e) => setNicknameValue(e.target.value)}
            ></input>
            <button
              className={styles["icon-button"]}
              onClick={handleNicknameSaveClick}
            >
              <img src={SaveImg} alt="SaveImg" />
            </button>
          </div>
        ) : (
          <div className={`${styles.nickname} text-bold text-lg`}>
            {nickname}
            <button
              className={styles["icon-button"]}
              onClick={() => {
                setNicknameEditMode(true);
              }}
            >
              <img src={EditImg} alt="EditImg" />
            </button>
          </div>
        )}
        <div className={`${styles.email} text-regular text-md`}>{email}</div>
      </div>
      <div className={styles["menu-box"]}>
        <MenuItem
          onClick={() => onMenuItemSelect("통계")}
          selected={selectedContent === "통계"}
        >
          통계
        </MenuItem>
        {/* <MenuItem
          onClick={() => onMenuItemSelect("나의 평점")}
          selected={selectedContent === "나의 평점"}
        >
          나의 평점
        </MenuItem> */}
        <MenuItem
          onClick={() => onMenuItemSelect("나의 리뷰")}
          selected={selectedContent === "나의 리뷰"}
        >
          나의 리뷰
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemSelect("나의 포스트")}
          selected={selectedContent === "나의 포스트"}
        >
          나의 포스트
        </MenuItem>
        <MenuItem onClick={() => {}} warning>
          로그아웃
        </MenuItem>
      </div>
    </div>
  );
}
