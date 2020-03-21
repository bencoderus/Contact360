<template>
  <div class="form-holder">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :width="45"
      :is-full-page="true"
    ></loading>
    <div class="form-content">
      <div class="form-items">
        <div class="website-logo-inside">
          <h3>404 Error</h3>
        </div>
        <div class="page-links">
          <router-link to="/"><a class="active">Go Back</a></router-link>
        </div>

        <p>Sorry the page, You are looking for was not found.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page not found"
};
</script>

<style></style>
