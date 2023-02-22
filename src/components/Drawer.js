function Drawer({onClose, items = []}) {

  
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

        <div className="items">
          {items.map((obj) => (   
            <div className="catrItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imgUrl})` }}
                className="catrItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img
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
          <button className="greenBtn greebBtnDesign">
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
