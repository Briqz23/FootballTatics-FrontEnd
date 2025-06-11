<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-[#121212] text-gray-800 dark:text-gray-200">
    <div class="container mx-auto px-4 py-6">

      <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold">Táticas de Jogo</h2>
            <p class="text-gray-600 dark:text-gray-300">Escolha e analise diferentes táticas para aplicar em seu time.</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="handleSuggestTactics"
              :disabled="sugerindo"
              class="px-4 py-2 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-lg flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="sugerindo" class="h-5 w-5 mr-2 animate-spin" />
              <Sparkles v-else class="h-5 w-5 mr-2" />
              Sugerir Tática
            </button>
            </div>
        </div>
      </div>

      <div v-if="analysisMessage && !isSuggestionModalVisible" class="text-center bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <h3 class="text-xl font-semibold">{{ analysisMessage }}</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="tatic in displayedTactics"
          :key="tatic.nome"
          class="bg-white dark:bg-[#1a1919] rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative border-2"
          :class="{
            'border-green-500': selectedTacticName === tatic.nome,
            'border-transparent': selectedTacticName !== tatic.nome
          }"
        >
          <div>
            <img :src="tatic.imagem" :alt="tatic.nome" class="w-full max-h-20 object-contain rounded-lg mb-4">
            <h3 class="text-2xl font-bold mb-2">{{ tatic.nome }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ tatic.descricaoCurta }}</p>
          </div>

          <button
            class="mt-6 w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] font-medium rounded-lg transition-colors"
            @click="openModal(tatic)"
          >
            Saiba Mais
          </button>
        </div>
      </div>

    </div>

    <TacticModal
      :show="isInfoModalVisible"
      :title="selectedTactic.nome"
      :description="selectedTactic.descricaoCompleta"
      @close="isInfoModalVisible = false"
    />

    <SuggestionModal
      :show="isSuggestionModalVisible"
      :title="suggestionModalTitle"
      :message="suggestionModalMessage"
      :suggested-tactics="filteredSuggestedTactics"
      @close="isSuggestionModalVisible = false"
      @select-tactic="handleTacticSelection"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { Loader2, Sparkles, Check } from 'lucide-vue-next'; 
import { toast } from 'vue-sonner';
import { useRuntimeConfig } from '#imports';
import TacticModal from '~/components/TacticModal.vue';
import SuggestionModal from '~/components/SuggestionModal.vue';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const auth = useAuthStore();
const config = useRuntimeConfig();


const sugerindo = ref(false);
const sugestoes = ref({});
const analysisPerformed = ref(false);
const analysisMessage = ref('');
const displayedTactics = ref([]);



const isInfoModalVisible = ref(false);
const isSuggestionModalVisible = ref(false);
const selectedTactic = ref({});
const selectedTacticName = ref(null);

const suggestionModalTitle = computed(() => {
  return filteredSuggestedTactics.value.length > 0 ? 'Táticas Sugeridas' : 'Nenhuma Tática Encontrada';
});

const suggestionModalMessage = computed(() => {
  return filteredSuggestedTactics.value.length > 0
    ? 'Com base no seu elenco, estas são as táticas mais adequadas. Clique em uma para destacá-la:'
    : 'Não foi possível encontrar táticas que se encaixem perfeitamente no seu elenco com os critérios atuais.';
});

const openModal = (tatic) => {
  selectedTactic.value = tatic;
  isInfoModalVisible.value = true;
};


