<template>
  <div class="bg-[#121212] min-h-screen p-6">
    <h1 class="text-3xl font-bold text-white mb-4">Procurando Talentos</h1>
    <p class="text-gray-300 mb-6">
      Utilize nossa Inteligência Artificial para analisar o seu elenco e descobrir as posições ideais para cada jogador, revelando talentos ocultos e otimizando sua escalação.
    </p>

    <div v-if="authStore.isLoading" class="text-center p-6 bg-gray-800 rounded-lg mt-8">
      <Loader2 class="mx-auto h-8 w-8 text-white animate-spin mb-4" />
      <p class="text-gray-300">Analisando elenco...</p>
    </div>
    <div v-else-if="authStore.scoutingReport.length > 0 && authStore.suggestedFormation"
         class="bg-gray-800 rounded-lg shadow p-6 mb-6 text-center">
      <h2 class="text-xl font-bold text-white mb-2">Formação Sugerida para seu Elenco:</h2>
      <p class="text-green-400 text-2xl font-semibold">{{ authStore.suggestedFormation }}</p>
      <p class="text-gray-400 text-sm mt-2">Baseado na análise de seus jogadores.</p>
    </div>


    <div v-if="authStore.isLoading" class="text-center p-6 bg-gray-800 rounded-lg mt-8">
      <Loader2 class="mx-auto h-8 w-8 text-white animate-spin mb-4" />
      <p class="text-gray-300">Carregando relatório...</p>
    </div>
    <div v-else-if="authStore.scoutingReport.length > 0" class="overflow-x-auto bg-gray-800 rounded-lg shadow mt-8">
      <table class="min-w-full divide-y divide-gray-700">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jogador</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Posição Atual</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Posição Sugerida (IA)</th>
          </tr>
        </thead>
        <tbody class="bg-gray-800 divide-y divide-gray-700">
          <tr v-for="player in authStore.scoutingReport" :key="player.nome" class="hover:bg-gray-700 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{{ player.nome }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-600 text-white">
                {{ player.posicao_atual }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
              <span class="px-2 inline-flex text-xs leading-5 rounded-full bg-green-900 text-green-300">
                <Lightbulb class="mr-1.5 h-4 w-4 text-green-400" />
                {{ getFullPositionName(player.posicao_sugerida) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else class="text-center p-6 bg-gray-800 rounded-lg mt-8">
      <p class="text-gray-300">Nenhum relatório de análise de talentos disponível.</p>
      <p class="text-gray-400 text-sm mt-2">Certifique-se de ter jogadores no seu elenco e tente novamente.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { ref, onMounted, onUnmounted } from 'vue';
import { Loader2, Lightbulb } from 'lucide-vue-next';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const positionMap: Record<string, string> = {
  'CAM': 'Meia Ofensivo',
  'CB': 'Zagueiro Central',
  'CDM': 'Volante',
  'CM': 'Meia Central',
  'LB': 'Lateral Esquerdo',
  'LM': 'Meia Esquerdo',
  'LW': 'Ponta Esquerda',
  'RB': 'Lateral Direito',
  'RM': 'Meia Direito',
  'RW': 'Ponta Direita',
  'ST': 'Centroavante',
  'Goleiro': 'Goleiro',
  'Erro AI': 'Erro de Análise IA',
  'Sem Sugestão (Erro AI)': 'Sem Sugestão (Erro AI)',
};

const getFullPositionName = (shortName: string): string => {
  return positionMap[shortName] || shortName;
};

onMounted(async () => {
  await authStore.findTalents(); 
});

onUnmounted(() => {
  authStore.scoutingReport = [];
  authStore.suggestedFormation = null; 
});
</script>