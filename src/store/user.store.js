import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem("token"),
    auth: localStorage.getItem("auth"),
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
        this.user = null
      }
      this.auth = auth;
    },
    setUser(user) {
      localStorage.setItem("user", user)
      this.user = user;
    },  
    clearSession() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.token = null;
      this.user = null;
    },
    logout() {
      this.setAuth(false); // Esto también llamará a clearSession() si auth es falso
    }  
  },
});