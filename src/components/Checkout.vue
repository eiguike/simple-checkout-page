<template>
  <div id="checkout">
    <div class="row">
      <div class="col-6">
        Seus dados
        <input type="text" value="Nome" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" value="E-mail" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" value="CPF" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      </div>

      <div class="col-6">
        Dados de Pagamento
        <select class="custom-select mb-1" id="inputGroupSelect01">
          <option selected>Forma de Pagamento</option>
          <option value="1">Cartão</option>
          <option value="2">Boleto</option>
        </select>
        <input type="text" value="Nome Escrito" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <input type="text" value="Número" class="form-control mb-1" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <div class="input-group input-group-md mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-md">Data de Expiração</span>
          </div>
          <input type="date" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
        <input type="text" value="CVV" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
      </div>
    </div>

  <div class="pt-3">
    <b-button @click="testHttp" class="col-12 btn-success">
      Realizar Pagamento
    </b-button>
    <b-modal ref="myModalRef" hide-footer title="Estado do Pagamento">
      <div class="d-block text-center">
        <h3>{{ product  }}!</h3>
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
      product: 'Boots'
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    testHttp () {
      this.showModal();
      let id = 1;
      fetch('http://localhost:3000/api/v1/payments/1')
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.product = json
        })
    }
  },
  components: {
    FontAwesomeIcon
  }
}

</script>


