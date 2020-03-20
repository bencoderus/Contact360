<template>
  <div class="form-holder">
                 <loading :active.sync="loading" 
        :can-cancel="false" 
        :width="45"
        :is-full-page="true"></loading>
    <div class="form-content">
      <div class="form-items">
        <div class="website-logo-inside">
          <a href="/">
            <h3>Home</h3>
          </a>
        </div>
        <div class="page-links">
          <router-link to="/"><a class="active">Login</a></router-link>
          <router-link to="/register"><a>Create account</a></router-link>
        </div>

        <form @submit.prevent="login()">
          <div class="row">
            <div class="col-12 col-sm-6">
              <input
                type="name"
                name="email"
                class="form-control"
                v-model="user.email"
                placeholder="E-mail Address"
                required
              />
            </div>
            <div class="col-12 col-sm-6">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="user.pin"
                placeholder="Your Pin"
                required
              />
            </div>
          </div>

          <div class="row top-padding">
            <div class="col-12 col-sm-6">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                  required
                checked/>
                <label class="custom-control-label" for="customCheck1"
                  >Remember me</label
                >
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-button text-right">
                <button
                  id="submit"
                  :disabled="sending"
                  type="submit"
                  class="ibtn less-padding"
                >
                  Proceed to dashboard
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      sending: false,
      loading: false,
      btntext: "Proceed to dashboard",
      user: {
        email: "",
        pin: ""
      }
    };
  },
  methods: {
    login() {
      this.sending = true;
      this.loading = true;
      this.btntext = "Please wait";
      this.$http
        .post(`${this.$config.ROOT_API}/authorize`, this.user)
        .then(res => {
          this.sending = false;
          this.loading = false;
          this.btntext = "Proceed to dashboard";
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$toast.success(res.data.message);
            setTimeout(() => {
              this.$router.push({ name: "Dashboard" });
            }, 200);
          } else {
            this.$toast.warning(res.data.message);
          }
        })
        .catch(err => {
          this.$toast.error("Network error");
          this.sending = false;
          this.loading = false;
          this.btntext = "Proceed to dashboard";
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
