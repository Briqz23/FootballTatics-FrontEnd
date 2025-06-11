<template>
  <div class="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1919] to-[#0f0f0f] p-4 md:p-6">
    <div v-if="!profileData" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-[#16A249] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg">Carregando perfil...</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <div class="relative mb-8 overflow-hidden"> 
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#16A249" stroke-width="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div class="relative flex justify-between items-start">
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-8 bg-gradient-to-b from-[#16A249] to-[#0f7a36] rounded-full"></div>
              <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meu Perfil
              </h1>
            </div>
            <p class="text-gray-400 ml-5">Gerencie suas informações</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-8">
        <div>
          <div class="bg-gradient-to-br from-[#1a1919] to-[#252525] rounded-2xl shadow-2xl border border-[#16A249]/20 p-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#16A249]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0f7a36]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div class="relative z-10">
              <div class="flex flex-col lg:flex-row gap-8">
                <div class="flex flex-col items-center lg:items-start">
                  <div class="relative group">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#16A249] to-[#0f7a36] p-1 shadow-2xl">
                      <div class="w-full h-full rounded-full bg-[#1a1919] flex items-center justify-center">
                        <User2 class="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#16A249] to-[#0f7a36] opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                    
                    <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-[#1a1919] flex items-center justify-center">
                      <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div class="mt-4 text-center lg:text-left">
                    <h2 class="text-2xl font-bold text-white">{{ profileData.first_name }} {{ profileData.last_name }}</h2>
                    <p class="text-[#16A249] mt-2 font-medium">Técnico Principal</p>   
                  </div>
                </div>

                <div class="flex-1 space-y-6">
                  <div class="grid grid-cols-1 gap-6">
                    <div class="group">
                      <label class="text-sm text-gray-400 block mb-2 font-medium">E-mail</label>
                      <div class="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-gray-700 group-hover:border-[#16A249]/50 transition-colors">
                        <div class="p-2 bg-[#16A249]/10 rounded-lg">
                          <Mail class="w-5 h-5 text-[#16A249]" />
                        </div>
                        <span class="text-white font-medium">{{ profileData.email }}</span>
                      </div>
                    </div>

                    <div class="group">
                      <label class="text-sm text-gray-400 block mb-2 font-medium">Time Principal</label>
                      <div class="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-gray-700 group-hover:border-[#16A249]/50 transition-colors">
                        <div class="p-2 bg-[#16A249]/10 rounded-lg">
                          <Trophy class="w-5 h-5 text-[#16A249]" />
                        </div>
                        <span class="text-white font-medium">{{ profileData.team_name }}</span>
                        <div class="ml-auto flex items-center space-x-2">
                          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span class="text-green-400 text-sm">Ativo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-[#1a1919] to-[#252525] rounded-2xl shadow-2xl border border-[#16A249]/20 p-8 relative overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="2" fill="#16A249"/>
            <circle cx="80" cy="30" r="1.5" fill="#16A249"/>
            <circle cx="60" cy="70" r="1" fill="#16A249"/>
            <circle cx="30" cy="80" r="2.5" fill="#16A249"/>
          </svg>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center">
                <Gamepad2 class="w-7 h-7 text-[#16A249] mr-3" />
                Formação Tática
              </h3>
              <p class="text-gray-400 mt-1">Sua formação principal selecionada</p>
            </div>
            
            <button @click="navigateTo('/formacoes')" class="px-4 py-2 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-xl transition-colors flex items-center space-x-2">
              <Edit3 class="w-4 h-4" />
              <span>Alterar</span>
            </button>
          </div>

          <div v-if="loadingFormation" class="flex items-center justify-center py-20">
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-[#16A249] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-400">Carregando formação salva...</p>
            </div>
          </div>
          
          <div v-else-if="selectedFormation" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="space-y-6">
              <div class="bg-[#252525] rounded-xl p-6 border border-gray-700">
                <h4 class="text-xl font-bold text-white mb-4">{{ selectedFormation.name }}</h4>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Estilo:</span>
                    <span class="text-white font-medium">{{ selectedFormation.style || 'Equilibrada' }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Dificuldade:</span>
                    <div class="flex space-x-1">
                      <Star 
                        v-for="i in 5" 
                        :key="i"
                        class="w-4 h-4"
                        :class="i <= (selectedFormation.difficulty || 3) ? 'text-yellow-400 fill-current' : 'text-gray-600'"
                      />
                    </div>
                  </div>
                </div>
              </div>             
            </div>
            
            <div class="lg:col-span-2">
              <FormacaoCard
                :formation="selectedFormation"
                :large="true"
                class="h-full"
              />
            </div>
          </div>
          
          <div v-else class="text-center py-20">
            <div class="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 class="w-8 h-8 text-gray-500" />
            </div>
            <p class="text-gray-400 text-lg mb-4">Nenhuma formação selecionada</p>
            <button class="px-6 py-3 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-xl transition-colors"
                    @click="navigateTo('/formacoes')">
              Escolher Formação
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { 
  User2, 
  Mail, 
  Trophy, 
  Star, 
  Gamepad2, 
  Edit3,
} from 'lucide-vue-next';
import { definePageMeta, useRuntimeConfig, navigateTo } from '#imports';
import LogoutButton from '~/components/perfil/LogoutButton.vue';
import FormacaoCard from '~/components/formacoes/Campo.vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const auth = useAuthStore();
const config = useRuntimeConfig();
const selectedFormation = ref(null);
const loadingFormation = ref(true);
const profileData = ref(null);

onMounted(async () => {
  if (auth.user) {
    profileData.value = auth.user;
  } else {
    await fetchUser();
  }
  await loadFormation();
});

const fetchUser = async () => {
  try {
    const data = await $fetch(`${config.public.API_URL}/api/me/`, {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    });
    profileData.value = data;
    auth.user = data;
  } catch (e) {
    console.error("Erro ao buscar dados do usuário", e);
    auth.logout();
  }
};

const loadFormation = async () => {
  loadingFormation.value = true;
  try {
    const response = await $fetch(`${config.public.API_URL}/api/formacao-escolhida/`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    
    if (response && response.formacao) {
        selectedFormation.value = {
        name: response.formacao.nome,
        positions: response.formacao.posicoes,
        style: response.formacao.estilo || 'Equilibrada',
        difficulty: response.formacao.dificuldade || 3,
        description: response.formacao.descricao || 'Formação tática'
      }
    } else {
      selectedFormation.value = null;
    }
  } catch (err) {
    if (err.statusCode !== 404) {
      console.error('Erro ao carregar formação:', err);
    }
    selectedFormation.value = null;
  } finally {
    loadingFormation.value = false;
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>