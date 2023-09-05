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
        <div class="text-h6">Atualizar dados da despesa</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Descrição</q-item-label>
                <q-input dense outlined v-model="data.description" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Data da Despesa</q-item-label>
                <q-input
                  dense
                  outlined
                  v-model="data.outlay_date"
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
                  v-model="data.amount"
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
import { ref, watch, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  props: {
    id: Number,
  },

  setup(props, { emit }) {
    const showModal = ref(false);
    const data = ref(null);
    const optionUser = ref([]);
    const allOptionUserData = ref([]);
    const selectedUser = ref(null);

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

    watch(
      () => props.id,
      async (newId) => {
        if (newId) {
          try {
            const response = await api.get('outlay/' + newId);
            data.value = response.data;
            showModal.value = true;
          } catch (error) {
            console.error(error);
          }
        }
      }
    );

    onMounted(() => {
      getUsers();
    });

    const closeModal = () => {
      showModal.value = false;
    };

    const saveAndClose = async () => {
      try {
        data.value.user_id = selectedUser.value.value;
        const response = await api.put('outlay/' + data.value.id, data.value);
        data.value = response.data;
        emit('saved');
      } catch (error) {
        console.error(error);
      }
      closeModal();
    };

    return {
      model: ref(null),
      showModal,
      data,
      closeModal,
      saveAndClose,
      password: ref(''),
      isPwd: ref(true),
      selectedUser,
      optionUser,
      allOptionUserData,
    };
  },
};
</script>
