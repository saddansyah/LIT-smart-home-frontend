<template>
  <div
    class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
    <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
      <div class="relative">
        <div class="">
          <div class="">
            <img class="w-14 h-14 mr-2" src="https://lunar-inovasi.co.id/_nuxt/img/logoLIT.d7081bb.svg" alt="logo"/>
            <h1 class="my-2 text-gray-800 font-bold text-2xl">
              Looks like you've found the
              doorway to the great nothing
            </h1>
            <p class="my-2 text-gray-800 font-mono">404 - Page Not Found</p>
            <button @click="() => router.go(-1)"
              class="rounded-lg sm:w-full lg:w-auto my-2 md py-4 px-8 text-center bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-opacity-50">Take Me Back</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img class="w-[32em]" src="/notfound.svg" alt="404"/>
    </div>
</div></template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

</script>