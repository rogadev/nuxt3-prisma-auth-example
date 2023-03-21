<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import './assets/css/tailwind.css';
const availableThemes = {
  light: 'cupcake',
  dark: 'dark',
};
const colorMode = useColorMode();
const theme = ref(colorMode.value === 'light' ? availableThemes.light : availableThemes.dark);
watch(colorMode, () => {
  theme.value = colorMode.value === 'dark' ? availableThemes.light : availableThemes.dark;
});
useHead({
  htmlAttrs: computed(() => ({
    'data-theme': theme.value
  }))
});
</script>