<template>
  <div class="relative">
    <!-- Campo de Futebol -->
    <div 
      class="relative bg-gradient-to-b from-[#2d5a3d] to-[#1a3d26] rounded-lg overflow-hidden"
      :class="large ? 'h-80' : 'h-32'"
      style="aspect-ratio: 3 / 4"
    >
      <!-- Marcação do campo -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Bordas -->
        <rect x="10" y="10" width="280" height="380" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <!-- Linha central -->
        <line x1="10" y1="200" x2="290" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <!-- Círculo central -->
        <circle cx="150" cy="200" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.3)" />
        <!-- Áreas -->
        <rect x="10" y="10" width="280" height="60" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <rect x="10" y="330" width="280" height="60" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <!-- Áreas menores -->
        <rect x="60" y="10" width="180" height="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <rect x="60" y="350" width="180" height="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <!-- Gols -->
        <rect x="120" y="5" width="60" height="10" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" />
        <rect x="120" y="385" width="60" height="10" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" />
      </svg>

      <!-- Posições dos jogadores -->
      <div 
        v-for="(pos, i) in formation.positions"
        :key="i"
        class="absolute transform -translate-x-1/2 -translate-y-1/2"
        :style="{ left: `${pos.x}%`, top: `${pos.y}%` }"
      >
        <div 
          class="rounded-full border-2 border-white flex items-center justify-center font-bold text-white shadow-lg"
          :class="large ? 'w-8 h-8 text-sm' : 'w-4 h-4 text-xs'"
          :style="{ backgroundColor: getColorByRole(i, pos.y) }"
        >
          {{ i === 0 ? 'GK' : (i < 10 ? i : i - 9) }}
        </div>
      </div>
    </div>

    <!-- Nome da formação (modo pequeno) -->
    <div v-if="!large" class="absolute inset-0 flex items-center justify-center">
      <div class="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold">
        {{ formation.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formation: {
    type: Object,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  }
})

const getColorByRole = (index, y) => {
  if (index === 0) return '#FFD700'   
  if (y < 35) return '#FF6B6B'      
  if (y < 70) return '#4ECDC4'        
  return '#45B7D1'                    
}
</script>