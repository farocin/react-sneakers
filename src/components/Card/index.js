import styles from "./Card.module.scss";
import React from "react";

function Card({id, imgUrl, title, price, onClickFavorite, onPlus, favorited = false}) {
  const [isAdd, setIsAdd] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const changeIsAdd = () => {
    onPlus({imgUrl, title, price});
    setIsAdd(!isAdd);
  }

  const changeIsFavorite = () => {
    onClickFavorite({id, imgUrl, title, price});
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorite? "/img/Heart.svg" : "/img/aHeart.svg"}
          alt="Unliked"
          onClick={changeIsFavorite}
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
