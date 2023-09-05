
<template>
  <q-layout view="hhh lpR fff">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Onfly - Despesas </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple to="/despesas">
            <q-item-section avatar>
              <q-icon name="paid" />
            </q-item-section>
            <q-item-section> Despesa </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/usuarios">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Usuário </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container> <router-view /> </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
