import Card from "./components/Card/";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSeacthValue] = React.useState("");
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://63f5d0c259c944921f6706e5.mockapi.io/items").then((res) => {
        setItems(res.data);
      });
      axios
      .get("https://63f5d0c259c944921f6706e5.mockapi.io/cart").then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://63f5d0c259c944921f6706e5.mockapi.io/cart", obj); 
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveitem = (id) => {
    axios.delete(`https://63f5d0c259c944921f6706e5.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSeacthValue(event.target.value);
  };
  //console.log(cartItems);

  return (
    <div className="wrapper clear">
      {cartOpen && (
        <Drawer items={cartItems} onClose={() => setCartOpen(false)} onRemove={onRemoveitem} />
      )}
      <Header onClickCart={() => setCartOpen(true)} />
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

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.imgUrl + item.price}
                title={item.name}
                price={item.price}
                imgUrl={item.imgUrl}
                onClickFavorite={() => console.log("favorite")}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
