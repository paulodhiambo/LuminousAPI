<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <span>Vehicles</span>
        <v-spacer />
            <v-row>
                <v-col cols="12" md="8" class="mt-2">
                      <v-select
                        v-model="selectedStatus"
                        prepend-inner-icon="filter_alt"
                        color="primary"
                        dense
                        :items="status"
                        :item-text="(item) => item.name"
                        :item-value="(item) => item.name"
                        label="Filter by Status"
                        @change="filterFleetlList"
                      ></v-select>
                </v-col>
              </v-row>
        <v-spacer/>
        <div class="ma-2">
          <v-btn
            class="indigo white--text"
            @click="openModal()"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>Add Vehicle
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table
          :items-per-page="10"
          :headers="headers"
          :items="fleetList"
        >
          <template v-slot:[`item.ID`]="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-slot:[`item.registration_number`]="{ item }">
            <span>{{ item.registration_number }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip small :color="item.status==='Available'?'warning': item.status==='Loading'?'info':'success'">{{item.status }}</v-chip>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-menu open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-capitalize links"
                  text
                  v-bind="attrs"
                  v-on="on"
                  small
                  ><v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="getVehicle(item)"
                >
                  <v-icon color="info" size="">mdi-eye</v-icon>
                  View
                </v-list-item>
                <v-list-item @click="removeVehicle(item)">
                  <v-icon color="error" size="">mdi-delete</v-icon>
                  Remove
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
        <v-dialog v-model="dialog" persistent max-width="300px">
          <v-card>
            <v-app-bar color="indigo" class="white--text"> {{ isEdit ? `Edit` : "Add" }} Vehicle</v-app-bar>
            <v-divider></v-divider>
            <v-card-text>
              <v-row class="mt-4">
                <v-col cols="12" md="12">
                    <v-form ref="vehicleForm" v-model="isValid">
                  <v-text-field
                    dense
                    label="Vehicle Number plate"
                    outlined
                    v-model="formData.registrationNumber"
                    placeholder="Enter Vehicle Number Plate"
                    :rules="[rules.required]"
                  ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="red darken-1" text @click="closeModal">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "fleetList",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("getVehicles");
    });
  },
  data: () => ({
    headers: [
      { text: "#S/N", value: "ID" },
      { text: "Number Plate", value: "registrationNumber" },
      {text: "Status", value:"status"},
      { text: "Actions", value: "action" },
    ],
    dialog: false,
    isEdit: false,
    isValid: true,
    selectedStatus: '',
    Status: '',
    rules: {
        required: (value) => !!value || 'Required.',
      },
      formData:{
          registrationNumber: '',
          status:''
      },
    status: [
        {name:'Available'},
        {name:'Loading'},
        {name:'On Transit'}
    ],
  }),
  computed: {
    fleetList() {
    if (this.Status !== '') {
        return this.$store.getters['vehicles'].filter(
          (a) => a.status === this.Status
        )
      } else {
        return this.$store.getters['vehicles']
      }
    },
    vehicle () {
      return this.$store.getters['vehicle']
    }
  },
  methods: {
    removeVehicle(item) {
      this.$store.dispatch("removeVehicle", item.id);
    },
    openModal(){
        this.dialog=true
    },
    getVehicle(item){
     this.$store.dispatch("getVehicle", item.id);
     this.isEdit= true
     this.dialog=true
    },
    closeModal(){
        this.$refs.vehicleForm.reset()
        this.isEdit=false
        this.dialog=false
    },
    save() {    
      if (!this.isValid) {
        this.$refs.vehicleForm.validate()
      } else {
        if (this.isEdit) {
      this.$store.dispatch('updateVehicle', { ...this.formData})
      this.closeModal()
      }else{
        this.formData.status ='Available'
        this.$store.dispatch('addVehicle', { ...this.formData})
        this.closeModal()
      }
    }
    },
    filterFleetlList () {
      this.Status = this.selectedStatus
    }
  },
 watch: {
    vehicle() {
        if (this.isEdit) {
          this.formData = { ...this.vehicle }
        }
    },
  },
  fleetList(){
      return this.fleetList
  }
};
</script>
<style scoped>
</style>
