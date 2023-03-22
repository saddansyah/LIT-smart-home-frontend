// Main Dashboard Components
import FavoriteDevicesCard from '@/components/FavoriteDevicesCard.vue';

// Energy Consumption Components
import EnergyContainerAll from '@/components/EnergyConsumption/EnergyContainerAll.vue';
import PowerContainerAll from '@/components/EnergyConsumption/PowerContainerAll.vue';
import EnergyContainerDevice from '@/components/EnergyConsumption/EnergyContainerDevice.vue';
import PowerContainerDevice from '@/components/EnergyConsumption/PowerContainerDevice.vue';

// Device Components
import AddDevice from '@/components/Device/AddDevice.vue';
import EditDevice from '@/components/Device/EditDevice.vue';
import DevicesCard from '@/components/DevicesCard.vue';

// Chart Component
import PeakPowerChart from '@/components/Chart/PeakPowerChart.vue';
import EnergyUsageChart from '@/components/Chart/EnergyUsageChart.vue';

// Other Components
import ModalDelete from '@/components/ModalDelete.vue';

export {
    FavoriteDevicesCard,
    EnergyContainerAll,
    PowerContainerAll,
    EnergyContainerDevice,
    PowerContainerDevice,
    AddDevice,
    EditDevice,
    DevicesCard,
    PeakPowerChart,
    EnergyUsageChart,
    ModalDelete
}