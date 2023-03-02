import axios from "axios";
import React from "react";
import Card from "../components/Card";
import Const from "../Const.js";
import Skeleton from "../components/Skeleton";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(Const.ORDERS);
        console.log(data);
        setOrders(
          data.reduce((prev, obj) => {
            obj.items = obj.items.map((item) => ({
              ...item,
              id: Math.random(),
            }));
            setIsLoading(false);
            return [...prev, ...obj.items];
          }, [])
        );
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
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
          {orders.map((item) => (
            <Card
              key={item.id}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
