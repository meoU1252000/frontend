<template>
  <div class="rating-content w-9">
    <div class="content-header p-2 w-full">
      <div class="w-full px-3 py-2">
        <h2>Đánh Giá {{ product.product_name }}</h2>
      </div>
      <div class="flex w-full justify-content-center h-10rem">
        <div class="col-12 flex align-items-center">
          <div class="col-3 border-right-2">
            <h1 class="text-center text-rating">{{ rating }}</h1>
            <star-rating
              v-model:rating="rating"
              :show-rating="false"
              :read-only="true"
              star-size="30"
              class="justify-content-center"
            ></star-rating>
            <h5 class="text-center">{{ total }} đánh giá</h5>
          </div>
          <div class="col-9">
            <div class="flex w-full mb-2 align-items-center">
              <div class="flex mr-2">
                <h5 class="mr-2">5</h5>
                <i class="pi pi-star-fill text-sm"></i>
              </div>
              <my-progress
                :value="ratingPercentStar5"
                :showValue="false"
                style="height: 0.5em"
                class="w-10 mr-2 rating-color"
              />
              <h5>{{ ratingPercentStar5 }}%</h5>
            </div>
            <div class="flex w-full mb-2 align-items-center">
              <div class="flex mr-2">
                <h5 class="mr-2">4</h5>
                <i class="pi pi-star-fill text-sm"></i>
              </div>
              <my-progress
                :value="ratingPercentStar4"
                :showValue="false"
                style="height: 0.5em"
                class="w-10 mr-2 rating-color"
              />
              <h5>{{ ratingPercentStar4 }}%</h5>
            </div>
            <div class="flex w-full mb-2 align-items-center">
              <div class="flex mr-2">
                <h5 class="mr-2">3</h5>
                <i class="pi pi-star-fill text-sm"></i>
              </div>
              <my-progress
                :value="ratingPercentStar3"
                :showValue="false"
                style="height: 0.5em"
                class="w-10 mr-2 rating-color"
              />
              <h5>{{ ratingPercentStar3 }}%</h5>
            </div>
            <div class="flex w-full mb-2 align-items-center">
              <div class="flex mr-2">
                <h5 class="mr-2">2</h5>
                <i class="pi pi-star-fill text-sm"></i>
              </div>
              <my-progress
                :value="ratingPercentStar2"
                :showValue="false"
                style="height: 0.5em"
                class="w-10 mr-2 rating-color"
              />
              <h5>{{ ratingPercentStar2 }}%</h5>
            </div>
            <div class="flex w-full mb-2 align-items-center">
              <div class="flex mr-2">
                <h5 class="mr-2">1</h5>
                <i class="pi pi-star-fill text-sm"></i>
              </div>
              <my-progress
                :value="ratingPercentStar1"
                :showValue="false"
                style="height: 0.5em"
                class="w-10 mr-2 rating-color"
              />
              <h5>{{ ratingPercentStar1 }}%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    product: { type: Object },
  },

  setup(props) {
    // const star5 = computed(() =>{
    //     return props.product.product_star.star_5 || 0 ;
    // })

    const star = computed(() => {
      return props.product.product_star || 0;
    });

    const star5 = computed(() => {
      return star.value.star_5 || 0;
    });

    const star4 = computed(() => {
      return star.value.star_4 || 0;
    });

    const star3 = computed(() => {
      return star.value.star_3 || 0;
    });

    const star2 = computed(() => {
      return star.value.star_2 || 0;
    });

    const star1 = computed(() => {
      return star.value.star_1 || 0;
    });

    const total = computed(() => {
      return star.value.total || 0;
    });

    const rating = computed(() => {
      return (
        (star1.value * 1 +
          star2.value * 2 +
          star3.value * 3 +
          star4.value * 4 +
          star5.value * 5) /
          total.value || 0
      );
    });

    const ratingPercentStar5 = computed(() => {
      return (star5.value / total.value) * 100 || 0;
    });
    const ratingPercentStar4 = computed(() => {
      return (star4.value / total.value) * 100 || 0;
    });
    const ratingPercentStar3 = computed(() => {
      return (star3.value / total.value) * 100 || 0;
    });
    const ratingPercentStar2 = computed(() => {
      return (star2.value / total.value) * 100 || 0;
    });
    const ratingPercentStar1 = computed(() => {
      return (star1.value / total.value) * 100 || 0;
    });

    return {
      ratingPercentStar5,
      ratingPercentStar4,
      ratingPercentStar3,
      ratingPercentStar2,
      ratingPercentStar1,
      rating,
      star,
      star5,
      star4,
      star3,
      star2,
      star1,
      total,
    };
  },
});
</script>

<style lang="scss" scoped>
.rating-content {
  min-height: 15rem;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  .content-header {
    .text-rating {
      color: #fe8c23;
    }
    .border-right-2 {
      border-color: rgb(224, 224, 224) !important;
    }
  }
  //   border-color: rgb(224, 224, 224);
  .button-primary {
    background-color: rgb(207, 15, 15, 1) !important;
    border-color: rgb(207, 15, 15, 1) !important;

    &:enabled:hover {
      background-color: rgb(145, 10, 10) !important;
      border-color: rgb(207, 15, 15, 1) !important;
    }
    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
    }
  }

  .comment-bottom {
    a {
      text-decoration: none;
      color: rgb(207, 15, 15, 1) !important;
      cursor: pointer;
    }
    .text-sm {
      color: #90949c;
    }
  }
}
:deep(.p-progressbar-value) {
  background: #fe8c23 !important;
}
</style>
