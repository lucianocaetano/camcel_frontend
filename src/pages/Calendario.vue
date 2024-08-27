<template>
    <q-page class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <q-btn @click="onPrev">Mes Anterior</q-btn>
          <q-btn @click="onToday">Hoy</q-btn>
          <q-btn @click="onNext">Siguiente Mes</q-btn>
          
          <div class="text-h6 q-mb-md">
            Fecha: {{ formattedDate }}
          </div>
          <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :date-type="dateType"
          
          :day-min-height="40"
          locale=es
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
          :day-style="getDayStyle"
        />
        </div>
        <div class="col-6">
          <q-card style="height: 50vh;">
            <q-card-section>
              <div class="text-h6">Actividades para {{ selectedDate }}</div>
              <q-list bordered padding>
                <q-item
                  v-for="(activity, index) in activities[selectedDate] || []"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section>{{ activity }}</q-item-section>
                  <q-item-section side>
                    <q-btn dense icon="delete" @click="removeActivity(index)" />
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="q-pa-sm">
                <q-input
                  v-model="newActivity"
                  label="Nueva Actividad"
                  outlined
                  dense
                  @keyup.enter="addActivity"
                />
                <q-btn
                  class="q-mt-sm"
                  label="Agregar Actividad"
                  color="primary"
                  @click="addActivity"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, computed, reactive } from 'vue';
  import { QCalendarMonth, today } from '@quasar/quasar-ui-qcalendar/src/index.js'
  import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
  import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
  import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import { event } from 'quasar';

  const selectedDate = ref(new Date().toISOString().slice(0, 10)); // Fecha actual en formato ISO (YYYY-MM-DD)
  const newActivity = ref('');
  const activities = reactive({});
  
  
  const formattedDate = selectedDate;


  
  function addActivity() {
    if (newActivity.value.trim()) {
      if (!activities[selectedDate.value]) {
        activities[selectedDate.value] = [];
      }
      activities[selectedDate.value].push(newActivity.value);
      newActivity.value = '';
     
    }
  }
  
  function removeActivity(index) {
    activities[selectedDate.value].splice(index, 1);
  }
  const calendar = ref(null);

const dateType = ref('square');

const onToday = () => {
  if (calendar.value) {
    calendar.value.moveToToday();
  }
};

const getDayStyle = (timestamp) => {
  if (activities[timestamp.date]) {
    return {
      backgroundColor: 'blue',
      color: 'white'
    };
  }
  return {};
};


const onPrev = () => {
  if (calendar.value) {
    calendar.value.prev();
  }
};

const onNext = () => {
  if (calendar.value) {
    calendar.value.next();
  }
};

const onMoved = (data) => {
  console.log('onMoved', data);
};

const onChange = (data) => {
  console.log('onChange', data);
};

const onClickDate = (data) => {
  console.log('onClickDate', data);
};

const onClickDay = (data) => {
  console.log('onClickDay', data);
};

const onClickWorkweek = (data) => {
  console.log('onClickWorkweek', data);
};

const onClickHeadDay = (data) => {
  console.log('onClickHeadDay', data);
};

const onClickHeadWorkweek = (data) => {
  console.log('onClickHeadWorkweek', data);
};
  </script>

<style scoped> 

.active-day {
  background-color: #42A5F5; /* Un tono de azul */
  color: white; /* Cambia el color del texto si es necesario */
  border-radius: 4px; /* Redondear los bordes si se desea */
}

</style>