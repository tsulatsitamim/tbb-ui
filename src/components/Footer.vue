<script setup lang="ts"></script>

<template>
  <div class="bg-white py-4 flex lg:flex-col">
    <div class="container flex flex-col md:flex-row items-center justify-between px-4">
      <div class="text-muted order-2 md:order-1">
        <span class="font-semibold mr-2">{{ new Date().getFullYear() }}</span>
        <a href="/" class="hover:text-primary" @click.prevent>DTMI UGM</a>
      </div>

      <div class="nav nav-dark">
        <!-- <a href="/" target="_blank" class="nav-link pl-0 pr-5">About</a>
          <a href="/" target="_blank" class="nav-link pl-0 pr-5">Team</a>
          <a href="/" target="_blank" class="nav-link pl-0 pr-0">Contact</a> -->
      </div>
    </div>
  </div>
</template>
