import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../styles/reset.css";
import styles from "./Header.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTv } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const location = useLocation(); // 현재경로

  const [isSearch, setIsSearch] = useState(false);
  const [isB2Topics, setIsB2Topics] = useState(false);

  useEffect(() => {
    const isSearchActive = location.pathname === "/topics";
    const isB2TActive =
      location.pathname === "/quiz" || location.pathname === "/result";

    console.log("curr location: ", location.pathname);

    setIsSearch(isSearchActive);
    setIsB2Topics(isB2TActive);
  }, [location]);

  // console.log(isSearch, isB2Topics);

  return (
    <header>
      <div className={`${styles.header} mw`}>
        <Link to="/" id={styles.logoWrap}>
          <FontAwesomeIcon icon={faTv} className={styles.logo} />
          <i style={{ fontStyle: "italic" }}>CSQuizHub</i>
        </Link>

        <nav>
          <div
            className={`${styles.searchBar} ${isSearch ? "" : styles.hidden}`}
          >
            <input type="text" placeholder="search topic" />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <Link
            to="/topics"
            className={`${styles.b2tBtn} ${isB2Topics ? "" : styles.hidden}`}
          >
            <button>Back to Topics</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
