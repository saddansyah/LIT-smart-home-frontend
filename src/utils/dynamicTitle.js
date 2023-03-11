const dynamicTitle = ({computed, useRoute}) => {
    const route = useRoute();
    const params = computed(() => route.params.deviceId);
    
    document.title = `${params.value} | Smart Home`;
}

export default dynamicTitle;