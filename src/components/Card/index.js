import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({
  id,
  imgUrl,
  title,
  price,
  onClickFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {
  const [isAdd, setIsAdd] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const changeIsAdd = () => {
    onPlus({ id, imgUrl, title, price });
    setIsAdd(!isAdd);
  };

  const changeIsFavorite = () => {
    onClickFavorite({ id, imgUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <div className={styles.loader}>
          <ContentLoader
            speed={2}
            width={155}
            height={280}
            viewBox="0 0 155 280"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
            <rect x="0" y="170" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="200" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="250" rx="5" ry="5" width="80" height="25" />
            <rect x="118" y="243" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        </div>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              src={isFavorite ? "/img/Heart.svg" : "/img/aHeart.svg"}
              alt="Unliked"
              onClick={changeIsFavorite}
            />
          </div>
          <img width="100%" height={135} src={imgUrl} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={styles.plus}
              src={isAdd ? "/img/BtnPlus.svg" : "/img/aBtnPlus.svg"}
              alt="Plus"
              onClick={changeIsAdd}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
