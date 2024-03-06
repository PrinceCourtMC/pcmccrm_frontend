<script setup>
import HSCService from '@/service/HSCService';
import { ref, reactive, onBeforeMount } from 'vue';

const HSCList = ref(null);
const modelRef = reactive({
    startdate: '2024-01-07',
    enddate: '2024-01-30',
});

const hscService = new HSCService();

//get data from backend api
onBeforeMount(() => {
    hscService.getAllHSCList({time: 1703841555, sign:'304304a65d616cf77f9f31dad49b397b', data:"{'startdate':'"+modelRef.startdate+"','enddate':'"+modelRef.enddate+"','status':'1'}"}).then(data => {
        HSCList.value = data;
    });
});

//get data from backend api (based on api)
const handleSearch = (status) => {
    hscService.getAllHSCList({time: 1703841555, sign:'304304a65d616cf77f9f31dad49b397b', data:"{'startdate':'"+modelRef.startdate+"','enddate':'"+modelRef.enddate+"','status':'"+status+"'}"}).then(data => {
        HSCList.value = data;
    });

};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-4" @click="handleSearch(1)">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Current Patient</span>
                        <div class="text-900 font-medium text-xl">152</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sync text-blue-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4" @click="handleSearch(2)">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Completed Patient</span>
                        <div class="text-900 font-medium text-xl">50</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check text-green-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Average Waiting Time / Total Patient</span>
                        <div class="text-900 font-medium text-xl">101 Mins / 10</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-clock text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <h5>HSC Journey List</h5>
                <div class="formgroup-inline">
                    <div class="field">
                        <label for="firstname1" class="p-sr-only"></label>
                        <InputText v-model="modelRef.startdate" id="firstname1" type="date" placeholder="date" />
                    </div>
                    <div class="field">
                        <label for="firstname1" class="p-sr-only"></label>
                        <InputText v-model="modelRef.enddate" id="firstname1" type="date" placeholder="date" />
                    </div>
                    <Button label="Search" @click="handleSearch(0)"></Button>
                </div>

                <DataTable
                    :value="HSCList"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    filterDisplay="menu"
                    responsiveLayout="scroll"
                >
                    <Column field="queue_number" header="queue_number" style="min-width: 4rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            {{ data.queue_number }}
                        </template>
                    </Column>
                    <Column field="ic_number" header="ic_number" style="min-width: 4rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            {{ data.ic_number }}
                        </template>
                    </Column>
                    <Column field="encouter_no" header="encouter_no" style="min-width: 4rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            {{ data.encouter_no }}
                        </template>
                    </Column>
                    <Column field="location" header="location" style="min-width: 4rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            {{ data.location }}
                        </template>
                    </Column>
                    <Column field="queue_type" header="queue_type" style="min-width: 12rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            {{ data.queue_type }}
                        </template>
                    </Column>
                    <Column field="created_at" header="created_at" dataType="date" style="min-width: 4rem" :sortable="true">
                        <template #body="{ data }">
                            {{ data.created_at }}
                        </template>
                    </Column>
                    <Column field="registration" header="Reg" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Registration' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Registration' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="phlebotomy" header="Phle" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Phlebotomy' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Phlebotomy' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="vital_vision" header="Vital & Vision" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Vital Signs & Vision Test' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Vital Signs & Vision Test' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="audio" header="Audio" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Audio' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Audio' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="resting_ecg" header="ECG" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Resting ECG' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Resting ECG' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="body_fat_analysis" header="Body Fat" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Body Fat Analysis' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Body Fat Analysis' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="phys_exam" header="Phys Exam" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Physical Examination' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Physical Examination' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="spiro" header="Spiro" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Spirometry' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Spirometry' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="stress_test" header="Stress Test" style="min-width: 4rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Stress Test' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Stress Test' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="rad_1" header="Rad 1" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Radiology 1' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Radiology 1' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="rad_2" header="Rad 2" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Radiology 2' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Radiology 2' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="eye_clinic" header="Eye Clinic" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Eye Clinic' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Eye Clinic' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="lmc" header="LMC" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'LMC' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'LMC' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="result_review" header="Result Rev" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Result Review' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Result Review' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                    <Column field="payment" header="Exit" style="min-width: 5rem; text-align: center;" :sortable="true">
                        <template #body="{ data }">
                            <template v-if="data.services">
                                <Button v-if="data.services.some(dep => dep.name === 'Payment' && dep.end_serving_time !== null)" class="p-button-rounded p-button-success mr-2 mb-2"/>
                                <Button v-else-if="data.services.some(dep => dep.name === 'Payment' && dep.end_serving_time === null)" class="p-button-rounded p-button-warning mr-2 mb-2"/>
                                <Button v-else class="p-button-rounded p-button-secondary mr-2 mb-2" />
                            </template>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
