<template>
  <q-dialog v-model="showModal">
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <q-btn
          round
          flat
          dense
          icon="close"
          class="float-right"
          color="grey-8"
          v-close-popup
        ></q-btn>
        <div class="text-h6">Atualizar dados do usuário</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Nome do Usuário</q-item-label>
                <q-input dense outlined v-model="name" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">E-mail</q-item-label>
                <q-input dense outlined v-model="email" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Senha</q-item-label>
                <q-input
                  v-model="password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="warning"
            dense
            v-close-popup
          ></q-btn>
          <q-btn
            flat
            type="submit"
            label="Salvar"
            color="primary"
            dense
            v-close-popup
            @click="saveAndClose"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  setup(props, { emit }) {
    const showModal = ref(false);
    const email = ref('');
    const password = ref('');
    const name = ref('');

    const closeModal = () => {
      showModal.value = false;
    };

    const saveAndClose = async () => {
      try {
        await api.post('user/', {
          email: email.value,
          password: password.value,
          name: name.value,
        });
        emit('saved');
        email.value = '';
        password.value = '';
        name.value = '';
      } catch (error) {
        email.value = '';
        password.value = '';
        name.value = '';
        console.error(error);
      }
      closeModal();
    };

    const openModal = () => {
      showModal.value = true;
    };

    return {
      closeModal,
      saveAndClose,
      openModal,
      email,
      password,
      name,
      isPwd: ref(true),
      showModal,
    };
  },
};
</script>
