import moment from "moment";

export const formatter = (price) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};

export const format_date = (value) => {
  if (value) {
    moment.locale("vi");
    return moment(String(value)).format("LLL");
  }
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
