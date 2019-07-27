import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home'
import Message from '@/views/Message'


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
    },
  ],
});
