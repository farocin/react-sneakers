import React from "react";
import Card from "../components/Card";
import AppContext from "../context";


function Favorites({onAddFavoriteItems})
 {
  const {favoriteItems} = React.useContext(AppContext);
  console.log(favoriteItems)
  
  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            Мои закладки
          </h1>
        </div>

        <div className="d-flex flex-wrap">
          {favoriteItems
            .map((item) => (
              <Card
                key={item.imgUrl + item.price}
                favorited={true}
                onClickFavorite={onAddFavoriteItems}
                {...item}
              />
            ))}
        </div>
      </div>
  );
}

export default Favorites;