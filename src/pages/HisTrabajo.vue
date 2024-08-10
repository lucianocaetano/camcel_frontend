<template>
    <div class="" style="
    width: 100%;
    height: 100%;;
">
      <q-splitter
        v-model="splitterModel"
        style="height: max-content; 
               padding: 100px;
               position: relative;
               z-index: auto;
               width: 100% !important;"
      >
        <template v-slot:before>
          <div class="q-pa-md" style="width: 100%;
    height: 100%;">
            <q-date
              v-model="selectedDate"
              :events="events"
              event-color="orange"
            />
          </div>
        </template>
  
        <template v-slot:after>
          <q-tab-panels
            v-model="selectedDate"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="2019/02/01">
              <div class="text-h4 q-mb-md">2019/02/01</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="2024/07/27">
              <div class="text-h4 q-mb-md">2024/07/27</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="2019/02/06">
              <div class="text-h4 q-mb-md">2019/02/06</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Definir variables reactivas
  const splitterModel = ref(50);
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD" format
  const selectedDate = ref(today);

  const events = ref([
    { date: '2019/02/01', color: 'orange' },
    { date: '2024/07/', color: 'orange' },
    { date: '2019/02/06', color: 'orange' }
  ]);
  </script>
  
  <style scoped>
  .q-splitter__panel{
    z-index: 2;
    width: 100%;
  }
  .q-splitter__panel{
    width: 100%;
  } 
  .q-splitter__before{
    width: 100%;
  }
  </style>
  