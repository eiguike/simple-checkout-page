<template>
  <div id="boleto_page">
    <div class="col-12">
      {{ boleto_number }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'boleto_page',
  data() {
    return {
      boleto_number: ''
    }
  },
  mounted() {
    var payments = JSON.parse(sessionStorage.getItem("payments"));
    if (payments == null) {
      this.boleto_number = "Boleto inválido"
    } else {
      this.boleto_number = "O número do seu boleto é: " + payments["number"];
      sessionStorage.clear();
    }
  }
}

</script>

