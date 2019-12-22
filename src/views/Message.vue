<template>
  <v-container>
    <v-layout align-center wrap>
      <v-flex xs8 offset-xs2>
        <v-form ref="form" :lazy-validation="lazy">
          <v-text-field
            v-model="username"
            :counter="15"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="message"
            label="Message"
            required
          ></v-text-field>
          <v-btn @click.prevent="submit">Submit</v-btn>
        </v-form>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <p class="msg-title">Message Board</p>
        <v-list dense>
          <template v-for="(post, index) in posts">
            <v-list-tile
              :key="post._id"
              :class="{ odd: index % 2 === 1 }"
              ripple
              class="listItem"
            >
              <v-list-tile-action class="username">
                <v-list-tile-action-text>
                  {{ post.username }}
                </v-list-tile-action-text>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="message">{{
                  post.message
                }}</v-list-tile-title>
              </v-list-tile-content>
              <v-btn flat icon @click="toggleEdit(post._id)"
                ><v-icon color="blue">edit</v-icon></v-btn
              >
              <v-btn flat icon @click="deleteMessage(post._id)"
                ><v-icon color="red">delete</v-icon></v-btn
              >
            </v-list-tile>
            <div v-if="post.edit" :key="post._id" class="editor">
              <v-form :key="post._id" ref="form" :lazy-validation="lazy">
                <v-text-field
                  v-model="edit[post._id].username"
                  :counter="15"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="edit[post._id].message"
                  label="Message"
                  required
                ></v-text-field>
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

export default {
  data: () => ({
    username: '',
    message: '',
    posts: [],
    edit: {},
  }),
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.posts = this.$store.state.posts
    },
    submit() {
      const payload = {
        username: this.username,
        message: this.message,
      }
      this.$store.commit('newPost', payload)
      this.username = ''
      this.message = ''
      this.getArticles()
    },
    deleteMessage(_id) {
      this.$store.commit('deleteMessage', _id)
      this.getArticles()
    },
    toggleEdit(_id) {
      const post = this.posts.filter(x => x._id === _id)[0]
      post.edit = true
      this.edit[_id] = {
        username: post.username,
        message: post.message,
      }
    },
    editMessage(_id) {
      const payload = {
        ...this.edit[_id],
        _id,
      }
      this.$store.commit('editMessage', payload)
      this.getArticles()
      const index = this.posts.findIndex(x => x._id === _id)
      const item = this.posts.find(x => x._id === _id)
      this.$set(this.posts, index, item)
    },
  },
};
</script>
<style scoped>
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
