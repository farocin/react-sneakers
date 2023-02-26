import Card from "../components/Card/";

function Home({
  cartItems,
  searchValue,
  onChangeSearchInput,
  items,
  onAddFavoriteItems,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item) => (
      <Card
        key={item.imgUrl + item.price}
        title={item.name}
        price={item.price}
        imgUrl={item.imgUrl}
        onClickFavorite={onAddFavoriteItems}
        onPlus={(obj) => onAddToCart(obj)}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
      />
    ));
  };

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

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
