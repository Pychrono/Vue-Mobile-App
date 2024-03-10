<template>
  <div>
    <div class="row">
      <div
        v-for="item in filteredItems"
        id="searchResults"
        :key="item.title"
        class="card first col-lg-3 col-5 p-2"
        style="background-color: #9aa4ab"
      >
        <img :src="item.image" alt="Activity Image" class="card-img-top" />
        <div class="card-body">
          <!-- Activity details -->
          <h5 class="card-title">Title: {{ item.title }}</h5>
          <p class="card-text">
            <strong>Location:</strong> {{ item.location }}
          </p>
          <p class="card-text">
            <strong>Spaces:</strong> {{ item.availableSpaces }}
          </p>
          <p><strong>Price:</strong> &pound;{{ item.price }}</p>
          <!-- Add to Cart button -->
          <button
            class="btn btn-sm text-light"
            style="background-color: #3498db"
            @click="addToCart(item)"
            :disabled="
              item.isSoldOut ||
              (item.addedToCart && item.purchasedSpaces === item.totalSpaces)
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "LessonComponent",
  props: ["classes"],
  computed: {
        // Returns classes filtered by the search query
        filteredItems() {
            return this.classes; // Placeholder for search functionality
        },
        // Computes the total number of items in the cart
        totalCartItems() {
            return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        // Computes the total checkout value of items in the cart
        totalCheckoutValue() {
            return this.cart.reduce((total, item) => total + (item.price * item.purchasedSpaces), 0);
        },
        // Validates the checkout form
        isCheckoutFormValid() {
            return (
                this.checkoutForm.name.length > 0 &&
                this.checkoutForm.phone.match(/^\d{10}$/) // Validates a 10-digit phone number
            );
        },
    },
  methods: {
    addToCart(item) {
    this.$emit('add-class-to-cart', item);
  },
  

  },
};
</script>
  
  <style scoped>
/* Component-specific styles */
</style>
  