<template>
  <div id="app">
    <NavBar :toView="toView" />
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="bodyElement header">
      <div class="bigTitle">{{ currentView }} Poll Trends</div>
      <div>by Victorien Garrigues</div>
    </div>
    <div class="bodyElement">
      <OpinionGraph :currentView="currentView" />
    </div>
    <div class="bodyElement header">
      <div class="bigTitle">{{ currentView }} Seat Projection</div>
    </div>
    <div class="bodyElement">
      <ForecastGraph :currentView="currentView" />
    </div>
    <!-- <component v-bind:is="currentView" /> -->
  </div>
</template>

<script src="./js/app.js"></script>
<style src="./css/app.css"></style>
