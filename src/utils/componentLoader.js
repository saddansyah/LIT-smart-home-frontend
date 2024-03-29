// Main Dashboard Components
import FavoriteDevicesCard from '@/components/FavoriteDevicesCard.vue';
import UsageCalculator from '@/components/UsageCalculator.vue'

// Energy Consumption Components
import EnergyContainerAll from '@/components/EnergyConsumption/EnergyContainerAll.vue';
import PowerContainerAll from '@/components/EnergyConsumption/PowerContainerAll.vue';
import EnergyContainerDevice from '@/components/EnergyConsumption/EnergyContainerDevice.vue';
import PowerContainerDevice from '@/components/EnergyConsumption/PowerContainerDevice.vue';

// Device Components
import AddDevice from '@/components/Device/AddDevice.vue';
import EditDevice from '@/components/Device/EditDevice.vue';
import DevicesCard from '@/components/DevicesCard.vue';

// Chart Components
import PeakPowerChart from '@/components/Chart/PeakPowerChart.vue';
import EnergyUsageChart from '@/components/Chart/EnergyUsageChart.vue';

// Loading Components
import FavoriteDeviceLoading from '@/components/Loading/FavoriteDeviceLoading.vue';
import MainDashboardLoading from '@/components/Loading/MainDashboardLoading.vue';
import BasicLoading from '@/components/Loading/BasicLoading.vue';
import GraphLoading from '@/components/Loading/GraphLoading.vue';
import LineLoading from '@/components/Loading/LineLoading.vue';
import ButtonLoading from '@/components/Loading/ButtonLoading.vue';

import NotifySnackbar from '@/components/Snackbars/NotifySnackbar.vue';
import WarningSnackbar from '@/components/Snackbars/WarningSnackbar.vue';

// Other Components
import ModalDelete from '@/components/ModalDelete.vue';
import ModalLogout from '@/components/ModalLogout.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export {
    FavoriteDevicesCard,
    UsageCalculator,
    EnergyContainerAll,
    PowerContainerAll,
    EnergyContainerDevice,
    PowerContainerDevice,
    AddDevice,
    EditDevice,
    DevicesCard,
    PeakPowerChart,
    EnergyUsageChart,
    ModalDelete,
    ModalLogout,
    NotifySnackbar,
    WarningSnackbar,
    FavoriteDeviceLoading,
    MainDashboardLoading,
    BasicLoading,
    GraphLoading,
    LineLoading,
    ButtonLoading,
    Navbar,
    Footer
}