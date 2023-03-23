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
                        label: 'Yesterday',
                        data: [13, 19, 3, 5, 2, 3, 8],
                        borderWidth: 1,
                        backgroundColor: "#d1d5db"
                    },
                    {
                        label: 'Today',
                        data: [12, 20, 3, 5],
                        borderWidth: 1,
                        backgroundColor: '#059669'
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