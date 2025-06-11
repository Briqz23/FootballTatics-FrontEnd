import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as object | null,
    error: null as object | null,
    scoutingReport: [] as any[], 
  }),

  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials: object) {
      const runtimeConfig = useRuntimeConfig()
      this.error = null

      try {
        const response = await $fetch<{ access: string, user: object }>(`${runtimeConfig.public.API_URL}/api/login/`, {
          method: 'POST',
          body: credentials,
        })
        
        this.token = response.access
        this.user = response.user
        
        toast.success('Login realizado com sucesso!')
        
        await navigateTo('/')
      } catch (error: any) {
        console.error('Erro no login:', error.data)
        this.error = error.data
        toast.error('Falha no Login', {
          description: error.data?.detail || 'Credenciais inválidas. Verifique seu email e senha.',
        })
      }
    },

    async register(payload: object) {
      const runtimeConfig = useRuntimeConfig()
      this.error = null

      try {
        await $fetch(`${runtimeConfig.public.API_URL}/api/register/`, {
          method: 'POST',
          body: payload,
        })
        
        toast.success('Conta criada com sucesso!', {
          description: 'Você já pode fazer o login com suas credenciais.',
        })
      } catch (error: any) {
        console.error('Erro no registro:', error.data)
        this.error = error.data
        
        let errorMessage = 'Não foi possível criar a conta.';
        if (error.data) {
          errorMessage = Object.entries(error.data)
            .map(([key, value]) => `${key}: ${(value as string[]).join(', ')}`)
            .join(' ');
        }
        
        toast.error('Erro no Registro', { description: errorMessage });
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null
      
      this.scoutingReport = [];

      toast.info('Você foi desconectado.')
      
      navigateTo('/auth')
    },

    async fetchUser() {
      if (!this.token) {
        console.log("Sem token, impossível buscar usuário.");
        return;
      }
      
      const runtimeConfig = useRuntimeConfig();
      try {
        const userData = await $fetch(`${runtimeConfig.public.API_URL}/api/me/`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = userData as object;
      } catch (error) {
        console.error("Falha ao buscar dados do usuário, fazendo logout.", error);
        this.logout();
      }
    },

    async findTalents() {
      if (!this.token) {
        toast.error('Você precisa estar logado para usar este recurso.');
        return;
      }
      
      const runtimeConfig = useRuntimeConfig();
      this.error = null;
      this.scoutingReport = []; 

      try {
        const report = await $fetch<any[]>(`${runtimeConfig.public.API_URL}/api/procurar-talentos/`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        this.scoutingReport = report;
        toast.success('Análise de talentos concluída com sucesso!');

      } catch (error: any) {
        console.error("Falha ao buscar talentos:", error.data);
        this.error = error.data;
        toast.error('Erro na Análise de Talentos', {
          description: error.data?.error || 'Não foi possível completar a análise do elenco.',
        });
      }
    },
  },
})