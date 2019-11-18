import React from "react";

function DisplayProduct({ products }) {
  // console.log(products);
  return <React.Fragment>{products.map(renderProduct)}</React.Fragment>;
}

function renderProduct({ product_id, name, price }) {
  return (
    <div className="mx-auto" key={product_id}>
      {name} : ${price}
    </div>
  );
}

// DisplayProduct.propTypes = {
//   productsArray: PropTypes.object.isRequired
// };

export default DisplayProduct;
