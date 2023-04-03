import Link from "next/link";
import styles from "./componentMain.module.css";

function MainPage() {
  return (
    <>
      <div className={styles.mainPage}>
        <Link href="/events" id="link">
          go to events
        </Link>
      </div>
    </>
  );
}

export default MainPage;
