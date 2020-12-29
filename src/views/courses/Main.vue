<template>
  <!-- Re-renders component when params change, not very efficient -->
  <router-view :key="$route.fullPath" />
</template>
