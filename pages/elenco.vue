<template>
  <div class="min-h-screen bg-[#121212] p-4 md:p-6">
    <div class="flex justify-between items-start mb-8">
      <h1 class="text-2xl md:text-3xl font-semibold text-white mb-2">Elenco</h1>
    </div>

    <div class="bg-[#1a1919] rounded-lg shadow-sm border border-[#16A249] p-6 mb-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white">Jogadores</h2>
        <button
          @click="showAddPlayerModal = true"
          class="bg-[#16A249] hover:bg-[#0f7a36] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusCircle class="w-5 h-5" />
          Adicionar Jogador
        </button>
      </div>

      <div v-if="jogadores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CardJogador
          v-for="jogador in jogadores"
          :key="jogador.id"
          :jogador="jogador"
          @edit="editPlayer"
          @delete="confirmDeletePlayer"
        />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-12 text-center">
        <Users class="w-16 h-16 text-gray-600 mb-4" />
        <h3 class="text-white text-lg font-medium mb-2">Nenhum jogador no elenco</h3>
        <p class="text-gray-400 mb-6">Adicione jogadores ao seu elenco para visualizá-los aqui.</p>
        <button
          @click="showAddPlayerModal = true"
          class="bg-[#16A249] hover:bg-[#0f7a36] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusCircle class="w-5 h-5" />
          Adicionar Jogador
        </button>
      </div>
    </div>

    <AdicionarJogador
      :is-open="showAddPlayerModal"
      @close="closeAddPlayerModal"
      @save="createPlayer"
    />
    <EditarJogador
      :is-open="showEditPlayerModal"
      :player-data="currentPlayer"
      @close="closeEditPlayerModal"
      @save="updatePlayerData"
    />
    <Confirmacao
      :is-open="showDeleteModal"
      title="Excluir Jogador"
      message="Tem certeza que deseja excluir este jogador do elenco? Esta ação não pode ser desfeita."
      @confirm="deletePlayer"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { Users, PlusCircle } from 'lucide-vue-next';
import CardJogador from '~/components/elenco/CardJogador.vue';
import AdicionarJogador from '~/components/elenco/AdicionarJogador.vue';
import EditarJogador from '~/components/elenco/EditarJogador.vue';
import Confirmacao from '~/components/elenco/Confirmar.vue';
import { toast } from 'vue-sonner';
import { useRuntimeConfig } from '#imports';

definePageMeta({ layout: 'default', middleware: 'auth' });

const config = useRuntimeConfig();
const apiUrl = config.public.API_URL;
const auth = useAuthStore();

const jogadores = ref([]);
const loading = ref(false);
const error = ref(null);

const showAddPlayerModal = ref(false);
const showEditPlayerModal = ref(false);
const showDeleteModal = ref(false);

const currentPlayer = ref({});
const playerToDelete = ref(null);

onMounted(async () => {
  if (auth.token && !auth.user) {
    await auth.fetchUser();
  }
  if (auth.user) {
    fetchPlayers();
  }
});

const fetchPlayers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = auth.token;
    const res = await fetch(`${apiUrl}/api/jogadores/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar jogadores.');
    jogadores.value = await res.json();
  } catch (err) {
    error.value = 'Erro ao carregar jogadores.';
    toast.error('Erro ao carregar jogadores.');
  } finally {
    loading.value = false;
  }
};

const createPlayer = async (playerData) => {
  loading.value = true;
  try {
    const token = auth.token;

    const playerDataWithElenco = {
      ...playerData,
      elenco: auth.user.elenco_id
    };

    if (!playerDataWithElenco.elenco) {
      toast.error("ID do elenco não encontrado. Faça o login novamente.");
      loading.value = false;
      return;
    }

    const res = await fetch(`${apiUrl}/api/jogadores/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerDataWithElenco)
    });

    if (res.status === 401) {
      auth.logout();
      toast.error('Sessão expirada. Faça login novamente.');
      return;
    }

    if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = Object.values(errorData).join(' ');
        throw new Error(errorMessage || 'Erro ao criar jogador.');
    }

    await fetchPlayers();
    showAddPlayerModal.value = false;
    toast.success('Jogador adicionado com sucesso!');
  } catch (err) {
    console.error(err);
    toast.error('Erro ao criar jogador.', { description: err.message });
  } finally {
    loading.value = false;
  }
};

const updatePlayerData = async (playerData) => {
  loading.value = true;
  try {
    const token = auth.token;
    // CORREÇÃO: Usando template literals para interpolar a URL
    const res = await fetch(`${apiUrl}/api/jogadores/${playerData.id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerData)
    });

    if (!res.ok) throw new Error('Erro ao atualizar jogador.');

    await fetchPlayers();
    showEditPlayerModal.value = false;
    currentPlayer.value = {};
    toast.success('Jogador atualizado com sucesso!');
  } catch (err) {
    console.error(err);
    toast.error('Erro ao atualizar jogador.');
  } finally {
    loading.value = false;
  }
};

const deletePlayer = async () => {
  try {
    const token = auth.token;
    // CORREÇÃO: Usando template literals para interpolar a URL
    const res = await fetch(`${apiUrl}/api/jogadores/${playerToDelete.value.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Erro ao deletar jogador.');
    await fetchPlayers();
    toast.success('Jogador excluído com sucesso!');
  } catch (err) {
    console.error(err);
    toast.error('Erro ao excluir jogador.');
  } finally {
    showDeleteModal.value = false;
    playerToDelete.value = null;
  }
};

const editPlayer = (jogador) => {
  currentPlayer.value = { ...jogador };
  showEditPlayerModal.value = true;
};

const confirmDeletePlayer = (jogador) => {
  playerToDelete.value = jogador;
  showDeleteModal.value = true;
};

const closeAddPlayerModal = () => {
  showAddPlayerModal.value = false;
};

const closeEditPlayerModal = () => {
  showEditPlayerModal.value = false;
  currentPlayer.value = {};
};
</script>