import moment from 'moment';

export const formatter = (price) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};

export const format_date = (value) => {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY, h:mm:ss');
  }
};
