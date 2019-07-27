<template>
  <v-container>
    <v-layout align-center wrap>
      <v-flex xs8 offset-xs2>
        <v-form ref="form" :lazy-validation="lazy">
          <v-text-field v-model="username" :counter="15" label="Name" required></v-text-field>
          <v-text-field v-model="message" label="Message" required></v-text-field>
          <v-btn @click.prevent="submit">Submit</v-btn>
        </v-form>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <p class="msg-title">Message Board</p>
        <v-list dense>
          <template v-for="(post, index) in posts">
            <v-list-tile :key="post._id" :class="{ odd: index % 2 === 1 }" ripple class="listItem">
              <v-list-tile-action class="username">
                <v-list-tile-action-text>
                  {{
                  post.username
                  }}
                </v-list-tile-action-text>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="message">{{ post.message }}</v-list-tile-title>
              </v-list-tile-content>
              <v-btn flat icon @click="toggleEdit(post._id)"><v-icon color="blue">edit</v-icon></v-btn>
              <v-btn flat icon @click="deleteMessage(post._id)"><v-icon color="red">delete</v-icon></v-btn>
            </v-list-tile>
            <div v-if="post.edit" :key="post._id" class="editor">
              <v-form :key="post._id" ref="form" :lazy-validation="lazy">
                <v-text-field v-model="edit.username" :counter="15" label="Name" required></v-text-field>
                <v-text-field v-model="edit.message" label="Message" required></v-text-field>
                <v-btn @click.prevent="editMessage(post._id)">Edit</v-btn>
              </v-form>
            </div>
            <v-divider v-if="index + 1 < posts.length" :key="index" />
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

const API_URL = 'https://coldsewoo-aws-example.cf'


export default {
  data: () => ({
    username: '',
    message: '',
    posts: [],
    edit: {
      username: '',
      message: '',
    },
  }),
  mounted() {
    this.getArticles()
  },
  watch: {
    posts() { },
  },
  methods: {
    async submit() {
      const payload = {
        username: this.username,
        message: this.message,
      }
      try {
        const result = await axios({
          url: `${API_URL}/message`,
          method: 'POST',
          data: payload,
          headers: {
            'Content-type': 'application/json',
          },
        })
        this.username = ''
        this.message = ''
        this.getArticles()
      } catch (err) {
        console.log(err)
      }
    },
    async getArticles() {
      try {
        const result = await axios({
          url: `${API_URL}/message`,
          method: 'GET',
        })
        for (const index in result.data) {
          result.data[index].edit = false
        }
        this.posts = result.data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteMessage(_id) {
      try {
        const result = await axios({
          url: `${API_URL}/message/${_id}`,
          method: 'DELETE',
        })
        this.getArticles()
      } catch (err) {
        console.log(err)
      }
    },
    toggleEdit(_id) {
      const post = this.posts.filter(e => e._id === _id)[0]
      this.edit.message = post.message;
      this.edit.username = post.username;
      post.edit = true
    },
    async editMessage(_id) {
      const payload = this.edit;
      try {
        const result = await axios({
          url: `${API_URL}/message/${_id}`,
          method: 'PUT',
          data: payload,
          headers: {
            'Content-type': 'application/json',
          },
        })
        this.getArticles()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .username span {
    font-size: 15px !important;
    width: 100px !important;
    text-align: left;
  }

  .message {
    padding-left: 10px;
    font-size: 18px;
  }

  .editor {
    border: solid 1px gray;
    padding: 8px;
    border-radius: 1%;
  }

  .msg-title {
    font-size: 35px;
    margin-top: 40px;
  }


</style>
