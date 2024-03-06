<script setup>
import { ref } from 'vue';

const customEvents = ref([
    {
        status: 'Registration',
        date: '20/12/2022',
        time: '08:20 AM',
        color: '#1dc546',
        message : 'You have completed this checkpoint at 08:30 AM'
    },
    {
        status: 'Phlebotomy',
        date: '20/12/2022',
        time: '08:35 AM',
        color: '#1dc546',
        message : 'You have completed this checkpoint at 08:45 AM'
    },
    {
        status: 'Vital Signs & Vision Test',
        date: '20/12/2022',
        time: '08:50 AM',
        color: '#1dc546',
        message : 'You have completed this checkpoint at 08:55 AM'
    },
    {
        status: 'Audio',
        date: '20/12/2022',
        time: '09:00 AM',
        color: '#e7d74a',
        message : 'You are currently at this checkpoint.'
    },
    {
        status: 'Resting ECG',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Body Fat Analysis',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Physical Examination (MO)',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Stress Test',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Radiology 1',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Radiology 2',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Eye Clinic',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Life Modification Centre (LMC)',
        date: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Result Review (MO)',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    },
    {
        status: 'Payment',
        date: '',
        time: '',
        color: '#c1bfb1',
        message : 'This checkpoint has not been attended yet.'
    }
]);

const horizontalEvents = ref(['2020', '2021', '2022', '2023']);
</script>

<template>
    <div class="card">
        <h5>Hi, Ainin Sofea</h5>
        <div class="card" style="text-align: center;">
            <center><img src="/layout/images/pcmc2.png"   style="width: 200px; height: 90px;" /></center>
            <span style="font-size: 15px;">Health Screening Centre</span><br>
            <span style="font-size: 15px;">Wednesday, 20 Dec 2023 8:30 AM</span><br>
            <span style="font-size: 15px;">Executive Health Screening</span><br>
            <span style="font-size: 15px;">Signature Female</span><br><br>
            <span style="font-size: 20px; font-weight: 700;">G1005</span><br>
            <span style="font-size: 12px;">Encounter No : 335678</span><br>
            <span style="font-size: 12px;">Current Counter : Audiometry</span>
        </div>
        <Timeline :value="customEvents">
            <template #marker="slotProps">
                <span class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2" :style="{ backgroundColor: slotProps.item.color }">
                <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <small class="p-text-secondary">{{ slotProps.item.message }}</small>
            </template>
            <template #opposite="slotProps">
                {{ slotProps.item.status }}<br>
                <small class="p-text-secondary">{{ slotProps.item.date }}</small><br>
                <small class="p-text-secondary">{{ slotProps.item.time }}</small>
            </template>
        </Timeline>
    </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row !important;

            .p-timeline-event-content {
                text-align: left !important;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }

        .p-card {
            margin-top: 1rem;
        }
    }
}
</style>
