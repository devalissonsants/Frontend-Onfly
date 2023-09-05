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
                <q-input dense outlined v-model="editedUser.name" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Senha</q-item-label>
                <q-input
                  v-model="editedUser.password"
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
import { ref, watch, computed } from 'vue';
import { api } from 'boot/axios';

export default {
  props: {
    userId: Number,
  },

  setup(props, { emit }) {
    const showModal = ref(false);
    const editedUser = ref(null);

    const key = computed(() => `edit-user-modal-${props.userId}`);

    watch(
      () => props.userId,
      async (newUserId) => {
        if (newUserId) {
          try {
            const response = await api.get('user/' + newUserId);
            editedUser.value = response.data;
            showModal.value = true;
          } catch (error) {
            console.error(error);
          }
        }
      }
    );

    const closeModal = () => {
      showModal.value = false;
    };

    const saveAndClose = async () => {
      try {
        const response = await api.put(
          'user/' + editedUser.value.id,
          editedUser.value
        );
        editedUser.value = response.data;
        emit('saved');
      } catch (error) {
        console.error(error);
      }
      closeModal();
    };

    return {
      showModal,
      editedUser,
      closeModal,
      saveAndClose,
      password: ref(''),
      isPwd: ref(true),
      key,
    };
  },
};
</script>
