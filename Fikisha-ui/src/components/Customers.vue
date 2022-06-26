<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <span>Customer List</span>
        <v-spacer />
        <div class="ma-2">
          <v-btn
            class="indigo white--text"
            :to="{
              name: 'customerForm',
            }"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>Add Customer
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table
          :items-per-page="10"
          :headers="headers"
          :items="customerList"
        >
        <template v-slot:[`item.ID`]="{ index }">
          <!-- <template v-slot:item.ID="{ index }"> -->
            <span>{{ index + 1 }}</span>
          </template>
         <template v-slot:[`item.name`]="{ item }">
        <span>{{item.name }}</span>
         </template>
        <template v-slot:[`item.email`]="{ item }">
        <span>{{item.email }}</span>
         </template>
        <template v-slot:[`item.phone`]="{ item }">
        <span>{{item.phone }}</span>
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
                    :to="{ name: 'customerForm', params: { code : item.id }}"
                >
                  <v-icon color="info" size="">mdi-eye</v-icon>
                  View
                </v-list-item>
                <v-list-item
                  @click="removeCustomer(item)"
                >
                  <v-icon color="error" size="">mdi-delete</v-icon>
                  Remove
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CustomerList",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("getCustomers");
    });
  },
  data: () => ({
    headers: [
      { text: "#S/N", value: "ID" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Actions", value: "action" },
    ],
  }),
  computed: {
    customerList() {
      return this.$store.getters['customers'];
    },
  },
  methods: {
    removeCustomer(item) {
      this.$store.dispatch('removeCustomer', item.id)
    },
  },
};
</script>
<style scoped>
</style>