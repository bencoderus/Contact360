<template>
  <div class="form-holder">
    <div class="form-content">
      <div class="form-items">
        <div class="website-logo-inside">
          <a href="/">
            <h3>Create account</h3>
          </a>
        </div>
        <div class="page-links">
          <router-link to="/register"
            ><a class="active">Create account</a></router-link
          >
          <router-link to="/"><a>Login</a></router-link>
        </div>

        <form @submit.prevent="login()">
          <div class="row">
            <div class="col-12 col-sm-6">
              <input
                type="text"
                name="name"
                class="form-control"
                v-model="user.name"
                placeholder="Your Name"
                required
              />
            </div>
            <div class="col-12 col-sm-6">
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="user.email"
                placeholder="Email address"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="user.pin"
                placeholder="Password"
                required
              />
            </div>
            <div class="col-12 col-sm-6">
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="user.cpin"
                placeholder="Confirm password"
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
                />
                <label class="custom-control-label" for="customCheck1"
                  >I agree on <a href="#">terms & conditions</a></label
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
  name: "Register",
  data() {
    return {
      sending: false,
      user: {
        name: "",
        email: "",
        pin: "",
        cpin: ""
      }
    };
  },
  methods: {
    login() {
      this.sending = true;
      this.$http
        .post(`${this.$config.ROOT_API}/register`, this.user)
        .then(res => {
          this.sending = false;
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$toast.success(res.data.message);
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$toast.warning(res.data.message);
          }
        })
        .catch(err => {
          this.$toast.error("Network error");
          this.sending = false;
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
