<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-[#121212]">
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="p-2 hover:bg-gray-100 dark:hover:bg-[#252525] rounded-lg">
              <ArrowLeft class="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Formações Táticas</h1>
              <p class="text-gray-600 dark:text-gray-300">Escolha a formação ideal para seu time</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              v-if="selectedFormation"
              @click="saveFormation"
              :disabled="saving"
              class="px-4 py-2 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-lg flex items-center disabled:opacity-50"
            >
              <Loader2 v-if="saving" class="h-4 w-4 mr-2 animate-spin" />
              <Save v-else class="h-4 w-4 mr-2" />
              Salvar Formação
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="selectedCategory === category 
              ? 'bg-[#16A249] text-white' 
              : 'bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#333]'"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div v-if="selectedFormation" class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="lg:w-1/3">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">Formação Selecionada</h3>
            <div class="bg-[#16A249] text-white p-4 rounded-lg">
              <h4 class="text-xl font-bold">{{ selectedFormation.nome }}</h4>
              <p class="text-green-100 mt-1">{{ selectedFormation.descricao }}</p>
            </div>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-300">Estilo:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ selectedFormation.estilo }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-300">Dificuldade:</span>
                <div class="flex">
                  <Star 
                    v-for="i in 5" 
                    :key="i"
                    class="h-4 w-4"
                    :class="i <= selectedFormation.dificuldade ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-2/3">
            <Campo 
              :formation="{ ...selectedFormation, positions: selectedFormation.posicoes }" 
              :large="true"
            />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">
          {{ selectedCategory }} ({{ filteredFormations.length }} formações)
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="formation in filteredFormations"
            :key="formation.id"
            @click="selectFormation(formation)"
            class="cursor-pointer group"
          >
            <div 
              class="border-2 rounded-xl p-4 transition-all duration-200 flex flex-col items-center" :class="selectedFormation && selectedFormation.id === formation.id 
                ? 'border-[#16A249] bg-[#16A249] bg-opacity-5' 
                : 'border-gray-200 dark:border-gray-700 hover:border-[#16A249] hover:shadow-md'"
            >
              <div class="text-center mb-3">
                <h3 
                  class="font-bold text-lg"
                  :class="selectedFormation && selectedFormation.id === formation.id 
                    ? 'text-[#16A249]' 
                    : 'text-gray-800 dark:text-white'"
                >
                  {{ formation.nome }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ formation.estilo }}</p>
              </div>

              <Campo :formation="{ ...formation, positions: formation.posicoes }" />

              <div class="mt-3 flex justify-between text-xs text-gray-600 dark:text-gray-300 w-full px-2"> <span>{{ getLineupStats(formation.posicoes).defense }} Defensores</span>
                <span>{{ getLineupStats(formation.posicoes).midfield }} Meio-Campistas</span>
                <span>{{ getLineupStats(formation.posicoes).attack }} Atacantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ArrowLeft, Save, Loader2, Star } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Campo from '~/components/formacoes/Campo.vue';
import { definePageMeta, useRuntimeConfig } from '#imports';
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const router = useRouter();
const config = useRuntimeConfig();
const saving = ref(false);
const selectedFormation = ref(null);
const selectedCategory = ref('Todas');
const formations = ref([]);

const categories = ['Todas', 'Defensivas', 'Equilibradas', 'Ofensivas', 'Especiais'];

const filteredFormations = computed(() => {
  if (selectedCategory.value === 'Todas') return formations.value;
  return formations.value.filter(f => f.categoria === selectedCategory.value);
});

const getLineupStats = (positions) => {
  if (!Array.isArray(positions)) return { defense: 0, midfield: 0, attack: 0 };
  const defense = positions.filter(p => p.y <= 40 && p.y > 5).length;
  const midfield = positions.filter(p => p.y > 40 && p.y <= 70).length;
  const attack = positions.filter(p => p.y > 70).length;
  return { defense, midfield, attack };
};

const goBack = () => router.push('/');
const selectFormation = (formation) => selectedFormation.value = formation;

const saveFormation = async () => {
  if (!selectedFormation.value) return;

  saving.value = true;
  const auth = useAuthStore();

  try {
    const response = await fetch(`${config.public.API_URL}/api/salvar-formacao/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formationId: selectedFormation.value.id,
      }),
    });

    if (!response.ok) throw new Error('Erro ao salvar formação');
    toast.success('Formação salva com sucesso!')
    router.push('/perfil');
  } catch (error) {
    console.error(error);
    toast.error('Erro ao salvar formação.')
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  try {
    const res = await fetch(`${config.public.API_URL}/api/formacoes/`);
    if (!res.ok) throw new Error('Falha ao buscar dados da API.');

    const data = await res.json();
    
    formations.value = data;
    
    console.log('Formações carregadas:', formations.value);

  } catch (err) {
    console.error('Erro ao carregar formações:', err);
    toast.error('Não foi possível carregar as formações do servidor.');
  }
});
</script>