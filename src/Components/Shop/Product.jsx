import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'

function Product() {
    const { singleItem, } = useContext(CartContext);

  return (
    <div>Product {singleItem.title} </div>
  )
}

export default Product