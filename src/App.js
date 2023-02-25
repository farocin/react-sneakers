import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Const from "./Const.js";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSeacthValue] = React.useState("");
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    axios.get(Const.ITEMS).then((res) => {
      setItems(res.data);
    });
    axios.get(Const.CART).then((res) => {
      setCartItems(res.data);
    });
    axios.get(Const.FAVORITES).then((res) => {
      setFavoriteItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post(Const.CART, obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveitem = (id) => {
    axios.delete(Const.CART + "/" + id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddFavoriteItems = async (obj) => {
   try {
    if (favoriteItems.find((favObj) => favObj.id === obj.id)) {
      axios.delete(Const.FAVORITES + "/" + obj.id);
    } else {
      const { data } = await axios.post(Const.FAVORITES, obj);
      setFavoriteItems((prev) => [...prev, data]);
    } 
   } catch (error) {
    alert("Есть ошибка при добавлении в избранное");
   }
  };

  const onChangeSearchInput = (event) => {
    setSeacthValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpen && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={onRemoveitem}
        />
      )}

      <Header onClickCart={() => setCartOpen(true)} />

      <Routes>
        <Route
          path="/"
          extact={true}
          element={
            <Home
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              items={items}
              onAddFavoriteItems={onAddFavoriteItems}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Favorites
              items={favoriteItems}
              onAddFavoriteItems={onAddFavoriteItems}
            />
          }
          extact={true}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
