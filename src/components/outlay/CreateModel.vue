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
        <div class="text-h6">Criar uma nova despesa</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Descrição</q-item-label>
                <q-input dense outlined v-model="description" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Data da Despesa</q-item-label>
                <q-input
                  dense
                  outlined
                  v-model="outlayDate"
                  type="date"
                  hint="Somente data anterior à atual."
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Valor</q-item-label>
                <q-input
                  dense
                  outlined
                  v-model="amount"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  input-class="text-left"
                ></q-input>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Usuário</q-item-label>
                <q-select
                  filled
                  dense
                  outlined
                  v-model="selectedUser"
                  use-input
                  input-debounce="0"
                  label="Selecione um usuário"
                  :options="optionUser"
                  behavior="menu"
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Selecione um usuário',
                  ]"
                >
                </q-select>
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
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  setup(props, { emit }) {
    const showModal = ref(false);
    const description = ref('');
    const outlayDate = ref('');
    const amount = ref('');
    const optionUser = ref([]);
    const allOptionUserData = ref([]);
    const selectedUser = ref(null);

    const closeModal = () => {
      showModal.value = false;
    };

    const getUsers = async () => {
      try {
        const userResponse = await api.get('user');
        allOptionUserData.value = userResponse.data.data;

        optionUser.value = allOptionUserData.value.map((user) => ({
          label: user.name,
          value: user.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const saveAndClose = async () => {
      try {
        await api.post('outlay/', {
          description: description.value,
          outlay_date: outlayDate.value,
          amount: amount.value,
          user_id: selectedUser.value.value,
        });
        emit('saved');
      } catch (error) {
        console.error(error);
      }

      description.value = '';
      outlayDate.value = '';
      amount.value = '';
      closeModal();
    };

    const openModal = () => {
      showModal.value = true;
    };

    onMounted(() => {
      getUsers();
    });

    return {
      closeModal,
      saveAndClose,
      openModal,
      description,
      outlayDate,
      amount,
      isPwd: ref(true),
      showModal,
      selectedUser,
      optionUser,
      allOptionUserData,
    };
  },
};
</script>
