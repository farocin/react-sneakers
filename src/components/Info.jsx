import React from 'react'
import AppContext from '../context';

const Info = ({title, img, description}) => {
  const {setCartOpen} = React.useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              src={img}
              alt="Empty"
            />
            <h2>{title}</h2>
            <p className="opacity-6">
              {description}
            </p>
            <button onClick={() => setCartOpen(false)} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
  )
}

export default Info;