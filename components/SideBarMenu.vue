<template>
  <div 
    v-if="isOpen" 
    @click="$emit('close-sidebar')" 
    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
  ></div>

  <aside 
    class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#1a1919] shadow-xl z-40 transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4">
      <div class="flex items-center space-x-3 mb-6">
        <Trophy class="h-8 w-8 text-[#16A249]" />
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Football Tactics</h1>
      </div>

      <nav class="space-y-1">
        <NuxtLink 
          to="/" 
          @click="$emit('close-sidebar')"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium"
          active-class="bg-[#16A249] bg-opacity-10 text-[#16A249]"
        >
          <LayoutDashboard class="h-5 w-5" />
          <span>Dashboard</span>
        </NuxtLink>
        <NuxtLink 
          to="/elenco" 
          @click="$emit('close-sidebar')"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium"
          active-class="bg-[#16A249] bg-opacity-10 text-[#16A249]"
        >
          <Users class="h-5 w-5" />
          <span>Elenco</span>
        </NuxtLink>
        <NuxtLink 
          to="/formacoes" 
          @click="$emit('close-sidebar')"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium"
          active-class="bg-[#16A249] bg-opacity-10 text-[#16A249]"
        >
          <Newspaper class="h-5 w-5" />
          <span>Formações</span>
        </NuxtLink>
        <NuxtLink 
          to="/taticas" 
          @click="$emit('close-sidebar')"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium"
          active-class="bg-[#16A249] bg-opacity-10 text-[#16A249]"
        >
          <Gamepad2 class="h-5 w-5" />
          <span>Táticas</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/procurar-talentos" 
          @click="$emit('close-sidebar')"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium"
          active-class="bg-[#16A249] bg-opacity-10 text-[#16A249]"
        >
          <Lightbulb class="h-5 w-5" />
          <span>Procurando Talentos</span>
        </NuxtLink>

      </nav>
    </div>
  </aside>
</template>

<script setup>
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Gamepad2,
  Trophy,
  Lightbulb 
} from 'lucide-vue-next';


defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close-sidebar']);
</script>