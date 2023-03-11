<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto'

const { chartId } = defineProps(['chartId'])

onMounted(() => {
    const ctx = document.getElementById(chartId);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets:
                [
                    {
                        label: 'Today',
                        data: [12, 20, 3, 5, 12, 4, 19],
                        borderWidth: 1,
                        backgroundColor: '#22c55e'
                    },
                    {
                        label: 'Yesterday',
                        data: [13, 19, 3, 5, 2, 3, 8],
                        borderWidth: 1,
                        backgroundColor: "#6b7280"
                    },
                ],

        },
        options: {
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
            responsive: true
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