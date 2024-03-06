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
        labels: ['01/12/2023 (Fri)', '02/12/2023 (Sat)', '03/12/2023 (Sun)', '04/12/2023 (Mon)', '05/12/2023 (Tue)', '06/12/2023(Wed)', '07/12/2023 (Thu)'],
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
        day1: '39.72%',
        day2: '21.64%',
        day3: '34.62%',
        day4: '45.08%',
        day5: '41.03%',
        day6: '42.20%',
        day7: '32.79%'
    },
    {
        minutes: '61 - 90',
        day1: '17.02%',
        day2: '14.18%',
        day3: '14.62%',
        day4: '13.11%',
        day5: '14.51%',
        day6: '16.51%',
        day7: '13.11%'
    },
    {
        minutes: '91 - 120',
        day1: '5.67%',
        day2: '9.70%',
        day3: '10.77%',
        day4: '14.75%',
        day5: '11.11%',
        day6: '12.84%',
        day7: '16.39%'
    },
    {
        minutes: '121 - 150',
        day1: '8.51%',
        day2: '10.45%',
        day3: '6.92%',
        day4: '3.28%',
        day5: '8.55%',
        day6: '8.26%',
        day7: '11.48%'
    },
    {
        minutes: '151 - 180',
        day1: '7.09%',
        day2: '6.72%',
        day3: '7.69%',
        day4: '8.20%',
        day5: '9.40%',
        day6: '4.59%',
        day7: '6.56%'
    },
    {
        minutes: '> 180',
        day1: '21.99%',
        day2: '37.31%',
        day3: '25.38%',
        day4: '15.57%',
        day5: '15.38%',
        day6: '15.60%',
        day7: '19.67%'
    },
    {
        minutes: '',
        day1: '',
        day2: '',
        day3: '',
        day4: '',
        day5: '',
        day6: '',
        day7: ''
    },
    {
        minutes: 'Within 90 Minutes',
        day1: '56.74%',
        day2: '35.83%',
        day3: '49.24%',
        day4: '58.2%',
        day5: '55.55%',
        day6: '58.72%',
        day7: '49.12%'
    },
    {
        minutes: '> than 90 Minutes',
        day1: '43.26%',
        day2: '64.18%',
        day3: '50.77%',
        day4: '41.81%',
        day5: '44.44%',
        day6: '41.28%',
        day7: '54.18%'
    },
    {
        minutes: 'Longest waiting time',
        day1: '637 Minutes',
        day2: '679 Minutes',
        day3: '560 Minutes',
        day4: '386 Minutes',
        day5: '409 Minutes',
        day6: '351 Minutes',
        day7: '331 Minutes'
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
                <label for="firstname1" class="p-sr-only">Firstname</label>
                <InputText id="firstname1" type="date" placeholder="" />
            </div>
            <div class="field">
                <label for="lastname1" class="p-sr-only">Lastname</label>
                <InputText id="lastname1" type="date" placeholder="" />
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
                <Column field="day1" header="01/12/2023 (Fri)" style="text-align: center"></Column>
                <Column field="day2" header="02/12/2023 (Sat)" style="text-align: center"></Column>
                <Column field="day3" header="03/12/2023 (Sun)" style="text-align: center"></Column>
                <Column field="day4" header="04/12/2023 (Mon)" style="text-align: center"></Column>
                <Column field="day5" header="05/12/2023 (Tue)" style="text-align: center"></Column>
                <Column field="day6" header="06/12/2023 (Wed)" style="text-align: center"></Column>
                <Column field="day7" header="07/12/2023 (Thu)" style="text-align: center"></Column>
            </DataTable>
        </div>
    </div>
</template>
