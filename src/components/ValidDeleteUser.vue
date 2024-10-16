<template>
  </template>

<script>
import { toRef } from "vue";

export default {
  show: {
    type: Boolean,
    required: true,
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");

    const handleCloseValidMenu = () => {
      emit("handleDeleteUser");
      emit("handleCloseValidMenu");
    };

    return {
      handleCloseValidMenu,
      show,
    };
  },
};
</script>
