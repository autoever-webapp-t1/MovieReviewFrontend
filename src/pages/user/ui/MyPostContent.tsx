import styles from "./MyPostContent.module.css";

export default function MyPostContent() {
  // const { data } = useMyPost();

  // const posts = useMemo(() => {
  //   if (data) {
  //     return data.pages.flatMap((page) => page.dtoList);
  //   } else return [];
  // }, [data]);

  return <div className={styles.container}></div>;
}
