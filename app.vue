<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <Toaster rich-colors position="top-right" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>