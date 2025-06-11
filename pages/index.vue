<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-[#121212]">
    <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      

      <main class="flex-grow">
        <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Bem-vindo, {{ userName }}!</h2>
            <p class="text-gray-600 dark:text-gray-300 mt-1">Gerencie seu time e acompanhe o desempenho dos jogadores.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <!-- Card Formações -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-green-800 to-green-600 p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Formações</h3>
              <Newspaper class="h-12 w-12 text-white opacity-50" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Crie e gerencie diferentes formações táticas para seu time.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
               @click="$router.push('/formacoes')">
                Acessar Formações
              </button>
            </div>
          </div>

          <!-- Card Elenco -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-green-800 to-green-600 p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Elenco</h3>
              <Users class="h-12 w-12 text-white opacity-50" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Gerencie os jogadores do seu elenco e suas características.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors" 
                @click="$router.push('/elenco')">
                Acessar Elenco
              </button>
            </div>
          </div>

          <!-- Card Táticas -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-green-800 to-green-600 p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Táticas</h3>
              <Gamepad2 class="h-12 w-12 text-white opacity-50" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Defina estratégias e táticas para diferentes situações de jogo.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                @click="$router.push('/taticas')">
                Acessar Táticas
              </button>
            </div>
          </div>

          <!-- Card Procurar Talentos -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-green-800 to-green-600 p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Procurar Talentos</h3>
              <Lightbulb class="h-12 w-12 text-white opacity-50" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Analise seu elenco com IA para descobrir a posição ideal de cada jogador.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                @click="$router.push('/procurar-talentos')">
                Acessar Talentos
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Gamepad2,
  Lightbulb 
} from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const auth = useAuthStore();

const userName = computed(() => auth.user?.first_name || 'Usuário');
const teamName = computed(() => auth.user?.team_name || 'Time Desconhecido');
const teamInitials = computed(() =>
  teamName.value
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
);

onMounted(() => {
  if (auth.token && !auth.user) {
    auth.fetchUser();
  }
});
</script>
