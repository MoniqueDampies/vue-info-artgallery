import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    user: null,
    art: [],
    singleArt: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setArt(state, art) {
      state.art = art;
    },
    setArt(state, art) {
      state.art = art;
    },
    setSingleArt(state, singleArt) {
      state.singleArt = singleArt;
    },
  },
  actions: {
    // Login function
    login: async (context, payload) => {
      const response = await fetch(
        `http://localhost:3000/Users?email=${payload.email}&password=${payload.password}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      // Checking if user is not found
      if (response.length === 0) {
        alert("Error: Email or password is incorrect");
      } else {
        // Check if role is Admin route to admin page
        const isAdmin = response[0].isAdmin;
        if (isAdmin === true) {
          context.commit("setUser", response[0]);
          router.push({ name: "admin" });
        } else {
          // If user is not admin push to home
          context.commit("setUser", response[0]);
          router.push({ name: "home" });
        }
      }
    },
    // Register function
    register: async (context, payload) => {
      const response = await fetch(
        `http://localhost:3000/Users?email=${payload.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      // Checking if email is found and if found through out error
      if (response.length !== 0) {
        alert("Email already in user");
      } else {
        fetch(`http://localhost:3000/Users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: payload.full_name,
            email: payload.email,
            password: payload.password,
            isAdmin: false,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            context.commit("setUser", data[0]);
            router.push({ name: "home" });
          });
      }
    },
    logout: async (context) => {
      context.commit("setUser", null);
      router.push("/login");
    },
    // Fetch Art function
    getArt: async (context) => {
      const response = await fetch(`http://localhost:3000/Many`)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      // Check if data is empty
      if (response.length == 0) {
        alert("Server down");
      } else {
        context.commit("setArt", response);
      }
    },
    getSingleArt: async (context, payload) => {
      // console.log(payload);
      let response = await fetch(`http://localhost:3000/Many/${payload.id}`)
        .then((res) => res.json())
        .then((data) => {
          // Checking if art is found
          if (!data) {
            return false;
          } else {
            return data;
          }
        });
      // Check if we get art
      if (response === false) {
        alert("Art not found");
      } else {
        context.commit("setSingleArt", response);
        return response;
      }
    },
    editArt: async (context, payload) => {
      console.log(payload);
      const { id, title, artist, description, size, price, singleArt } =
        payload;
      if (
        title === "" &&
        artist === "" &&
        description === "" &&
        size === "" &&
        price === ""
      ) {
        console.log("no changes");
      } else {
      }
    },
  },
  modules: {},
});
