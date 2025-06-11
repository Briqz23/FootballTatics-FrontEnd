<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h2>
      <p class="text-gray-400">Entre com suas credenciais para acessar sua conta</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div v-if="error" class="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
        {{ error }}
      </div>

      <div>
        <label for="email" class="block text-sm text-gray-400 mb-1">E-mail</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
          />
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <label for="password" class="block text-sm text-gray-400">Senha</label>
          <button 
            type="button" 
            @click="$emit('forgot-password')" 
            class="text-xs text-[#16A249] hover:text-[#0f7a36] transition-colors"
          >
            Esqueceu a senha?
          </button>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
          />
          <button 
            type="button"
            @click="showPassword = !showPassword" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
          >
            <Eye v-if="showPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
      >
        <Loader2 v-if="loading" class="animate-spin mr-2 h-5 w-5" />
        <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
      </button>
    </form>

    <div class="text-center mt-6">
      <p class="text-gray-400 text-sm">
        Não tem uma conta?
        <button 
          type="button" 
          @click="$emit('switch-to-register')" 
          class="text-[#16A249] hover:text-[#0f7a36] font-medium transition-colors"
        >
          Registre-se
        </button>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const router = useRouter()
const auth = useAuthStore()

const emit = defineEmits(['login-success', 'login-error'])

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    const loginRes = await fetch(`${config.public.API_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    })

    if (!loginRes.ok) {
      const errText = await loginRes.text()
      throw new Error(errText || 'Falha no login')
    }

    const { access } = await loginRes.json()

    const meRes = await fetch(`${config.public.API_URL}/me/`, {
      headers: { Authorization: `Bearer ${access}` }
    })

    if (!meRes.ok) {
      throw new Error('Erro ao buscar dados do usuário')
    }

    const userData = await meRes.json()

    auth.login(userData, access)

    router.push('/')

    emit('login-success', userData)

  } catch (err) {
    console.error('Login error', err)
    error.value = 'Email ou senha inválidos'
    emit('login-error', err)
  } finally {
    loading.value = false
  }
}
</script>