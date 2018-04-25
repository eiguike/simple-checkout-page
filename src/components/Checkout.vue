<template>
  <div id="checkout">
    <div class="col-12">
      Seus dados
      <input @change="form_name_valid" type="text" id="name" placeholder="Nome" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      <input @change="form_email_valid" type="text" id="email" placeholder="E-mail" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      <input @change="form_cpf_valid" type="text" id="cpf" placeholder="CPF ex: 302.432.456-24" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      <select @change="select_on_change" id="payment_method">
        <option value="Card">Cartão</option>
        <option value="Boleto">Boleto</option>
      </select>

      <div class="pt-3">
        <b-button @click="show_modal" class="col-12 btn-success">
          {{ button_payment }}
        </b-button>
        <b-modal ref="myModalRef" hide-footer title="Estado do Pagamento">
          <div class="d-block text-center">
            <h3>{{ message }}!</h3>
          </div>
          <b-btn class="mt-3" variant="outline-danger" block @click="hide_modal">Close Me</b-btn>
        </b-modal>
      </div>
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
      message: '',
      payment: '',
      button_payment: 'Adicionar informações do Cartão'
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
    select_on_change() {
      payment_method = document.getElementById("payment_method").value
      if (payment_method === "Card") {
        this.button_payment = "Adicionar informações do Cartão";
      } else {
        this.button_payment = "Efetuar pagamento";
      }
    },
    hide_modal () {
      this.$refs.myModalRef.hide()
    },
    show_modal() {
      if (this.validate_form()) {
        this.next_step_checkout();
        this.$refs.myModalRef.show();
      }
    },
    next_step_checkout () {
      name = document.getElementById("name").value;
      email = document.getElementById("email").value;
      cpf = document.getElementById("cpf").value;
      payment_method = document.getElementById("payment_method").value;

      if (payment_method === "Card") {
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('cpf', cpf);
        window.location.replace("http://localhost:8080/checkout/payment");
      } else {
        this.prepare_json();
        this.sent_request();
      }
    },
    prepare_json() {
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var cpf = document.getElementById("cpf").value;
      var method_type = document.getElementById("payment_method").value;
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
    },
    sent_request() {
      console.log(this.payment);
      this.$http.post('http://localhost:3000/api/v1/payments/', this.payment).then(response => {
        if (response.status == 201) {
          this.message = "Boleto gerado com êxito!";
        } else {
          this.message = "Falha ao gerar o Boleto!";
        }
        this.status = response.body.status;
        sessionStorage.setItem("payments", JSON.stringify(response.body));
      }, response => {
        console.log("ERROR" + response);
      });
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

