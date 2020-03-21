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
          <a>
            <h3 class="text-capitalize">{{ contact.name }}</h3>
          </a>
        </div>
        <div class="page-links" v-show="user">
          <router-link to="/contact/show"
            ><a class="active text-capitalize">{{
              contact.name
            }}</a></router-link
          ><router-link to="/dashboard">
            <a>Go back</a>
          </router-link>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="item-center">
              <img src="/images/avatar.png" alt="avatar" style="width: 100%" />
            </div>

            <br />
          </div>
          <div class="col-md-8">
            <div class="font-weight-bold mt-2">
              <p class="text-capitalize font-weight-bold">
                Name: {{ contact.name }}
              </p>
              <p v-show="contact.phoneno" class="font-weight-bold">
                Phone:
                <a
                  v-show="contact.phoneno"
                  class="text-dark font-weight-bold"
                  :href="`tel:${contact.phoneno}`"
                >
                  {{ contact.phoneno }}</a
                >
              </p>
              <p v-show="contact.email" class="font-weight-bold">
                Email:
                <a
                  v-show="contact.email"
                  class="text-dark font-weight-bold"
                  :href="`mailto:${contact.phoneno}`"
                >
                  {{ contact.email }}</a
                >
              </p>

              <p>
                <a
                  href="/contact/edit"
                  class="btn btn-sm rounded-0 btn-dark"
                  @click.prevent="edit(contact._id)"
                >
                  Edit
                </a>
                <a
                  href="/contact/remove"
                  class="btn btn-sm rounded-0 btn-danger"
                  @click.prevent="removeContact(contact._id)"
                >
                  Delete
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Showcontact",
  data() {
    return {
      sync: false,
      loading: true,
      deleteid: "",
      user: {},
      contact: {}
    };
  },
  methods: {
    edit(id) {
      localStorage.setItem("lastid", id);
      this.$router.push({ name: "Editcontact" });
    },
    removeContact(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.loading = true;
          let token = localStorage.getItem("token");
          let data = {
            id: id
          };
          let options = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          this.$http
            .post(`${this.$config.ROOT_API}/contact/delete`, data, options)
            .then(res => {
              if (res.data.success) {
                this.$swal("Deleted!", res.data.message, "success");
                this.$router.push({ name: "Dashboard" });
              } else {
                this.$swal("Oops", res.data.message, "warning");
              }
            })
            .catch(err => {
              console.log(err);
              this.$toast.error("Network error!");
            });
        }
      });

    }
  },

  created() {
    let lastid = localStorage.getItem("lastid");
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
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
