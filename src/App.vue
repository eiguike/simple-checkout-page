<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-light bg-light">
      <div class="navbar-brand col-12 col-sm-3">
        <img src="http://pigment.github.io/fake-logos/logos/medium/color/greens-food-suppliers.png" style="max-width: 90%; height: auto"></img>
      </div>
      <nav class="col-12 col-sm-8">
        <div class="row">
          <div class="column-row">
            <font-awesome-icon :icon="user_icon" />
              <span>Minha Conta</span>
          </div>
          <div class="column-row">
            <font-awesome-icon :icon="shopping_cart_icon" />
              <span>Carrinho</span>
              <span>{{ items_available }}</span>
          </div>
        </div>
        <form class="form-inline row">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search" style="width: 100%">
        </form>
      </nav>
    </nav>
    <div class="container pt-4 pt-md-5">
      <div class="jumbotron">
        <router-view></router-view>
      </div>
    </div>
    <footer class="pt-4 my-md-5 pt-md-5 border-top">
    </footer>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart'

export default {
  name: 'app',

  data: {
    items_available: "5"
  },

  computed: {
    user_icon () {
      return faUser
    },
    list_icon () {
      return faListAlt
    },
    shopping_cart_icon () {
      return faShoppingCart
    }
  },

  components: {
    FontAwesomeIcon
  }
}
</script>

<style>
.column-row:not(:first-child) {
  margin-left: 3%;
}
</style>
