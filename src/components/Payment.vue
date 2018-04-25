<template>
  <div id="payment">
    <div class="col-12">
      <select @change="select_on_change" id="payment_method">
        <option value="Boleto">Boleto</option>
        <option value="Card">Cartão</option>
      </select>
    </div>
    <form class ="card_form">
        <input type="text" id="number_input" placeholder="Número do Cartão" class="col-6 form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" id="holder_name_input" placeholder="Nome Completo" class="col-6 form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" id="date_expiration_input" placeholder="MM/YY" class="col-3 form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" id="cvv_input" placeholder="CVV" class="col-3 form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
    </form>
    <button type="button" class="col-6 btn btn-success">Realizar Pagamento</button>
  </div>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

export default {
  name: 'payment',
  mounted() {
    document.querySelector(".card_form").classList.add("hidden-form");
  },
  computed: {
    envelope_icon () {
      return faEnvelope
    },
    user_icon () {
      return faUser
    }
  },
  data() {
    return {
      payment: ''
    }
  },
  methods: {
    select_on_change() {
      payment_method = document.getElementById("payment_method").value

      if (payment_method === "Card") {
        document.querySelector(".card_form").classList.remove("hidden-form");
      } else {
        document.querySelector(".card_form").classList.add("hidden-form");
      }
    }
  },
  components: {
    FontAwesomeIcon
  }

}

</script>

<style>
.hidden-form {
  visibility: hidden;
  display: none;
}
</style>

