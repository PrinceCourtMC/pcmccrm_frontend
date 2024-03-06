<script setup>
import { ref, onMounted } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const dropdownValues = ref([
    { name: 'Overall', code: 'OV' },
    { name: 'Registration', code: 'REG' },
    { name: 'Phlebotomy', code: 'PHL' },
    { name: 'Vital Signs & Vision Test', code: 'VST' },
    { name: 'Audio', code: 'AUD' },
    { name: 'Resting ECG', code: 'ECG' },
    { name: 'Body Fat Analysis', code: 'BFA' },
    { name: 'Physical Examination (MO)', code: 'PE' },
    { name: 'Stress Test', code: 'ST' },
    { name: 'Radiology 1', code: 'RAD1' },
    { name: 'Radiology 2', code: 'RAD2' },
    { name: 'Eye Clnic', code: 'EC' },
    { name: 'Lifestyle Modification Centre (LMC)', code: 'LMC' },
    { name: 'Result Review (MO)', code: 'RR' },
    { name: 'Payment', code: 'PYMT' }
]);
const dropdownValue = ref(null);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['01/2023', '02/2023', '03/2023', '04/2023', '05/2023', '06/2023', '07/2023', '08/2023', '09/2023', '10/2023', '11/2023', '12/2023', '01/2024'],
        datasets: [
            {
                label: '<=60 Min',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: '<=90',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                label: '<=120',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                borderColor: documentStyle.getPropertyValue('--green-500'),
                data: [40, 48, 56, 60, 45, 13, 70]
            },
            {
                label: '<=150',
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                data: [55, 45, 78, 23, 88, 23, 90]
            },
            {
                label: '<=180',
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                borderColor: documentStyle.getPropertyValue('--yellow-500'),
                data: [45, 78, 45, 40, 77, 45, 88]
            },
            {
                label: '> 180',
                backgroundColor: documentStyle.getPropertyValue('--red-500'),
                borderColor: documentStyle.getPropertyValue('--red-500'),
                data: [30, 40, 30, 40, 42, 39, 23]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                position: 'left', // Position the legend on the right side
                align: 'center', // Align the legend elements at the start
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

const tableDashboard = ref([
    {
        minutes: '0 - 60',
        month1: '39.72%',
        month2: '21.64%',
        month3: '34.62%',
        month4: '45.08%',
        month5: '41.03%',
        month6: '42.20%',
        month7: '32.79%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '61 - 90',
        month1: '17.02%',
        month2: '14.18%',
        month3: '14.62%',
        month4: '13.11%',
        month5: '14.51%',
        month6: '16.51%',
        month7: '13.11%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '91 - 120',
        month1: '5.67%',
        month2: '9.70%',
        month3: '10.77%',
        month4: '14.75%',
        month5: '11.11%',
        month6: '12.84%',
        month7: '16.39%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '121 - 150',
        month1: '8.51%',
        month2: '10.45%',
        month3: '6.92%',
        month4: '3.28%',
        month5: '8.55%',
        month6: '8.26%',
        month7: '11.48%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '151 - 180',
        month1: '7.09%',
        month2: '6.72%',
        month3: '7.69%',
        month4: '8.20%',
        month5: '9.40%',
        month6: '4.59%',
        month7: '6.56%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '> 180',
        month1: '21.99%',
        month2: '37.31%',
        month3: '25.38%',
        month4: '8.20%',
        month5: '15.38%',
        month6: '15.60%',
        month7: '19.67%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '',
        month1: '',
        month2: '',
        month3: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: '',
        month13: ''
    },
    {
        minutes: 'Within 90 Minutes',
        month1: '56.74%',
        month2: '35.83%',
        month3: '49.24%',
        month4: '58.2%',
        month5: '55.55%',
        month6: '58.72%',
        month7: '49.12%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: '> than 90 Minutes',
        month1: '43.26%',
        month2: '64.18%',
        month3: '50.77%',
        month4: '41.81%',
        month5: '44.44%',
        month6: '41.28%',
        month7: '54.18%',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    },
    {
        minutes: 'Longest waiting time',
        month1: '637 Minutes',
        month2: '679 Minutes',
        month3: '560 Minutes',
        month4: '386 Minutes',
        month5: '409 Minutes',
        month6: '351 Minutes',
        month7: '331 Minutes',
        month8: '32.79%',
        month9: '32.79%',
        month10: '32.79%',
        month11: '32.79%',
        month12: '32.79%',
        month13: '32.79%'
    }
]);
</script>

<template>
    <div class="card">
        <h5>Dashboard</h5>
        <div class="formgroup-inline">
        <Button label="Executive Health" class="p-button-rounded p-button-success mr-2 mb-2" />
        <Button label="Occupational Health" class="p-button-rounded p-button-success mr-2 mb-2" />
        </div>
        <br>

        <div class="formgroup-inline">
            <div class="field">
                <label for="month" class="p-sr-only"></label>
                <InputText id="month" type="month" placeholder="" />
            </div>

            <div class="field">
                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
            </div>
            <Button label="Search"></Button>
        </div>
    </div>
    <div class="card">
        <center><h5 style="font-weight: 700">HSC Lapse Time (Exit - Register)</h5></center>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem"  />
        <br><br><br>
        <div>
            <DataTable :value="tableDashboard" tableStyle="min-width: 50rem">
                <Column field="minutes" header="Minutes" style="font-weight: 700"></Column>
                <Column field="month1" header="01/2023" style="text-align: center"></Column>
                <Column field="month2" header="02/2023" style="text-align: center"></Column>
                <Column field="month3" header="03/2023" style="text-align: center"></Column>
                <Column field="month4" header="04/2023" style="text-align: center"></Column>
                <Column field="month5" header="05/2023" style="text-align: center"></Column>
                <Column field="month6" header="06/2023" style="text-align: center"></Column>
                <Column field="month7" header="07/2023" style="text-align: center"></Column>
                <Column field="month8" header="08/2023" style="text-align: center"></Column>
                <Column field="month9" header="09/2023" style="text-align: center"></Column>
                <Column field="month10" header="10/2023" style="text-align: center"></Column>
                <Column field="month11" header="11/2023" style="text-align: center"></Column>
                <Column field="month12" header="12/2023" style="text-align: center"></Column>
                <Column field="month13" header="01/2024" style="text-align: center"></Column>
            </DataTable>
        </div>
    </div>
</template>
