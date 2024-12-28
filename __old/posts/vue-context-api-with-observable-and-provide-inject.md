---
layout: post.njk
pageTitle: Vue context api with observable and provide inject
date: 2012-01-23
---

Context api is a mechanism to share state between components popularized by the reac team. Though Vue.js officially doesn't have anything like that(arguably we don't need it because of vuex) but we can have something similar using [Vue.observable](https://vuejs.org/v2/api/#Vue-observable) and [Provide, Inject](https://vuejs.org/v2/api/#provide-inject).

__Let's see how we can do that:__

Let's say we have a simple applicaion where we need to show user's avatar on header and we also have a settings page where we can update user's profile.

__App.vue__
```
<template>
  <div id="app">
    <Header/>
    <UserProfile/>
  </div>
</template>

<script>
import Vue from "vue";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
const user = Vue.observable({
  name: "Soikat",
  age: 32,
  avatar: "https://loremflickr.com/320/240",
  updateData(payload) {
    const { avatar, name, age } = payload;
    if (avatar) user.avatar = avatar;
    if (name) user.name = name;
    if (age) user.age = age;
  }
});
export default {
  name: "App",
  components: {
    UserProfile,
    Header
  },
  provide: {
    user
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
```
Here you can see we have created an object using Vue.observable and provided this for child components of `<App />` to consume.

__Header.vue__
```
<template>
  <nav class="navigation">
    {{user.name}}
    <img class="profile-image" width="50" height="50" :src="user.avatar">
  </nav>
</template>

<script>
export default {
  name: "Header",
  inject: ["user"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation {
  display: flex;
  background: #ccc;
  min-height: 70px;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
}
.profile-image {
  border-radius: 50%;
  border: 1px solid #fff;
  padding: 4px;
  margin-left: 10px;
}
</style>
```
Here we are injecting `user` object and also using that object to display user name and avatar.

__UserProfile.vue__
```
<template>
  <div>
    <div>
      Name:
      <input type="text" v-model="userName">
    </div>
    <div>
      Age:
      <input type="text" v-model="userAge">
    </div>
    <div>
      Avatar:
      <input type="text" v-model="userAvatar">
    </div>
    <div>
      <button @click="updateUser">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  inject: ["user"],
  data() {
    return {
      userName: "",
      userAge: "",
      userAvatar: ""
    };
  },
  created() {
    const { name, age, avatar } = this.user;
    this.userName = name;
    this.userAge = age;
    this.userAvatar = avatar;
  },
  methods: {
    updateUser() {
      const payload = {
        name: this.userName,
        age: this.userAge,
        avatar: this.userAvatar
      };
      const { updateData } = this.user;
      updateData(payload);
    }
  }
};
</script>
```
Here we can update the user object without mutating it directly.

Here is working example in action -
<iframe
     src="https://codesandbox.io/embed/sweet-sanne-0hpcj?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="sweet-sanne-0hpcj"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

What we have achieved could have easily be done using vuex, and I would recommend to use vuex for larger applications, for smaller applications this patten can be used.
