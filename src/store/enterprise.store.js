import { defineStore } from 'pinia';

export const useEnterpriseStore = defineStore('enterprise', {
  state: () => ({
    enterprises: JSON.parse(localStorage.getItem("enterprises")) || [],
  }),
  actions: {
    setEnterprises(enterprises) {
      this.enterprises = enterprises
      localStorage.setItem("enterprise", JSON.stringify(this.enterprises))
    },
    removeEnterprise(slug) {
      this.enterprises = this.enterprises.filter((item) => item.slug !== slug)
      localStorage.setItem("enterprise", JSON.stringify(this.enterprises))
    },
    addEnterprise(enterprise) {
      this.enterprises.push(enterprise)
      localStorage.setItem("enterprise", JSON.stringify(this.enterprises))
    }
  },
})
