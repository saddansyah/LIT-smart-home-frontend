<script setup>
import { onMounted, ref, watch } from 'vue';
import {
    Chart,
    Colors,
    BubbleController,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js'

Chart.register(
    Colors,
    BubbleController,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend
);

const { chartId, data, past, current, labels } = defineProps(['chartId', 'data', 'past' ,'current', 'labels']);

const chart = ref(null);
const chartType = ref([
    {title: 'Bar Chart', value: 'bar'},
    {title: 'Line Chart', value: 'line'},
]);
const selectedChartType = ref({title: 'Bar Chart', value: 'bar'});
const selectChartType = (item) => {
    selectedChartType.value = item
};

const initChart = () => {
    const ctx = document.getElementById(chartId);
    const chart = new Chart(ctx, {
        type: selectedChartType.value.value,
        data: {
            labels: labels || [],
            datasets:
                [
                    {
                        label: 'Yesterday',
                        data: past || [],
                        borderWidth: 1,
                        backgroundColor: "#d1d5db"
                    },
                    {
                        label: 'Today',
                        data: current || [],
                        borderWidth: 1,
                        backgroundColor: '#256aa1'
                    },
                ],
    
        },
        options: {
            plugins: {
                legend: {
                    position: "top",
                    align: "end"
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kilowatt-hour (kWH)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'time'
                    }
                }
            },
            layout:{
                padding:{
                    bottom: 30
                }
            },
            responsive: true,
        }
    });

    return chart;
}

onMounted(() => {
    chart.value = initChart();
});

watch(selectedChartType , () => {
    chart.value.destroy();
    chart.value = initChart();
})  

</script>

<template>
    <div class="w-full flex justify-end items-center mb-2">
        <div v-ripple class="w-fit rounded-full bg-slate-200 pl-3">
            <p class="inline-block text-base text-right">{{ selectedChartType.title }}</p>
            <v-menu activator="parent">
                <v-list>
                    <v-list-item v-for="item, index in chartType" @click.stop.prevent="selectChartType(item)" :key="index"
                        :title="item.title" v-model="selectedChartType">
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-icon icon="mdi-menu-down"></v-icon>
        </div>
    </div>
    <div class="w-full h-full">
        <canvas :id="chartId" width="auto" height="auto"> </canvas>
    </div>
</template>

<style scoped></style>