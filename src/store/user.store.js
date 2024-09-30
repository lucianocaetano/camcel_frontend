import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem("token"),
    auth: localStorage.getItem("auth")? true: false,
    user: localStorage.getItem("user"),
  }),
  getters: {
    getToken() {
      return this.token
    },
    getUser(){
      return this.user
    },
    getAuth(){
      return this.auth
    }
  },
  actions: {
    setToken(token) {
      localStorage.setItem("token", token)
      this.token = token;
    },
    setAuth(auth) {
      localStorage.setItem("auth", auth)
      if(!auth){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.token = null
        this.user = []
      }
      this.auth = auth;
    },
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user))
      this.user = user;
    },
  },
});
