  <template>
  <div class="q-pa-md">
    <div class="q-mb-md">
      <q-btn
        color="primary"
        label="Adicionar Novo"
        @click="openCreateModal"
      ></q-btn>
    </div>
    <q-table title="Usuários" :rows="users" :columns="columns" row-key="id">
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="openEditModal(props.row.id)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteRow(props.row.id)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <update-modal
      :userId="selectedUser"
      @saved="handleSaveUser"
      ref="editModal"
    />

    <create-modal @saved="handleSaveUser" ref="createModal" />
  </div>
</template>

  <script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import UpdateModal from 'src/components/user/UpdateModal.vue';
import CreateModal from 'src/components/user/CreateModal.vue';

export default {
  components: {
    UpdateModal,
    CreateModal,
  },

  setup() {
    const users = ref([]);
    const selectedUser = ref(null);
    const editModal = ref(null);
    const createModal = ref(null);

    const columns = [
      {
        name: 'id',
        field: 'id',
        label: 'ID',
        sortable: true,
        align: 'left',
      },
      {
        name: 'name',
        field: 'name',
        label: 'Nome',
        sortable: true,
        align: 'left',
      },
      {
        name: 'email',
        field: 'email',
        label: 'E-mail',
        sortable: true,
        align: 'left',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Ações',
        field: '',
      },
    ];

    onMounted(() => {
      getUsers();
    });

    const getUsers = async () => {
      try {
        const response = await api.get('user');
        users.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    const openEditModal = (userId) => {
      selectedUser.value = userId;
    };

    const openCreateModal = () => {
      createModal.value.openModal();
      console.log('Abriu o modal de criação');
    };

    const deleteRow = async (userId) => {
      try {
        await api.delete('user/' + userId);
        getUsers();
      } catch (error) {
        console.error(error);
      }
    };

    const handleSaveUser = () => {
      getUsers();
      createModal.value.closeModal();
      editModal.value.closeModal();
    };

    return {
      users,
      columns,
      openEditModal,
      deleteRow,
      handleSaveUser,
      editModal,
      selectedUser,
      openCreateModal,
      createModal,
    };
  },
};
</script>
