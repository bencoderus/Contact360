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
            <h3>Dashboard</h3>
            <small>
              Hi, {{ user.name }}
              <a
                href="/logout"
                @click.prevent="logout()"
                class="font-weight-bold"
                >Logout</a
              >
            </small>
          </a>
        </div>
        <div class="page-links" v-show="user">
          <router-link to="/dashboard"
            ><a class="active">{{
              countcontact(contacts.length)
            }}</a></router-link
          ><router-link to="/contact/new">
            <a>New contact</a>
          </router-link>
        </div>
        <div class="form-group">
          <input
            type="search"
            placeholder="Search contacts"
            v-model="query"
            class="form-control rounded-0"
          />
        </div>

        <div class="scrollable">
          <div class="contacts" v-for="contact in mycontacts" :key="contact.id">
            <a
              href="/contact/show"
              @click.prevent="showcontact(contact._id)"
              class="row contact"
            >
              <div class="col-2 col-md-1">
                <span>
                  <avatar :username="contact.name"></avatar>
                </span>
              </div>
              <div class="col-10 col-md-11 text-capitalize">
                <p class="font-weight-bold contact-title">{{ contact.name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "Dashboard",
  components: {
    Avatar
  },
  data() {
    return {
      loading: true,
      query: "",
      sync: false,
      user: {},
      contacts: []
    };
  },
  methods: {
    showcontact(id) {
      localStorage.setItem("lastid", id);
      this.$router.push({ name: "Showcontact" });
    },
    countcontact(val) {
      if (val > 1) {
        return `${val} contacts`;
      } else {
        return `${val} contact`;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Home" });
    }
  },

  created() {
    document.title = "My contacts";
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    this.user = JSON.parse(user);
    let data = {
      user: this.user.email
    };
    let options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    this.$http
      .post(`${this.$config.ROOT_API}/contact/all`, data, options)
      .then(res => {
        this.loading = false;
        this.contacts = res.data.contacts;
      })
      .catch(err => {
        this.loading = false;
        console.log(err.response);
        if (err.response.status == 401) {
          this.logout();
          this.$toast.warning("Please login first!");
        }
      });
  },
  computed: {
    mycontacts() {
      let query = this.query.toLowerCase();
      return this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(query);
      });
    }
  }
};
</script>

<style></style>
