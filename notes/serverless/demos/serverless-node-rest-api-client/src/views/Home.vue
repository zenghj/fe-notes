<template>
  <div class="home">
    <div class="create section">
      title: <input type="text" v-model="title"><br/>
      author: <input type="text" v-model="author"><br/>
      pages: <input type="text" v-model="pages"><br/>
      <button @click="create">create</button><br/>
    </div>
    <button @click="listBooks">list</button>
    
    <div class="list section">
      <ul>
        <li v-for="item in list" :key="item.id">{{item.title}}/{{item.author}}<button @click="deleteItem(item.id)">delete</button></li>
      </ul>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      list: [],
      title: '',
      author: '',
      pages: ''
    };
  },
  mounted() {
    this.listBooks()
  },
  methods: {
    create() {
      return axios.post("/development/books", {
        title: this.title,
        author: this.author,
        pages: this.pages
      }).then(() => {
        alert('create success')
        this.listBooks().then(() => {
          this.title = ''
          this.author = ''
          this.pages = ''
        })
      });
    },
    listBooks() {
      return axios.get("/development/books").then(({ data }) => {
        this.list = data;
        // alert('list success')
      });
    },
    deleteItem(id) {
      return axios.delete(`/development/books/${id}`).then(() => {
        alert('delete success')
      }).then(() => {
        this.listBooks()
      });
    }
  },
  components: {}
};
</script>
<style scoped>
.section {
  margin-bottom: 3em;
}  
</style>
