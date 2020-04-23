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
          <a href="/">
            <h3>Edit contact</h3>
          </a>
        </div>
        <div class="page-links">
          <router-link to="/register"
            ><a class="active">Edit contact</a></router-link
          >
          <router-link to="/contact/show"><a>Go back</a></router-link>
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
export default {
  name: "EditContact",
  data() {
    return {
      sending: false,
      loading: true,
      btntext: "Save changes",
      contact: {
        name: "",
        email: "",
        phoneno: "",
        _id: ""
      },
      user: {}
    };
  },
  methods: {
    save() {
      let token = localStorage.getItem("token");
      this.loading = true;
      this.btntext = "Please wait";
      let options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      this.$http
        .post(`${this.$config.ROOT_API}/contact/update`, this.contact, options)
        .then(res => {
          this.loading = false;
          this.btntext = "Save changes";
          if (res.data.success) {
            this.$toast.success(res.data.message);
            localStorage.setItem("lastid", this.contact._id);
            this.$router.push({ name: "Showcontact" });
          } else {
            this.$toast.warning(res.data.message);
          }
        })
        .catch(err => {
          this.loading = false;
          this.btntext = "Save changes";
          this.$toast.error("Network error");
          console.log(err);
        });
    }
  },
  created() {
    let token = localStorage.getItem("token");
    let lastid = localStorage.getItem("lastid");
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    let data = {
      id: lastid
    };
    let options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    this.$http
      .post(`${this.$config.ROOT_API}/contact/fetch`, data, options)
      .then(res => {
        this.loading = false;
        if (res.data.success) {
          this.contact = res.data.contact;
          this.sync = true;
        } else {
          this.$toast.warning(res.data.message);
          this.$router.push({ name: "Dashboard" });
        }
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
        this.$toast.error("Network error!");
      });
  }
};
</script>

<style></style>
