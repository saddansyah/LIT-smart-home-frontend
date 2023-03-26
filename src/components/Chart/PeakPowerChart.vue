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
import { today, yesterday } from '@/utils/getTime';

Chart.register(
  Colors,
  BubbleController,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend
);

const { chartId, data } = defineProps(['chartId', 'data'])

onMounted(() => {
    const ctx = document.getElementById(chartId);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data?.map(item => item.hour) || [],
            datasets:
                [
                    {
                        label: 'Yesterday',
                        data: data?.filter(item => String(item.date) === String(yesterday)).map(item => { return { 'x': item.hour, 'y': item.watt } }) || [],
                        borderWidth: 1,
                        backgroundColor: '#d1d5db'
                    },
                    {
                        label: 'Today',
                        data: data?.filter(item => String(item.date) === String(today)).map(item => { return { 'x': item.hour, 'y': item.watt } }) || [],
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

<style scoped>

</style>