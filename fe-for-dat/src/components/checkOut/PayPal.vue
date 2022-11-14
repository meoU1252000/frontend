<template>
  <div ref="paypal" class="paypal1"></div>
</template>

<script>
import { formatter } from "@/function/common";

import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    totalPrice: { type: Number },
  },
  setup(props, { emit }) {
    const paidFor = ref(false);
    const loaded = ref(false);
    const paypal = ref(null);

    const USDprice = computed(() => {
      console.log(props.totalPrice);
      return (props.totalPrice / 24815).toFixed(2);
    });

    const setLoaded = () => {
      loaded.value = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Hóa đơn thanh toán tại Đạt Lê Store",
                  amount: {
                    currency_code: "USD",
                    value: USDprice.value,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            paidFor.value = true;
            // console.log(order.purchase_units[0].amount.value);
            emit("complete-paypal", order.purchase_units[0].amount.value);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.value);
    };

    onMounted(() => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AQvtEo78ZAXVjlv53YY1cd6dwkncZfC_qoqwDA1dib1KTs29QYxmqtOYPCrLROKEBwpwW2D7XGB_gFHc";
      script.addEventListener("load", setLoaded);
      document.body.appendChild(script);
    });

    return {
      paidFor,
      loaded,
      paypal,
      USDprice,
      formatter,
    };
  },
});
</script>

<style lang="scss" scoped>
.paypal1 {
  width: 100%;
  height: 10rem;
  margin: 1rem 0;
}
</style>
