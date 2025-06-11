<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="close" class="close-button">&times;</button>
      </header>
      
      <main class="modal-body">
        <p>{{ description }}</p>
      </main>

      <footer class="modal-footer">
        <button @click="close" class="nice-button">Entendi</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Saiba Mais',
  },
  description: {
    type: String,
    default: 'Aqui vai a descrição detalhada da tática.',
  },
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2c2c2c; /* Cor de fundo escura */
  color: #f0f0f0; /* Cor do texto clara */
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  animation: slide-in 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #aaa;
  cursor: pointer;
}

.close-button:hover {
  color: #fff;
}

.modal-body p {
  line-height: 1.6;
}

.modal-footer {
  text-align: right;
  margin-top: 2rem;
}

.nice-button {
  background-color: #16A249; /* Dourado/Amarelo */
  color: #1a1a1a;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nice-button:hover {
  background-color: #ffc107;
}

/* Animação simples para o modal aparecer */
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>