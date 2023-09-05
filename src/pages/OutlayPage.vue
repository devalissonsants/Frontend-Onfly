<template>
  <div class="q-pa-md">
    <div class="q-mb-md">
      <q-btn
        color="primary"
        label="Adicionar Novo"
        @click="openCreateModal"
      ></q-btn>
    </div>
    <q-table title="Despesas" :rows="outlays" :columns="columns" row-key="id">
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

    <update-modal :id="selectedOutlay" @saved="handleSave" ref="editModal" />

    <create-modal @saved="handleSave" ref="createModal" />
  </div>
</template>

  <script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import UpdateModal from 'src/components/outlay/UpdateModel.vue';
import CreateModal from 'src/components/outlay/CreateModel.vue';

export default {
  components: {
    UpdateModal,
    CreateModal,
  },

  setup() {
    const outlays = ref([]);
    const selectedOutlay = ref(null);
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
        name: 'description',
        field: 'description',
        label: 'Descrição',
        sortable: true,
        align: 'left',
      },
      {
        name: 'outlay_date',
        field: 'outlay_date',
        label: 'Data da despesa',
        sortable: true,
        align: 'left',
        format: (val) => {
          const dateParts = val.split('-');
          if (dateParts.length === 3) {
            const [year, month, day] = dateParts;
            return `${day}/${month}/${year}`;
          }
          return val;
        },
      },
      {
        name: 'amount',
        field: 'amount',
        label: 'Valor ',
        sortable: true,
        align: 'left',
        format: (val) => `R$ ${val}`,
      },
      {
        name: 'user',
        field: (row) => row.user.name,
        label: 'Responsável',
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
      getOutlays();
    });

    const getOutlays = async () => {
      try {
        const response = await api.get('outlay');
        outlays.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    const openEditModal = (id) => {
      selectedOutlay.value = id;
    };

    const openCreateModal = () => {
      createModal.value.openModal();
    };

    const deleteRow = async (id) => {
      try {
        await api.delete('outlay/' + id);
        getUsers();
      } catch (error) {
        console.error(error);
      }
    };

    const handleSave = () => {
      getOutlays();
      createModal.value.closeModal();
      editModal.value.closeModal();
    };

    return {
      outlays,
      columns,
      openEditModal,
      deleteRow,
      handleSave,
      editModal,
      selectedOutlay,
      openCreateModal,
      createModal,
    };
  },
};
</script>