const allTactics = [
  {
    nome: 'Tiki Taka',
    descricaoCurta: 'Um estilo de jogo baseado em posse de bola...',
    descricaoCompleta: 'Focado em passes curtos e movimentação constante, o Tiki Taka visa controlar o jogo, cansar o adversário e criar espaços através da troca de passes precisa. Requer jogadores com alta qualidade de passe e inteligência tática.',
    imagem: new URL('@/components/taticas/imagens/tikitaka2.png', import.meta.url).href,
    requisitos: { posseBola: 8, passe: 8, inteligenciaTatita: 7 }
  },
  {
    nome: 'Jogada pelas Pontas',
    descricaoCurta: 'Usa toda a largura do campo quando estiver com a posse de bola...',
    descricaoCompleta: 'Esta tática explora a velocidade e a capacidade de drible dos pontas para criar jogadas de linha de fundo e cruzamentos. É ideal para equipes com laterais ofensivos e atacantes com boa presença de área.',
    imagem: new URL('@/components/taticas/imagens/pontas2.png', import.meta.url).href,
    requisitos: { velocidade: 7, drible: 6, cruzamento: 7 }
  },
  {
    nome: 'Contra-Ataque',
    descricaoCurta: 'Poucos riscos e linha baixa são necessários para este estilo de jogo...',
    descricaoCompleta: 'Baseado em uma defesa sólida e transições rápidas. A equipe atrai o adversário para seu campo e, ao recuperar a bola, lança ataques velozes com poucos jogadores. Exige defensores sólidos e atacantes muito rápidos.',
    imagem: new URL('@/components/taticas/imagens/contraataque2.png', import.meta.url).href,
    requisitos: { defesa: 8, velocidadeAtacantes: 8, precisaoPasseLongo: 6 }
  },
  {
    nome: 'Pressão',
    descricaoCurta: 'A equipe procurará recuperar a bola na área adversária...',
    descricaoCompleta: 'Também conhecida como "pressing", esta tática foca em pressionar o adversário logo que ele perde a posse de bola, idealmente no campo de ataque. O objetivo é forçar erros e recuperar a bola perto do gol rival. Exige jogadores com alta velocidade e bom senso de antecipação.',
    imagem: new URL('@/components/taticas/imagens/pressao2.png', import.meta.url).href,
    requisitos: { resistencia: 8, velocidade: 7, agressividade: 7 }
  },
  {
    nome: 'Conexão Direta',
    descricaoCurta: 'Um estilo de jogo focado na força e na condição física...',
    descricaoCompleta: 'Utiliza passes longos e lançamentos da defesa diretamente para o ataque, pulando o meio-campo. É eficaz com atacantes altos e fortes (pivôs) que possam brigar pela bola e ajeitar para os companheiros.',
    imagem: new URL('@/components/taticas/imagens/conexaodireta2.png', import.meta.url).href,
    requisitos: { forca: 8, alturaAtacantes: 7, passeLongo: 7 }
  },
  {
    nome: 'Retranca Total',
    descricaoCurta: 'Seu time foca principalmente em uma defesa sólida...',
    descricaoCompleta: 'Uma abordagem ultra defensiva onde a prioridade máxima é não sofrer gols. A equipe joga com linhas muito recuadas e compactas, abdicando da posse de bola e esperando por uma oportunidade rara de contra-ataque. Requer jogadores muito disciplinados defensivamente.',
    imagem: new URL('@/components/taticas/imagens/retranca2.png', import.meta.url).href,
    requisitos: { disciplinaDefensiva: 9, resistencia: 7, marcacao: 8 }
  },
];


displayedTactics.value = allTactics;


const filteredSuggestedTactics = computed(() => {
  return allTactics.filter(tatic => sugestoes.value[tatic.nome]);
});


const handleSuggestTactics = async () => {
  sugerindo.value = true;
  sugestoes.value = {};
  analysisMessage.value = '';
  selectedTacticName.value = null;
  toast.info("Analisando seu elenco...");

  try {
    const response = await $fetch(`${config.public.API_URL}/api/sugerir-tatica/`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    analysisPerformed.value = true;

    if (response.no_match) {
      sugestoes.value = {};
      isSuggestionModalVisible.value = true;
      toast.info("Análise concluída. Nenhuma tática ideal encontrada.");
    } else {
      sugestoes.value = response.sugestoes; 
      isSuggestionModalVisible.value = true;
      toast.success("Sugestões encontradas! Verifique o pop-up.");
    }
    displayedTactics.value = allTactics;

  } catch (error) {
    console.error("Erro ao sugerir tática:", error.data || error.message);
    toast.error(error.data?.detail || "Não foi possível gerar a sugestão. Verifique seu elenco e tente novamente.");
    resetView();
  } finally {
    sugerindo.value = false;
  }
};

const handleTacticSelection = (tactic) => {
  selectedTacticName.value = tactic.nome;
  analysisMessage.value = `Tática '${tactic.nome}' selecionada!`;
  isSuggestionModalVisible.value = false;
};

const resetView = () => {
  displayedTactics.value = allTactics;
  sugestoes.value = {};
  analysisPerformed.value = false;
  analysisMessage.value = '';
  selectedTacticName.value = null;
  isSuggestionModalVisible.value = false;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>