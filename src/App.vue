<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import LogoSVG from "./assets/logo.svg?component";

const username = ref("saddansyah")

</script>

<template>
  <header>
    <LogoSVG alt="Vite logo" class="logo" />

    <div class="wrapper">
      <HelloWorld msg="Smart Home " />

      <nav>
        <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'Register' }">Register</RouterLink>

        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/energy-consumption">Energy Consumption</RouterLink>
        <RouterLink to="/devices">Devices</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/user">{{ username }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView :username="username"/>
  <RouterView :username="username" name="HiddenView"/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
