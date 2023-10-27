<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <RouterLink to="/">Vue Mini Project</RouterLink>
    </h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <RouterLink to="/product">Product management</RouterLink>
      <RouterLink to="/user">User management</RouterLink>
    </nav>
    <a class="btn btn-outline-primary" routerlink="cart">Administrator</a>
  </div>

  <RouterView />
</template>

<style scoped>
nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0px 15px 0px 15px;
}
</style>
