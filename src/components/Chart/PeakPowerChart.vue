<script setup>
import { onMounted, ref } from 'vue';
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
                        data: past || [],
                        borderWidth: 1,
                        backgroundColor: '#d1d5db'
                    },
                    {
                        label: 'Today',
                        data: current || [],
                        borderWidth: 1,
                        backgroundColor: '#0284c7'
                    }
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
                        text: 'Watt (W)'
                    },
                    ticks: {
                        callback: value => `${value} W`
                    }
                },
                x: {
                    title: {
                        display: true,
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

<style scoped></style>