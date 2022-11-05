export const setItemLocal = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const getItemLocal = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const removeItemLocal = (name) => {
  localStorage.removeItem(name);
};

export const addProductToCart = (item) => {
  const arrCart = getItemLocal("cart") || [];
  if (arrCart.length) {
    // let check = false;
    const check = arrCart.find((itemCart) => {
      if(itemCart.productId === item.productId){
        if (itemCart.quantity < itemCart.maxQuantity) 
          itemCart.quantity += item.quantity;
          return itemCart;
      }})
    if (!check) {
      arrCart.push(item);
    }
    setItemLocal("cart", arrCart);
    // check = false;
    return;
  }
  setItemLocal("cart", [item]);
};

export const updateQuantity = (item) => {
  const arrCart = getItemLocal("cart") || [];
  if (arrCart.length) {
    arrCart.forEach((itemCart) => {
      if (itemCart.productId === item.productId) {
        itemCart.quantity = item.quantity;
      }
    });
    setItemLocal("cart", arrCart);
    return;
  }
};

export const removeProductFromCart = (id) => {
  const arrCart = getItemLocal("cart") || [];
  const newCart = arrCart.filter((item) => item.productId !== id);
  setItemLocal("cart", newCart);
};

export const setStateCart = (store) => {
  const listItem = getItemLocal("cart");
  store.dispatch("product/addCart", listItem);
};
