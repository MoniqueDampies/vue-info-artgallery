<template>
  <div v-if="Many" class="painting">
    <div
      class="card p-3 m-3 mx-auto"
      style="width: 30rem"
      v-if="!User || (User && User.isAdmin === false)"
    >
      <img :src="Many.img_url" class="card-img-top" alt="..." />
      <div class="card-body">
        <!-- <p>ID: {{ id }}</p> -->
        <h1 class="card-title">{{ Many.title }}</h1>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Artist name: <b>{{ Many.artist }}</b>
          </li>
          <li class="list-group-item">
            Description: <br />
            {{ Many.description }}
          </li>
          <li class="list-group-item">Dimensions: {{ Many.size }}</li>
          <li class="list-group-item">Medium: {{}}</li>
          <li class="list-group-item">Price: {{ Many.price }}</li>
        </ul>
        <div class="card-body">
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>

    <!-- Editing if role is admin -->
    <div
      class="card p-3 m-3 mx-auto"
      style="width: 30rem"
      v-if="User && User.isAdmin === true"
    >
      <img :src="Many.img_url" class="card-img-top" alt="..." />
      <div class="card-body">
        <p>ID: {{ Many.id }}</p>
        <label for="title" class="form-label">Title </label>
        <input
          class="form-control"
          type="text"
          :placeholder="Many.title"
          v-model="title"
          name="title"
        />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <label for="artist" class="form-label">Artist name </label>
            <input
              class="form-control"
              type="text"
              :placeholder="Many.artist"
              v-model="artist"
              name="artist"
            />
          </li>
          <li class="list-group-item">
            <label for="description" class="form-label">Description </label>
            <textarea
              class=""
              id="description"
              rows="10"
              :placeholder="Many.description"
              style="width: 400px"
              v-model="description"
            ></textarea>
          </li>
          <li class="list-group-item">
            <label for="size" class="form-label">Dimensions</label>
            <input
              class="form-control"
              type="text"
              :placeholder="Many.size"
              v-model="size"
              name="size"
            />
          </li>
          <li class="list-group-item">
            <label for="price" class="form-label">Price</label>
            <input
              class="form-control"
              type="text"
              :placeholder="Many.price"
              v-model="price"
              name="price"
            />
          </li>
        </ul>
        <div class="card-body">
          <button class="btn btn-primary">Add to Cart</button>
          <button
            class="btn btn-primary"
            v-if="
              title !== '' ||
              artist !== '' ||
              description !== '' ||
              size !== '' ||
              price !== ''
            "
            @click="editArt"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>Please Try Again Later...</div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      Many: [],
      title: "",
      artist: "",
      description: "",
      size: "",
      price: "",
    };
  },
  computed: {
    User() {
      return this.$store.state.user;
    },
  },
  async mounted() {
    let response = await this.$store.dispatch("getSingleArt", { id: this.id });
    this.Many = response;
  },
  methods: {
    editArt() {
      this.$store.dispatch("editArt", {
        singleArt: this.Many,
        title: this.title,
        artist: this.artist,
        description: this.description,
        size: this.size,
        price: this.price,
      });
    },
  },
};
</script>

<style scoped>
.form-label {
  text-transform: uppercase;
}
</style>
