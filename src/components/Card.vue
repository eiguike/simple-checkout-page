<template>
  <div id="card">
      <div class='row card-wrapper'></div>

      <div class="m-3" id='form'>
        <div class="row">
          <input class="col-6 form-control" @change="form_number_valid" type="text" id="number">
          <input class="col-6 form-control" @change="form_name_valid" type="text" id="name"/>
        </div>
        <div class="row">
          <input class="col-3 form-control" @change="form_date_expiration_valid" type="text" id="expiry"/>
          <input class="col-3 form-control" @change="form_cvv_valid" type="text" id="cvc"/>
          <b-button @click="show_modal" class="col-6 btn-sm btn-success">
            {{ button_payment }}
          </b-button>
        </div>
      </div>

      <b-modal ref="myModalRef" hide-footer title="Estado do Pagamento">
        <div class="d-block text-center">
          <h3>{{ message }}!</h3>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="hide_modal">Close Me</b-btn>
      </b-modal>
  </div>
</template>

<script>

export default {
  name: 'card',
  data() {
    return {
      expiration_date: '',
      message: '',
      number: '',
      payment: '',
      amount: '',
      button_payment: 'Efetuar pagamento'
    }
  },
  mounted() {
    this.amount = (Math.random() * (1000 - 20) + 20).toFixed(2);
    console.log(document.getElementsByName("name"));
    var card = new Card({
        form: '#form',
        formSelectors: {
            numberInput: '#number', // optional — default input[name="number"]
            expiryInput: '#expiry', // optional — default input[name="expiry"]
            cvcInput: '#cvc', // optional — default input[name="cvc"]
            nameInput: '#name' // optional - defaults input[name="name"]
        },
        container: '.card-wrapper',
        debug: true
    });
  },
  methods: {
    form_number_valid () {
      var valid_card_issuer = [ "54", "42", "65", "34" ];
      var number_input = document.getElementById("number");
      var number_input_value = number_input.value.replace(/ /g,'');

      // verifying if the card issuer is valid
      if (valid_card_issuer.indexOf(number_input_value.slice(0,2)) == -1) {
        number_input.classList.add("is-invalid");
        return false;
      }

      var re = /^\d{16}$/;
      if (re.test(number_input_value)) {
        number_input.classList.remove("is-invalid");
        this.number = number_input_value;
        return true;
      } else {
        number_input.classList.add("is-invalid");
        return false;
      }
    },
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
    form_date_expiration_valid () {
      var date_expiration_input = document.getElementById("expiry");

      var slash_character = date_expiration_input.value.indexOf("/");
      var month = date_expiration_input.value.slice(0, slash_character);
      var year = date_expiration_input.value.slice(slash_character + 1);

      if (Date.now() > new Date(year, month)) {
        date_expiration_input.classList.add("is-invalid");
        return false;
      }

      this.expiration_date = year+"-"+month+"-"+"1";
      date_expiration_input.classList.remove("is-invalid");
      return true;
    },
    form_cvv_valid () {
      var cvv_input = document.getElementById("cvc");
      var re = /^\d{3}$/;
      if (re.test(cvv_input.value.toLowerCase())) {
        cvv_input.classList.remove("is-invalid");
        return true;
      } else {
        cvv_input.classList.add("is-invalid");
        return false;
      }
    },
    select_on_change() {
      this.button_payment = "Efetuar pagamento";
    },
    hide_modal () {
      console.log(this.status);
      if (this.status == 201) {
        window.location.replace("http://localhost:8080/checkout");
        sessionStorage.clean();
      }
      this.$refs.myModalRef.hide();
    },
    show_modal() {
      if (this.validate_form()) {
        this.next_step_checkout();
        this.$refs.myModalRef.show();
      }
    },
    next_step_checkout () {
      this.prepare_json();
      this.sent_request();
    },
    prepare_json() {
      var json_buyer = sessionStorage.getItem("card_payment");
      if (json_buyer == null) {
        return;
      }

      var number = this.number;
      var name = document.getElementById("name").value;
      var expiry = this.expiration_date;
      var cvc = document.getElementById("cvc").value;

      var json_card = { "holder_name": name,
                        "number": number,
                        "expiration_date": expiry,
                        "cvv": cvc };

      this.payment = JSON.parse(json_buyer);
      this.payment["method"] = json_card;
    },
    sent_request() {
      console.log(this.payment);
      this.$http.post('http://localhost:3000/api/v1/payments/', this.payment).then(response => {
        if (response.status == 201) {
          this.message = "Pagamento efetuado com sucesso!";
        }
        this.status = response.status;
        sessionStorage.setItem("payments", JSON.stringify(response.body));
      }, response => {
        this.message = "Pagament não pode ser efetuado!";
        console.log("ERROR" + response);
      });
    },
    validate_form () {
      return this.form_number_valid() && this.form_name_valid() &&
             this.form_date_expiration_valid() && this.form_cvv_valid();
    },
  }
}

</script>

