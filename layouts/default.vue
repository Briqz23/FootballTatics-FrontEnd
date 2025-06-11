<template>
  <div class="flex min-h-screen">
    
    <SideBarMenu :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

    <div class="flex-1 flex flex-col">
      
      <header class="bg-white dark:bg-[#1a1919] shadow-sm">
        <div class="container mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <button @click="toggleSidebar" class="text-gray-600 dark:hover:bg-[#252525] p-2 rounded-lg focus:outline-none">
                <Menu class="w-6 h-6 text-white" />
            </button>
            
            <NuxtLink to="/" class="flex items-center space-x-3 cursor-pointer"> <Trophy class="h-8 w-8 text-[#16A249]" />
              <h1 class="text-xl font-bold text-gray-800 dark:text-white">Football Tactics</h1>
            </NuxtLink>
            
            <div v-if="auth.user" class="flex items-center space-x-4">
              <div class="relative">
                <NuxtLink to="/perfil" class="flex items-center space-x-2 cursor-pointer">
                  <div class="h-9 w-9 rounded-full bg-[#16A249] flex items-center justify-center text-white font-medium">
                    {{ auth.user?.first_name?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <span class="hidden md:inline text-gray-800 dark:text-white font-medium">
                    {{ auth.user?.first_name || 'Usuário' }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 bg-[#121212] p-6 overflow-auto">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SideBarMenu from '~/components/SideBarMenu.vue';
import { Menu, Trophy } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

onMounted(() => {
  if (auth.token && !auth.user) {
    auth.fetchUser();
  }
});
</script>