<template>
    <div class="main w-full h-56 mb-6">
        <div class="device-container flex flex-row w-full h-full gap-6">
            <div v-ripple class="device-title flex flex-col basis-[20%] min-w-fit p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200">
                <v-icon icon="mdi-ceiling-light" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                <div class="content-center-top">
                    <h3 class="font-bold text-2xl lg:text-3xl mb-1">Title</h3>
                    <v-chip size="small" color="green" class="font-semibold">category</v-chip>
                    <h4 class="text-base mt-1">State: OFF</h4>
                </div>
            </div>
            
            <div v-ripple class="device-usage flex flex-col items-center basis-[30%]  min-w-fit p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200">
                <v-icon icon="mdi-lightning-bolt" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                <h3 class="font-semibold text-xl mb-1">Total Energy Usage</h3>
                <h3 class="font-bold text-2xl lg:text-4xl mb-1">120</h3>
                <h4 class="text-base text-gray-400 mt-1">kilowatt-hour (kWH)</h4>
            </div>
            <div v-ripple class="inline-block w-full h-full min-w-fit basis-[50%] p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200">
                <!-- Chart here -->
            </div>
        </div>
    </div>
</template>