import React from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";
import Const from "../Const.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const [isOrderComplite, setIsOrderComplite] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderLoading, setIsOrderLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsOrderLoading(true);
      const { data } = await axios.post(Const.ORDERS, {items: cartItems});
      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(Const.CART + "/" + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert("Ошибка при заказе");
      console.log(error);
    }
    setIsOrderLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            className="cu-p"
            src="/img/btnRemove.svg"
            alt="Close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="catrItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className="catrItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => {
                      onRemove(obj.id);
                      obj.added = false;
                    }}
                    className="removeBtn"
                    src="/img/btnRemove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="catrTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                onClick={onClickOrder}
                disabled={isOrderLoading}
                className="greenBtn greebBtnDesign greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplite ? "Заказ Оформлен" : "Корзина пустая"}
            img={
              isOrderComplite ? "/img/compliteOrder.jpg" : "/img/emptyСart.jpg"
            }
            description={
              isOrderComplite
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          ></Info>
        )}
      </div>
    </div>
  );
}

export default Drawer;
