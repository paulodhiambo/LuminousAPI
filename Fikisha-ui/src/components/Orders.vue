<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <span> List of All Orders</span>
        <v-spacer />
               <v-row>
                <v-col cols="12" md="6" class="mt-2">
                      <v-select
                        v-model="selectedStatus"
                        prepend-inner-icon="filter_alt"
                        color="primary"
                        dense
                        :items="status"
                        :item-text="(item) => item.name"
                        :item-value="(item) => item.name"
                        label="Filter by Status"
                        @change="filterOrderslList"
                      ></v-select>
                </v-col>
              </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table
          :items-per-page="10"
          :headers="headers"
          :items="ordersList"
        >
        <template v-slot:[`item.ID`]="{ index }">
          <!-- <template v-slot:item.ID="{ index }"> -->
            <span>{{ index + 1 }}</span>
          </template>
         <template v-slot:[`item.orderNumber`]="{ item }">
        <span>{{item.orderNumber }}</span>
         </template>
        <template v-slot:[`item.customer_id`]="{ item }">
        <span>{{item.customer.name }}</span>
         </template>
        <template v-slot:[`item.description`]="{ item }">
        <span>{{item.description }}</span>
         </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip small :color="item.status==='Pending'?'warning': item.status==='Loading'?'info':'success'">{{item.status }}</v-chip>
         </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ordersList",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("getOrders");
    });
  },
  data: () => ({
    headers: [
      { text: "#S/N", value: "ID" },
      { text: "Order Number", value: "orderNumber" },
      { text: "Customer", value: "customer_id" },
      { text: "Description", value: "description" },
      {text: "Status", value:"status"}
    ],
    status: [
        {name:'Pending'},
        {name:'Loading'},
        {name:'Dispatched'},
        {name:'Delivered'}
    ],
    selectedStatus: '',
    Status: ''
  }),
  computed: {
    ordersList() {
    if (this.Status !== '') {
        return this.$store.getters['orders'].filter(
          (a) => a.status === this.Status
        )
      } else {
        return this.$store.getters['orders']
      }
    },
  },
  methods: {
    filterOrderslList () {
      this.Status = this.selectedStatus
    }
  }
};
</script>
<style scoped>
</style>
