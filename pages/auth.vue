<template>
  <div class="min-h-screen bg-gradient-to-br from-[#121212] to-[#1a1919] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto mb-4 bg-[#1a1919] rounded-2xl flex items-center justify-center border-2 border-gray-700 shadow-lg">
          <Trophy class="h-10 w-10 text-[#16A249]" />
        </div>
        <h1 class="text-3xl font-bold text-white">Football Tactics</h1>
        <p class="text-gray-400">Sua plataforma de gerenciamento tático.</p>
      </div>

      <div class="bg-[#1a1919] border border-gray-700 rounded-2xl shadow-2xl p-8">
        <div class="flex border-b border-gray-700 mb-6">
          <button
            @click="isLogin = true"
            :class="['w-1/2 py-3 font-medium text-center transition-colors', isLogin ? 'text-[#16A249] border-b-2 border-[#16A249]' : 'text-gray-400 hover:text-white']"
          >
            Login
          </button>
          <button
            @click="isLogin = false"
            :class="['w-1/2 py-3 font-medium text-center transition-colors', !isLogin ? 'text-[#16A249] border-b-2 border-[#16A249]' : 'text-gray-400 hover:text-white']"
          >
            Registrar
          </button>
        </div>

        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="login-email" class="text-sm font-medium text-gray-300 block mb-2">Email</label>
            <input v-model="loginData.email" id="login-email" type="email" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <div>
            <label for="login-password" class="text-sm font-medium text-gray-300 block mb-2">Senha</label>
            <input v-model="loginData.password" id="login-password" type="password" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <button type="submit" class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white font-bold py-3 rounded-lg transition-colors">
            Entrar
          </button>
        </form>

        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="reg-firstname" class="text-sm font-medium text-gray-300 block mb-2">Primeiro Nome</label>
              <input v-model="registerData.first_name" id="reg-firstname" type="text" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
            </div>
            <div>
              <label for="reg-lastname" class="text-sm font-medium text-gray-300 block mb-2">Sobrenome</label>
              <input v-model="registerData.last_name" id="reg-lastname" type="text" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
            </div>
          </div>
           <div>
            <label for="reg-teamname" class="text-sm font-medium text-gray-300 block mb-2">Nome do Time</label>
            <input v-model="registerData.team_name" id="reg-teamname" type="text" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <div>
            <label for="reg-email" class="text-sm font-medium text-gray-300 block mb-2">Email</label>
            <input v-model="registerData.email" id="reg-email" type="email" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <div>
            <label for="reg-password" class="text-sm font-medium text-gray-300 block mb-2">Senha</label>
            <input v-model="registerData.password" id="reg-password" type="password" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <div>
            <label for="reg-password2" class="text-sm font-medium text-gray-300 block mb-2">Confirmar Senha</label>
            <input v-model="registerData.password2" id="reg-password2" type="password" required class="w-full bg-[#252525] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#16A249]">
          </div>
          <button type="submit" class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white font-bold py-3 rounded-lg transition-colors mt-2">
            Criar Conta
          </button>
        </form>
      </div>

      <div class="mt-8 mx-auto w-full max-w-sm">
        <div class="bg-[#1a1919] border border-gray-700 rounded-2xl p-5 shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold text-lg flex items-center">
              <Quote class="w-5 h-5 mr-2 text-[#16A249]" />
              Inspiração de Campeões
            </h3>
            <div class="flex space-x-2">
              <button
                @click="prevQuote"
                class="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <ChevronLeft class="w-5 h-5 text-white" />
              </button>
              <button
                @click="nextQuote"
                class="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <ChevronRight class="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div class="relative h-[180px] overflow-hidden">
            <transition-group
              name="quote-slide"
              tag="div"
              class="absolute inset-0"
            >
              <div
                v-for="(quote, index) in quotes"
                :key="quote.id"
                v-show="currentQuoteIndex === index"
                class="h-full flex flex-col justify-between"
              >
                <div>
                  <p class="text-white text-lg italic mt-4 mb-4">{{ quote.text }}</p>
                </div>

                <div class="flex items-center">
                  <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
                    <User class="w-6 h-6 text-[#16A249]" />
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ quote.author }}</p>
                    <p class="text-green-200 text-sm">{{ quote.role }}</p>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { toast } from 'vue-sonner';
import { Trophy, User, ChevronRight, ChevronLeft, Quote } from 'lucide-vue-next';

definePageMeta({
  layout: 'auth'
});

const auth = useAuthStore();
const isLogin = ref(true);
const currentQuoteIndex = ref(0);

const loginData = ref({
  email: '',
  password: ''
});

const registerData = ref({
  email: '',
  first_name: '',
  last_name: '',
  team_name: '',
  password: '',
  password2: ''
});

const quotes = [
  {
    id: 1,
    text: 'O talento ganha jogos, mas trabalho em equipe e inteligência ganham campeonatos.',
    author: 'Di Stefano',
    role: 'Lenda do Futebol'
  },
  {
    id: 2,
    text: 'A diferença entre o impossível e o possível reside na determinação de uma pessoa.',
    author: 'George Best',
    role: 'Lenda do Futebol'
  },
  {
    id: 3,
    text: 'Você não pode colocar um limite em nada. Quanto mais você sonha, mais longe você chega.',
    author: 'Cristiano Ronaldo',
    role: 'Jogador de Futebol'
  },
  {
    id: 4,
    text: 'A melhor maneira de prever o futuro é criá-lo.',
    author: 'Johan Cruyff',
    role: 'Lenda do Futebol'
  },
  {
    id: 5,
    text: 'Não é só o jogo em si. O futebol é uma batalha psicológica, o aspecto humano desempenha um papel significativo',
    author: 'Sócrates',
    role: 'Lenda do Futebol e do Corinthians'
  }
];

const nextQuote = () => {
  currentQuoteIndex.value = (currentQuoteIndex.value + 1) % quotes.length;
};

const prevQuote = () => {
  currentQuoteIndex.value = (currentQuoteIndex.value - 1 + quotes.length) % quotes.length;
};

onMounted(() => {
  setInterval(nextQuote, 10000);
});

const handleLogin = async () => {
  await auth.login(loginData.value);
};

const handleRegister = async () => {
  await auth.register(registerData.value);
  if (!auth.error) {
    isLogin.value = true;
    registerData.value = {
      email: '', first_name: '', last_name: '', team_name: '',
      password: '', password2: ''
    };
  }
};
</script>

<style scoped>
.quote-slide-enter-active,
.quote-slide-leave-active {
  transition: opacity 0.5s ease;
}

.quote-slide-enter-from,
.quote-slide-leave-to {
  opacity: 0;
}
</style>