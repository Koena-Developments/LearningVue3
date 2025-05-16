<template>
  <div class="payment-simple">
    <StripeElements
      :stripe-key="stripeKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions"
      #default="{ elements }" 
      ref="elms"
    >
      <StripeElement
        type="card"
        :elements="elements"
        :options="cardOptions"
        ref="card"
      />
    </StripeElements>
    <button @click="pay" type="button">Pay</button>
  </div>
</template>

<script>
import { StripeElements, StripeElement } from 'vue-stripe-elements-plus'

export default {
  name: 'PaymentSimple',

  components: {
    StripeElements,
    StripeElement
  },

  data () {
    return {
      stripeKey: 'pk_test_51ROxCbPC0s4dwFBJRP4C7LEceQf1ttBhKNEX3HAQqP83QL7aYFxDcbqOVSxP2LgVxiytpdZgBekZCyqmy0UZ5uzZ00EqChjXt5', 
      itemPrice: 500,
      token:null,
      charge: null
    }
  },

  methods: {
    pay () {
      // ref in template
      const groupComponent = this.$refs.elms
      const cardComponent = this.$refs.card
      // Get stripe element
      const cardElement = cardComponent.stripeElement

      // Access instance methods, e.g. createToken()
      groupComponent.instance.createToken(cardElement).then(result => {
        // Handle result.error or result.token
      })
    }
  }
}
</script>