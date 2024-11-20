<template>
  <div class="login row justify-center">
    <div class="uno col-12 col-md-4 row justify-center items-center row">
      <q-card class="tarjeta col-10">
        <q-card-section class="formulario row justify-center items-center">
          <q-form @submit="onSubmit" @reset="onReset" class="col-10">
            <div class="q-pa-md q-gutter-sm">
              <div class="text-h4 text-center">Login</div>
            </div>
            <div class="q-pa-md">
              <q-input
                filled
                v-model="email"
                type="email"
                placeholder="Correo"
                :dense="dense"
              >
                <template v-slot:before>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input
                filled
                v-model="password"
                type="password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Contraseña"
                :dense="dense"
                style="padding-top: 10px"
              >
                <template v-slot:before>
                  <q-icon name="mdi-lock-outline" />
                </template>
              </q-input>
            </div>

            <div class="flex flex-center">
              <q-btn
                label="Entrar"
                type="submit"
                color="light-blue-14"
                class="boton_enviar"
                @click.prevent="enviar"
              />
            </div>
            <br>
            <div class="flex flex-center">
              <q-btn
                label="Registrarse"
                type="submit"
                color="primary"
                class="boton_enviar"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="imagen col-0 d-none d-md-block col-md-8"></div> <!-- Ocultar en pantallas pequeñas y col-md-8 en pantallas grandes -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const router = useRouter();
const userStore = useUserStore();

const ph = ref("");
const dense = ref(false);
const licencia = ref(false);
const text = ref("");

const email = ref("");
const password = ref("");
const isPwd = ref(true);

const enviar = async () => {
  api
    .post("auth/login", {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      userStore.setToken(response.data.access_token);
      userStore.setUser (response.data.user);
      userStore.setAuth(true);
      router.push("/");
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<style scoped>
.formulario {
  height: 100%;
}
.login {
  height: 100vh;
  width: inherit;
  background-color: rgb(255, 255, 255);
  position: fixed;
  left: 0;
  z-index: 1;
}
.uno {
  background-image: linear-gradient(
      rgba(18, 68, 139, 0.5),
      rgba(18, 68, 139, 0.5)
    ),
    url("/imagenes/Fondo2.jpeg");
  background-size: 100% 50%;
  height: 100%;
}
.tarjeta {
  height: 60%;
  backdrop-filter: blur(40px);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
  border-radius: 5%;
}
.imagen {
  background-image: url("/imagenes/Fondo1.jpeg");
  height: 100%;
}
.boton_enviar {
  width: 40%;
}
</style>