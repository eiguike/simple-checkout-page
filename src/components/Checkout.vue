<template>
  <div id="checkout">
    <div class="row">
      <div class="col-6">
        Seus dados
        <input @change="form_name_valid" type="text" id="name" placeholder="Nome" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input @change="form_email_valid" type="text" id="email" placeholder="E-mail" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input @change="form_cpf_valid" type="text" id="cpf" placeholder="CPF ex: 302.432.456-24" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      </div>

      <div class="col-6">
        Dados de Pagamento
        <select @change="hide_select_form" class="custom-select mb-1" id="method_type">
          <option selected>Forma de Pagamento</option>
          <option value="Card">Cartão</option>
          <option value="Boleto">Boleto</option>
        </select>
        <input @change="form_on_change" type="text" id="holder_name" placeholder="Nome Escrito" class="card-form form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input @change="form_on_change" type="text" id="number" placeholder="Número" class="card-form form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <div class="input-group input-group-md mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text card-form" id="inputGroup-sizing-md">Data de Expiração</span>
          </div>
          <input @change="form_on_change" type="date" id="expiration_date" class="form-control card-form" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
        <input @change="form_on_change" type="text" id="cvv" placeholder="CVV" class="form-control card-form" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      </div>
    </div>

  <div class="pt-3">
    <b-button @click="showModal" class="col-12 btn-success">
      Realizar Pagamento
    </b-button>
    <b-modal ref="myModalRef" hide-footer title="Estado do Pagamento">
      <div class="d-block text-center">
        <h3>{{ product }}!</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>
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
      product: 'Boots',
      status: '',
      payment: ''
    }
  },
  methods: {
    form_name_valid (e) {
      if (e.target.value.length > 4) {
        e.target.classList.remove("is-invalid");
        return true;
      } else {
        e.target.classList.add("is-invalid");
        return false;
      }
    },
    form_email_valid (e) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(e.target.value.toLowerCase())) {
        e.target.classList.remove("is-invalid");
        return true;
      } else {
        e.target.classList.add("is-invalid");
        return false;
      }
    },
    form_cpf_valid (e) {
      var re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      if (re.test(e.target.value.toLowerCase())) {
        e.target.classList.remove("is-invalid");
        return true;
      } else {
        e.target.classList.add("is-invalid");
        return false;
      }
    },
    form_on_change (e) {
    },
    showModal () {
      if (validate_form()) {
        this.$refs.myModalRef.show();
        this.prepare_json();
        this.send_request();
      }
    },
    hide_select_form() {
      var method_type = document.getElementById("method_type").value;
      var card_forms = document.querySelectorAll(".card-form");
      if (method_type == "Card") {
        for (let card of card_forms) {
          card.classList.remove("hidden-form");
        }
      } else {
        for (let card of card_forms) {
          card.classList.add("hidden-form");
        }
      }
    },
    validate_form() {
      name = document.getElementById("name").value;
      email = document.getElementById("email").value;
      cpf = document.getElementById("cpf").value;
      method_type = document.getElementById("method_type").value;
      holder_name = document.getElementById("holder_name").value;
      number = document.getElementById("number").value;
      expiration_date = document.getElementById("expiration_date").value;
      cvv = document.getElementById("cvv").value;
    },
    hideModal () {
      if (this.status === "success") {
        window.location.replace("http://localhost:8080");
      }
      this.$refs.myModalRef.hide()
    },
    prepare_json() {
      name = document.getElementById("name").value;
      email = document.getElementById("email").value;
      cpf = document.getElementById("cpf").value;
      method_type = document.getElementById("method_type").value;

      if (method_type === "Boleto") {
        this.payment = { "payment": {
                            method_type,
                            "amount": "123.30",
                            "client": {
                              "client_id": "1"
                            },
                            "buyer": {
                              name,
                              email,
                              "CPF": cpf
                            }
                          }
                        };
      } else if (method_type === "Card") {
        holder_name = document.getElementById("holder_name").value;
        number = document.getElementById("number").value;
        expiration_date = document.getElementById("expiration_date").value;
        cvv = document.getElementById("cvv").value;

        this.payment = { "payment": {
                            method_type,
                            "amount": "123.30",
                            "client": {
                              "client_id": "1"
                            },
                            "buyer": {
                              name,
                              email,
                              "CPF": cpf
                            },
                            "method": {
                              holder_name,
                              number,
                              expiration_date,
                              cvv
                            }
                          }
                        };
      }
    },
    send_request () {
      console.log(this.payment);
      this.$http.post('http://localhost:3000/api/v1/payments/', this.payment).then(response => {
        if (response.body.status === "success") {
          this.product = "Pagamento efetuado!";
        } else {
          this.product = "Pagamento não efetuado!";
        }
        this.status = response.body.status;
        console.log(response.status);
      }, response => {
        console.log("ERROR" + response);
      });
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
}
</style>

