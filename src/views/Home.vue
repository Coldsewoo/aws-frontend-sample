<template>
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <div class="main">
          <p>
            <Strong>Frontend Main Page</Strong>
          </p>
          <v-btn flat :to="path">GO TO Message board</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      path: '/message',
    }
  },
}
</script>

<style scoped>
.main p {
  font-size: 25px;
}
</style>
