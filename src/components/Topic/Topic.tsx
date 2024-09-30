import styles from "./Topic.module.css";

import "../../types.d.ts"; // TopicType

export default function Topic({
  idx,
  topic,
  onClickFunc,
}: {
  idx: number;
  topic: TopicType;
  onClickFunc: (idx: number) => void;
}) {
  return (
    <div className={styles.topic} onClick={() => onClickFunc(idx)}>
      <div
        className={styles.imgWrap}
        style={{ backgroundColor: topic["background-color"] }}
      >
        <img
          src={topic.icon[0]}
          alt="no icon"
          style={{
            filter: topic.isIconBlack
              ? "brightness(0) saturate(100%) invert(100%) sepia(55%) saturate(168%) hue-rotate(239deg) brightness(112%) contrast(100%)"
              : "none", // 기본값
          }}
        />
        {/* <img src={topic.icon} alt="no icon" /> */}
      </div>
      <h3>{topic.title}</h3>
      <p>{topic.discription}</p>
    </div>
  );
}
