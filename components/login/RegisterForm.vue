<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">Crie sua conta</h2>
      <p class="text-gray-400">Preencha os dados abaixo para começar</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div v-if="error" class="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
        {{ error }}
      </div>

      <div>
        <label for="name" class="block text-sm text-gray-400 mb-1">Nome Completo</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User class="h-5 w-5 text-gray-500" />
          </div>
          <input id="name" v-model="form.name" type="text" autocomplete="name" required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.name }" />
        </div>
        <p v-if="validationErrors.name" class="text-sm text-red-400 mt-1">{{ validationErrors.name }}</p>
      </div>

      <div>
        <label for="email" class="block text-sm text-gray-400 mb-1">E-mail</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-500" />
          </div>
          <input id="email" v-model="form.email" type="email" autocomplete="email" required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.email }" />
        </div>
        <p v-if="validationErrors.email" class="text-sm text-red-400 mt-1">{{ validationErrors.email }}</p>
      </div>

      <div>
        <label for="phone" class="block text-sm text-gray-400 mb-1">Telefone</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone class="h-5 w-5 text-gray-500" />
          </div>
          <input id="phone" v-model="form.phone" type="tel" required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.phone }" />
        </div>
        <p v-if="validationErrors.phone" class="text-sm text-red-400 mt-1">{{ validationErrors.phone }}</p>
      </div>

      <div>
        <label for="teamName" class="block text-sm text-gray-400 mb-1">Nome do Time</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Trophy class="h-5 w-5 text-gray-500" />
          </div>
          <input id="teamName" v-model="form.teamName" type="text" required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.teamName }" />
        </div>
        <p v-if="validationErrors.teamName" class="text-sm text-red-400 mt-1">{{ validationErrors.teamName }}</p>
      </div>

      <div>
        <label for="password" class="block text-sm text-gray-400 mb-1">Senha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.password }" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white">
            <Eye v-if="showPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p v-if="validationErrors.password" class="text-sm text-red-400 mt-1">{{ validationErrors.password }}</p>
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm text-gray-400 mb-1">Confirmar Senha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input id="confirmPassword" v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password" required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249]"
            :class="{ 'border-red-500': validationErrors.confirmPassword }" />
          <button type="button" @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white">
            <Eye v-if="showConfirmPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p v-if="validationErrors.confirmPassword" class="text-sm text-red-400 mt-1">{{ validationErrors.confirmPassword }}</p>
      </div>

      <button type="submit" :disabled="loading"
        class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        :class="{ 'opacity-70 cursor-not-allowed': loading }">
        <Loader2 v-if="loading" class="animate-spin mr-2 h-5 w-5" />
        <span>{{ loading ? 'Registrando...' : 'Criar Conta' }}</span>
      </button>
    </form>

    <div class="text-center mt-6">
      <p class="text-gray-400 text-sm">
        Já tem uma conta?
        <button type="button" @click="$emit('switch-to-login')"
          class="text-[#16A249] hover:text-[#0f7a36] font-medium transition-colors">
          Faça login
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Trophy } from 'lucide-vue-next'
import { toast } from 'vue-sonner'


const emit = defineEmits(['register-success', 'register-error', 'switch-to-login'])
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  teamName: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validationErrors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  teamName: ''
})

const validateForm = () => {
  let isValid = true
  Object.keys(validationErrors).forEach(key => validationErrors[key] = '')

  if (!form.name || form.name.length < 3) {
    validationErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    isValid = false
  }

  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
    validationErrors.email = 'E-mail inválido'
    isValid = false
  }

  if (!form.phone || !/^\d{10,11}$/.test(form.phone)) {
    validationErrors.phone = 'Telefone inválido. Apenas números'
    isValid = false
  }

  if (!form.teamName || form.teamName.length < 3) {
    validationErrors.teamName = 'Nome do time é obrigatório'
    isValid = false
  }

  if (!form.password || form.password.length < 6) {
    validationErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  if (form.password !== form.confirmPassword) {
    validationErrors.confirmPassword = 'As senhas não coincidem'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`${config.public.API_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirmPassword,
        team_name: form.teamName
      })
    })

    if (!response.ok) {
      const err = await response.json()

      const erroMsg = Object.values(err)[0]?.[0] || 'Erro ao registrar'
      toast.error(erroMsg)
      throw new Error(erroMsg)
    }

    const data = await response.json()
    toast.success('Cadastro realizado com sucesso!')
    emit('register-success', data)

    Object.keys(form).forEach(key => form[key] = '')
  } catch (err) {
    error.value = err.message
    toast.error(err.message)
    emit('register-error', err)
  } finally {
    loading.value = false
  }
}

</script>
