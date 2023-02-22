import styles from "./Card.module.scss";
import React from "react";

function Card({imgUrl, title, price, onClickFavorite, onPlus}) {
  const [isAdd, setIsAdd] = React.useState(false);

  const changeIsAdd = () => {
    onPlus({imgUrl, title, price});
    setIsAdd(!isAdd);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src="/img/aHeart.svg"
          alt="Unliked"
          onClick={onClickFavorite}
        />
      </div>
      <img width={133} height={112} src={imgUrl} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          src={isAdd? "/img/BtnPlus.svg" : "/img/aBtnPlus.svg"}
          alt="Plus"
          onClick={changeIsAdd}
        />
      </div>
    </div>
  );
}

export default Card;
