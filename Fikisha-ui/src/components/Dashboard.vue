<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
            flat
            style="background-color: #ffffff"
            elevation="0"
            class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{customers?
                    customers.length:0
                  }}</v-list-item-title>
                  <v-list-item-subtitle>Customers</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-account-multiple</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
            flat
            style="background-color: #ffffff"
            elevation="0"
            class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{orders?
                    orders.length:0
                  }}</v-list-item-title>
                  <v-list-item-subtitle>Orders</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-playlist-check</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
            flat
            style="background-color: #ffffff"
            elevation="0"
            class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{vehicles?
                    vehicles.length:0
                  }}</v-list-item-title>
                  <v-list-item-subtitle>Vehicles</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-car-pickup</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title> Allocate Orders </v-card-title>
             <v-divider/>
          <v-card-text>
            <div class="mx-3">
              <v-form ref="loadingForm" v-model="isValid">
                <v-row> </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-select
                          outlined
                          dense
                          v-model="formData.orderNumber"
                          :items="pendingOrders"
                          :item-text="(item) => item.orderNumber"
                          :item-value="(item) => item.id"
                          label="Select Order"
                          :rules="[rules.required]"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-select
                          outlined
                          dense
                          v-model="formData.fleet_id"
                          :items="availableVehicles"
                          :item-text="(item) => item.registrationNumber"
                          :item-value="(item) => item.id"
                          label="Select Vehicle"
                          :rules="[rules.required]"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="resetform"
                class="mr-2"
                elevation="0"
                color="error"
              >
                <span> RESET </span>
              </v-btn>
              <v-btn
                @click="allocate"
                class="mr-2"
                elevation="0"
                color="primary"
              >
                <span> ALLOCATE </span>
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title> Dispatch Orders </v-card-title>
          <v-divider/>
          <v-card-text>
            <div class="mx-3">
              <v-form ref="dispatchForm" v-model="isValid">
                <v-row> </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-select
                      outlined
                      dense
                      v-model="dispatchForm.fleet_id"
                      :items="loadedVehicles"
                      :item-text="(item) => item.registrationNumber"
                      :item-value="(item) => item.id"
                      label="Select Vehicle"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="resetDispatchForm"
              class="mr-2"
              elevation="0"
              color="error"
            >
              <span> Reset </span>
            </v-btn>
            <v-btn
              @click="dispatchOrders"
              class="mr-2"
              elevation="0"
              color="primary"
            >
              <span> Dispatch </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "userDashboard",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("getOrders");
      v.$store.dispatch("getVehicles");
      v.$store.dispatch("getCustomers");
    });
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    formData: {
      orderNumber: "",
      fleet_id: "",
      status: "",
    },
    dispatchForm: {
      orderNumber: "",
      fleet_id: "",
      status: "",
      customer_id: "",
    },
    isValid: true,
  }),
  computed: {
    orders() {
      console.log(this.$store.getters["orders"]);
      return this.$store.getters["orders"];
    },
    vehicles() {
      return this.$store.getters["vehicles"];
    },
    customers() {
      return this.$store.getters["customers"];
    },
    loadedVehicles() {
      return this.vehicles.filter((a) => a.status === "Loading");
    },
    availableVehicles() {
      console.log( this.vehicles)
      return this.vehicles.filter(
        (a) => a.status === "Available" || a.status === "Loading"
      );
    },
    pendingOrders() {
      console.log( this.orders)
      return this.orders.filter((a) => a.status === "Pending");
    },
  },
  methods: {
    allocate() {
      if (!this.isValid) {
        this.$refs.loadingForm.validate();
      } else {
        this.formData.status = "Loading";
        this.$store.dispatch("allocateOrder", { ...this.formData });
        this.$refs.loadingForm.reset();
      }
    },
    dispatchOrders() {
      if (!this.isValid) {
        this.$refs.dispatchForm.validate();
      } else {
        this.$store.dispatch("dispatchOrders", { ...this.dispatchForm });
        this.$refs.dispatchForm.reset();
      }
    },
    resetform() {
      this.$refs.loadingForm.reset();
    },
    resetDispatchForm() {
      this.$refs.dispatchForm.reset();
    },
    getCustomer() {
      let selectedOrder = this.orders.filter(
        (a) => a.id === this.dispatchForm.order_number
      );
      this.dispatchForm.customer_id = selectedOrder[0].customer_id;
    },
  },
};
</script>
<style scoped>
</style>
