<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import HSCService from '@/service/HSCService';
import { ref, onBeforeMount } from 'vue';

const customKPI = ref(null);
const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const filters2 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const idFrozen = ref(false);
const products = ref(null);
const users = ref(null);
const expandedRows = ref([]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);

const customerService = new CustomerService();
const productService = new ProductService();
const hscService = new HSCService();

onBeforeMount(() => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getCustomersLarge().then((data) => {
        customer1.value = data;
        loading1.value = false;
        customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });
    customerService.getCustomersLarge().then((data) => (customer2.value = data));
    customerService.getCustomersMedium().then((data) => (customer3.value = data));

    hscService.getAllKPISetup().then(data => {
        data.map((value, index) => {
            data[index].time = 1703841555;
            data[index].sign = '304304a65d616cf77f9f31dad49b397b';
        })
        customKPI.value = data;
    });

    loading2.value = false;

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
    filters2.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        title: { value: null, matchMode: FilterMatchMode.IN },
        department: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
    };
};

const clearFilter1 = () => {
    initFilters1();
};
const expandAll = () => {
    expandedRows.value = products.value.filter((p) => p.id);
};
const collapseAll = () => {
    expandedRows.value = null;
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customer3.value) {
        for (let customer of customer3.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
};

const saveKPI = (data) => {
    hscService.editKPISetup(data.id, { data: JSON.stringify(data), sign: data.sign, time: data.time });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>KPI Setup</h5>
                <DataTable
                    :value="customKPI" 
                    :scrollable="true" 
                    scrollHeight="400px" 
                    scrollDirection="both" 
                    class="p-datatable-gridlines"
                    :paginator="true"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    v-model:filters="filters2"
                    filterDisplay="menu"
                    :filters="filters2"
                    responsiveLayout="scroll"
                >
                    <Column field="package" header="Package" :style="{ width: '100px' }">
                        <template>
                            <span style="font-size: 15px;">{{ type }}</span><br>
                        </template>
                    </Column>
                    <Column field="registration" header="Registration" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="registration" type="text" v-model.trim="data.registration" />
                        </template>
                    </Column>
                    <Column field="phlebotomy" header="Phlebotomy" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="phlebotomy" type="text" v-model.trim="data.phlebotomy" />
                        </template>
                    </Column>
                    <Column field="vital_vision" header="Vital Signs & Vision Test" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="vital_vision" type="text" v-model.trim="data.vital_vision" />
                        </template>
                    </Column>
                    <Column field="resting_ecg" header="Resting ECG" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="resting_ecg" type="text" v-model.trim="data.ecg" />
                        </template>
                    </Column>
                    <Column field="body_fat_analysis" header="Body Fat Analysis" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="body_fat" type="text" v-model.trim="data.body_fat" />
                        </template>
                    </Column>
                    <Column field="phys_exam" header="Physical Examination (MO)" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="phys_exam" type="text" v-model.trim="data.phys_exam" />
                        </template>
                    </Column>
                    <Column field="spiro" header="Spirometry" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="spiro" type="text" v-model.trim="data.spiro" />
                        </template>
                    </Column>
                    <Column field="stress_test" header="Stress Test" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="stress_test" type="text" v-model.trim="data.stress_test" />
                        </template>
                    </Column>
                    <Column field="rad_1" header="Radiology 1" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="rad_1" type="text" v-model.trim="data.rad_1" />
                        </template>
                    </Column>
                    <Column field="rad_2" header="Radiology 2" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="rad_2" type="text" v-model.trim="data.rad_2" />
                        </template>
                    </Column>
                    <Column field="eye_clinic" header="Eye Clinic" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="eye_clinic" type="text" v-model.trim="data.eye_clinic" />
                        </template>
                    </Column>
                    <Column field="lmc" header="LMC" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="lmc" type="text" v-model.trim="data.lmc" />
                        </template>
                    </Column>
                    <Column field="result_review" header="Result Review" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="result_review" type="text" v-model.trim="data.result_review" />
                        </template>
                    </Column>
                    <Column field="payment" header="Exit (Payment)" :style="{ width: '100px' }">
                        <template #body="{ data }">
                            <InputText id="payment" type="text" v-model.trim="data.payment" />
                        </template>
                    </Column>
                    <Column field="" header="" style="min-width: 5rem; text-align: center;">
                        <template #body="{ data }">
                            <Button label="save" class="mr-2 mb-2" @click="saveKPI(data)"/>
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
