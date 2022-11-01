export const getCartList = (listProduct, cartItem) => {
  return cartItem.map((item) => {
    const pro = listProduct.find((product) => product.id === item.productId);
    if (pro) {
      return {
        productId: pro.id,
        img: pro.main_image_src,
        name: pro.product_name,
        kind: pro.kind,
        price: pro.product_price,
        quantity: item.quantity,
        productStock: pro.product_quantity_stock,
      };
    }
  });
};
