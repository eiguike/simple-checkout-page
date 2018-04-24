<template>
  <div id="checkout">
    <div class="col-12">
      Seus dados
      <input @change="form_name_valid" type="text" id="name" placeholder="Nome" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      <input @change="form_email_valid" type="text" id="email" placeholder="E-mail" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      <input @change="form_cpf_valid" type="text" id="cpf" placeholder="CPF ex: 302.432.456-24" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">

      <button @click="choose_payment_method" type="button" class="col-12 btn btn-success">Escolher pagamento</button>
    </div>
  </div>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

export default {
  name: 'checkout',
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
    form_name_valid () {
      var name_input = document.getElementById("name");
      if (name_input.value.length > 4) {
        name_input.classList.remove("is-invalid");
        return true;
      } else {
        name_input.classList.add("is-invalid");
        return false;
      }
    },
    form_email_valid () {
      var email_input = document.getElementById("email");
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email_input.value.toLowerCase())) {
        email_input.classList.remove("is-invalid");
        return true;
      } else {
        email_input.classList.add("is-invalid");
        return false;
      }
    },
    form_cpf_valid () {
      var cpf_input = document.getElementById("cpf");
      var re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      if (re.test(cpf_input.value.toLowerCase())) {
        cpf_input.classList.remove("is-invalid");
        return true;
      } else {
        cpf_input.classList.add("is-invalid");
        return false;
      }
    },
    choose_payment_method () {
      if (this.validate_form()) {
        // todo: need to store the data to the current session
        window.location.replace("http://localhost:8080/checkout/payment");
      }
    },
    validate_form () {
      return this.form_name_valid() && this.form_email_valid() && this.form_cpf_valid();
    },
  },
  components: {
    FontAwesomeIcon
  }

}

</script>

<style>
.hidden-form {
  visibility: hidden;
}
</style>

