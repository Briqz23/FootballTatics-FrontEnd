<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1001] p-4 animate-fade-in">
    <div class="bg-[#1a1919] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100 transition-transform duration-300">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h2 class="text-2xl font-bold text-white">
            {{ title }}
          </h2>
          <button @click="close" class="text-gray-400 hover:text-white transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="modal-body space-y-4">
          <p class="text-gray-300 mb-4">{{ message }}</p>

          <div v-if="suggestedTactics.length > 0" class="space-y-3">
            <div
              v-for="tactic in suggestedTactics"
              :key="tactic.nome"
              @click="selectAndClose(tactic)"
              class="bg-[#252525] p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-[#16A249]/20 transition-colors border border-transparent hover:border-[#16A249]"
            >
              <img :src="tactic.imagem" :alt="tactic.nome" class="w-12 h-12 object-contain rounded-md flex-shrink-0">
              <div class="flex-grow">
                <h4 class="text-lg font-semibold text-white">{{ tactic.nome }}</h4>
                <p class="text-sm text-green-300 italic">{{ tactic.justificativa }}</p>
              </div>
              <ChevronRight class="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
          <div v-else class="text-center text-gray-400 py-8">
            <Info class="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>Não encontramos táticas que se encaixem perfeitamente no momento.</p>
            <p class="text-sm mt-2">Tente novamente mais tarde ou ajuste seu elenco!</p>
          </div>
        </div>

        <div class="modal-footer text-right mt-6 pt-4 border-t border-gray-700">
          <button
            @click="close"
            class="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, ChevronRight, Info } from 'lucide-vue-next';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Sugestão de Táticas',
  },
  message: {
    type: String,
    default: 'Baseado na análise do seu elenco, estas são as táticas mais adequadas:',
  },
  suggestedTactics: { 
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close', 'select-tactic']);

const close = () => {
  emit('close');
};

const selectAndClose = (tactic) => {
  emit('select-tactic', tactic);
  close();
};
</script>

<style scoped>
/* Animação de fade-in para o overlay */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animação de slide-in para o conteúdo do modal */
.modal-content {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>