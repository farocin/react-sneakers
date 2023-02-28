import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Const from "./Const.js";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpen, setCartOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(Const.CART);
        const favoritesResponse = await axios.get(Const.FAVORITES);
        const itemsResponse = await axios.get(Const.ITEMS);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavoriteItems(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(Const.CART + "/" + findItem.id);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(Const.CART , obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveitem = async (id) => {
    try {
      await axios.delete(Const.CART + "/" + id);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении товара из корзины");
    }
  };

  const onAddFavoriteItems = async (obj) => {
    try {
      if (
        favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))
      ) {
        axios.delete(Const.FAVORITES + "/" + obj.id);
        setFavoriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(Const.FAVORITES, obj);
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Есть ошибка при добавлении в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoriteItems,
        isItemAdded,
        onAddFavoriteItems,
        setCartOpen,
        setCartItems
      }}
    >
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
            exact={true}
            element={
              <Home
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddFavoriteItems={onAddFavoriteItems}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path="/favorites" exact={true} element={<Favorites />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
