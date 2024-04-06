import React from 'react';
import CardContainer from './CardContainer';

function ProductList() {
  const data = {
    "_id": {
      "$oid": "660e8147c4b9bd8ec0a52b21"
    },
    "name": "sadfaf",
    "description": [
      "nb nb"
    ],
    "price": 50,
    "inStock": true,
    "deliveryFee": 0,
    "variations": [
      {
        "size": " jm ",
        "quantity": 20,
        "_id": {
          "$oid": "660e8147c4b9bd8ec0a52b22"
        }
      }
    ],
    "imageUrl": [
      "https://firebasestorage.googleapis.com/v0/b/edau-farm.appspot.com/o/4K%20vs%208K%20Desktop%20Wallpapers%20(914).jpg?alt=media&token=6b657ac2-7d97-47b2-864e-6abee3374548",
      "https://firebasestorage.googleapis.com/v0/b/edau-farm.appspot.com/o/4K%20vs%208K%20Desktop%20Wallpapers%20(903).jpg?alt=media&token=9750521d-dfd2-418f-ad21-12084d7efc23"
    ],
    "createdAt": {
      "$date": "2024-04-04T10:30:31.294Z"
    },
    "__v": 0
  };

  return (
    <div>
      <CardContainer data={data} />
    </div>
  );
}

export default ProductList;
