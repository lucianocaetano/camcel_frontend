<template>
    <div class="login row justify-center">
      <div class="uno col-4 row justify-center items-center row">
          <q-card class="tarjeta col-10 ">
          <q-card-section class="formulario row justify-center items-center">
              <q-form @submit="onSubmit" @reset="onReset" class="col-10">
               
            
                <q-input bottom-slots filled v-model="email" suffix="@gmail.com" label="Correo" counter maxlength="35" :dense="dense" ></q-input>
                <q-input bottom-slots counter maxlength="20" v-model="password" label="Contraseña" filled :type="isPwd ? 'password' : 'text'" ></q-input>
  
              <q-toggle v-model="licencia" label="Acepto los términos de licencia" class="q-mb-md"/>
      
              <div class="flex flex-center">
                  <q-btn label="Enviar" type="submit" color="primary" class="boton_enviar" @click.prevent="enviar"/>
              
              </div>
              </q-form>
          </q-card-section>
          </q-card>
      </div>
      <div class="imagen col-8">
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
 
  import { useUserStore } from '../store/user.store'
 
  import { useRouter } from 'vue-router'
  import { api } from 'src/boot/axios';
 
  
  
  const domainOptions = ['gmail.com', 'yahoo.com', 'outlook.com'];
  const router = useRouter()
  const userStore = useUserStore()

 
  const licencia = ref(false)
  const text= ref("")
  
  const email = ref("")
  const suffix = ref("@gmail.com")
  const password = ref("")
  
  const isPwd = ref(true)
  const dense = ref(false)
  
  const enviar = async () =>{
    api.post('auth/login', {
      email: email.value + suffix.value,
      password:password.value 
    })
    .then(function (response) {
      userStore.setToken(response.data.access_token);
      userStore.setUser(response.data.user);
      userStore.setAuth(true)

      router.push("/")
    })
    .catch(function (error) {
      console.log(error);
    });
  }
      
         
  
  </script>
  
  <style scoped>
  .formulario{
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
  .uno{
      background-image: linear-gradient(rgba(18, 68, 139, 0.5), rgba(18, 68, 139, 0.5)), url("/imagenes/mensaje.png");
      background-size: 100% 50%;
      height: 100%;
  }
  .tarjeta {
      height: 50%;
       backdrop-filter: blur(40px);
       background-color: rgba(255, 255, 255, 0.3);
       box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
       border-radius: 5%;
  }
  
  .imagen{
     background-image: url("/imagenes/fondo.png");
      height: 100%;
  }
  .boton_enviar{
      width: 40%;
  }
  </style>
  