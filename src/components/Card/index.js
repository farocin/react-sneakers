import React from "react";

import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  imgUrl,
  name,
  price,
  onClickFavorite,
  onPlus,
  favorited = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, imgUrl, name, price };

  const changeIsAdd = () => {
    onPlus(obj);
  };

  const changeIsFavorite = () => {
    onClickFavorite(obj);
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className={styles.card}>
      <>
        {onClickFavorite && (
          <div className={styles.favorite}>
            <img
              src={isFavorite ? "/img/Heart.svg" : "/img/aHeart.svg"}
              alt="Unliked"
              onClick={changeIsFavorite}
            />
          </div>
        )}
        <img width="100%" height={135} src={imgUrl} alt="" />
        <h5>{name}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          {onPlus && (
            <img
              className={styles.plus}
              src={isItemAdded(id) ? "/img/BtnPlus.svg" : "/img/aBtnPlus.svg"}
              alt="Plus"
              onClick={changeIsAdd}
            />
          )}
        </div>
      </>
    </div>
  );
}

export default Card;
