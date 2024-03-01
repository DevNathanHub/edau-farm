import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import DeliveryAddress from './DeliveryAddress';
import ContentNotFound from '../../NotFound/ContentNotFound';

function Checkout() {
    const {singleItem} = useContext(CartContext);
    if(singleItem == null){
        return <ContentNotFound/>;
    }
  return (
    <div>
        <div>Checkout {singleItem.title}</div>
        <div><DeliveryAddress/></div>

    </div>
  )
}

export default Checkout