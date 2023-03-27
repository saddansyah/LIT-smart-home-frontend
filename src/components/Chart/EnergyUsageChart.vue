<script setup>
import { onMounted } from 'vue';
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

onMounted(() => {
    const ctx = document.getElementById(chartId);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels || [],
            datasets:
                [
                    {
                        label: 'Yesterday',
                        // data: data?.filter(item => String(item.date) === String(past)).map(item => { return { 'x': item.hour, 'y': item.kwh } }) || [],
                        data: past || [],
                        borderWidth: 1,
                        backgroundColor: "#d1d5db"
                    },
                    {
                        label: 'Today',
                        // data: data?.filter(item => String(item.date) === String(current)).map(item => { return { 'x': item.hour, 'y': item.kwh } }) || [],
                        data: current || [],
                        borderWidth: 1,
                        backgroundColor: '#059669'
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
            responsive: true,
        }
    });
});

</script>

<template>
    <canvas :id="chartId" width="auto"> </canvas>
</template>

<style scoped>
:host {
    display: block;
    width: 100%;
    height: 100%;
}
</style>