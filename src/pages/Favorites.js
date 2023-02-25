import Card from "../components/Card";

function Favorites({items, onAddFavoriteItems})
 {
  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            Мои закладки
          </h1>
        </div>

        <div className="d-flex flex-wrap">
          {items
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