<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <h1>MOSHi</h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <!-- If No User is logged in -->
            <!-- <div v-if="!User"></div> -->
            <li class="nav-item ps-4">
              <router-link to="/">Home</router-link>
            </li>
            <li class="nav-item ps-4">
              <router-link to="/about">About</router-link>
            </li>
            <li class="nav-item ps-4">
              <router-link to="/shop">Gallery</router-link>
            </li>
            <li class="nav-item ps-4">
              <router-link to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item ps-4">
              <router-link to="/admin" v-if="User && User.isAdmin === true"
                >Admin</router-link
              >
            </li>
            <div class="login ps-5">
              <button v-if="!User">Login</button>
              <button v-if="!User">Signup</button>
              <button v-if="User" @click="logout">
                {{ User.full_name }} Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    User() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
button {
  font-size: 20px;
  width: 120px;
  border-radius: 5px;
  font-family: "Crimson Text", serif;
  background-color: transparent;
  color: white;
  border-color: white;
  outline: none;
}
button:hover {
  background-color: mediumslateblue;
}
nav {
  background-color: silver;
}
.navbar {
  font-family: "Crimson Text", serif;
}
h1:hover {
  color: mediumslateblue;
  transform: rotateY(45deg);
}
h1 {
  list-style: none;
  float: right;
  padding-left: 20px;
  transition: 2s;
  color: black;
}
h1:hover {
  transform: rotateY(360deg);
}
</style>
