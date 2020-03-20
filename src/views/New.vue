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
            <h3>New contact</h3>
          </a>
        </div>
        <div class="page-links">
          <router-link to="/register"
            ><a class="active">New contact</a></router-link
          >
          <router-link to="/dashboard"><a>Go Back</a></router-link>
        </div>

        <form @submit.prevent="save()">
          <div class="row">
            <div class="col-12 col-sm-6">
              <input
                type="text"
                name="name"
                class="form-control"
                v-model="contact.name"
                placeholder="Your Name"
                required
              />

              <input
                type="text"
                name="email"
                class="form-control"
                v-model="contact.email"
                placeholder="Email address"
                required
              />

              <input
                type="text"
                minlength="11"
                maxlength="15"
                name="phoneno"
                class="form-control"
                v-model="contact.phoneno"
                placeholder="Mobile number"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-button">
                <button
                  id="submit"
                  :disabled="sending"
                  type="submit"
                  class="ibtn less-padding"
                >
                  {{ btntext }}
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
let token = localStorage.getItem("token");
export default {
  name: "NewContact",
  data() {
    return {
      loading: false,
      sending: false,
      btntext: "Add new contact",
      contact: {
        name: "",
        email: "",
        phoneno: "",
        user: ""
      },
      user: {}
    };
  },
  methods: {
    save() {
      this.loading = true;
      this.btntext = "Please wait";
      let options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      this.$http
        .post(`${this.$config.ROOT_API}/contact/add`, this.contact, options)
        .then(res => {
          this.loading = false;
          this.btntext = "Add new contact";
          if (res.data.success) {
            this.$toast.success(res.data.message);
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$toast.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.btntext = "Add new contact";
          this.$toast.error("Network error");
        });
    }
  },
  created() {
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    this.contact.user = this.user.email;
  }
};
</script>

<style></style>
