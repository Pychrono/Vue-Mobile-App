<template>
    <div>
        <!-- Cart view -->
        <div class="" >
            <h3 class="text-center">Cart</h3>
            <!-- Display message if cart is empty -->
            <div v-if="cartItems.length === 0" class="text-center mt-3">
                <button class="btn btn-primary" @click="$emit('back-to-lessons')">Go Back to Activities</button>
            </div>
            <!-- Displaying items in the cart -->
            <div v-else class="p-3 row">
                <div class=" col-9">
                    <div v-for="item in cartItems" :key="item.title" class="card-body first col-4 p-3"
                        style="display: inline-block;">
                        <!-- Cart item details -->
                        <img :src="item.image" alt="Activity Image" class="card-img-top" />
                        <h5 class="card-title">Title: {{ item.title }}</h5>
                        <p class="card-text">Location: {{ item.location }}</p>
                        <p class="card-text">Spaces: {{ item.purchasedSpaces }} / {{ item.totalSpaces }}</p>
                        <p class="card-text">Price: &pound;{{ item.price * item.purchasedSpaces }}</p>
                        <!-- Remove from Cart button -->
                        <button class="btn btn-sm btn-danger" @click="removeFromCart(item)">Remove from Cart</button>
                    </div>
                </div>
                <!-- Checkout form -->
                <div class="col-3">
                    <div>
                        <h4>Checkout</h4>
                        <form @submit.prevent="submitOrder">
                            <div class="mb-3">
                                <!-- Name input -->
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="checkoutForm.name" required>
                            </div>
                            <div class="mb-3">
                                <!-- Phone number input -->
                                <label for="phone" class="form-label">Phone Number</label>
                                <input type="tel" class="form-control" id="phone" v-model="checkoutForm.phone"
                                    pattern="[0-9]{10}" required>
                                <!-- Phone number validation message -->
                                <small class="text-muted">Please enter a valid 10-digit phone number.</small>
                            </div>
                            <!-- Total value of items in the cart -->
                            <h4>Total: &pound;{{ totalCheckoutValue }}</h4>
                            <!-- Checkout button -->
                            <button type="submit" class="btn btn-primary" :disabled="!isCheckoutFormValid"
                                @click="checkoutAlert">
                                Checkout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckoutComponent',
    props: ['cartItems'],
    data() {
        return {
            checkoutForm: {
                name: '',
                phone: '',
            },
            // other data properties
        };
    },
    computed: {
        // Computes the total number of items in the cart
        totalCartItems() {
            return this.cartItems.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        // Computes the total checkout value of items in the cart
        totalCheckoutValue() {
            return this.cartItems.reduce(
                (total, item) => total + item.price * item.purchasedSpaces,
                0
            );
        },
        // Validates the checkout form
        isCheckoutFormValid() {
            return this.checkoutForm.name.length > 0 && this.checkoutForm.phone.match(/^\d{10}$/);
        },
    },

    methods: {
        async submitOrder() {
            try {
                const orderDetails = {
                    name: this.checkoutForm.name,
                    phone: this.checkoutForm.phone,
                    items: this.cartItems.map(item => ({
                        id: item._id,
                        purchasedSpaces: item.purchasedSpaces
                    }))
                };

                const orderResponse = await fetch('https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails)
                });

                if (!orderResponse.ok) {
                    throw new Error(`HTTPs error! status: ${orderResponse.status}`);
                }

                // Emit an event to notify the parent component to reset the cart
                this.$emit('order-submitted');

                // Reset the checkout form
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';

                alert('Order submitted successfully!');
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },
        // Removes an item from the cart
        removeFromCart(item) {
            this.$emit('remove-from-cart', item);
        },
        goToActivities() {
            this.$emit('hide-cart');
        },

    }
};
</script>

<style scoped>
/* Component-specific styles */
</style>