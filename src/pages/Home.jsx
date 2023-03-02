import React from "react";

import Card from "../components/Card/";
import Skeleton from "../components/Skeleton";

function Home({
  searchValue,
  onChangeSearchInput,
  items,
  onAddFavoriteItems,
  onAddToCart,
  isLoading,
}) {

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue
            ? `Поиск по запросу : "${searchValue}"`
            : "Все кроссовки:"}
        </h1>
        <div className="search-block d-flex align-center">
          <img width={14} height={14} src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex flex-wrap">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} style={{ margin: "0 30px 30px 0" }} />
            ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card

                key={item.id}
                {...item}
                onClickFavorite={onAddFavoriteItems}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;