<template>
  <div class="form-body on-top-mobile">
    <div class="website-logo"></div>
    <div class="row">
      <div class="img-holder">
        <div class="bg"></div>
        <div class="info-holder simple-info">
          <div><img src="/images/graphic6.svg" alt="" /></div>
          <div>
            <h3>{{ this.$config.NAME }}</h3>
          </div>
          <div>
            <p>Access all your contacts <br />remotely from any location</p>
          </div>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
    created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },

  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },
};
</script>

<style></style>
