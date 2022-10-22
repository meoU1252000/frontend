
export const formatter = (price) => {
    return new Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
  }).format(price);
}
