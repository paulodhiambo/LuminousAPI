<template>
  <v-container class="fade-transition">
    <v-card elevation="0" tile class="mx-auto">
      <v-card-title elevation="0" dense color="#ffffff">
        <v-btn color="red darken-1" text elevation="0" class="mr-2" @click="$router.back()">
          <v-icon class="mx-1">mdi-arrow-left-thin</v-icon>
          back
        </v-btn>
        <div class="text-h6"> {{ $route.params.code ? `Edit` : "Add" }} Customer Details</div><v-spacer/>
        <v-btn  v-if="displayActions"
          class="mr-2"
          color="error"
          elevation="0"
          @click="removeCustomer"
        >
          <v-icon small class="mx-2">delete</v-icon>
           <span>Delete</span>
        </v-btn>
        <v-btn
          @click="save"
          class="mr-2"
          elevation="0"
          color="primary"
        >
          <v-icon small class="mx-2">
            mdi-content-save
          </v-icon>
          <span> {{ $route.params.code ? `Save Changes` : "Save" }} </span>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="mx-3">
          <v-form ref="customerForm" v-model="isValid">
              <v-row>
                <v-col cols="12" md="4" offset-md="8">
                    <div v-if="$route.query.edit" class="mt-n2">
                      <span class="font-weight-medium">STATUS:</span>
                        <v-chip
                          class="mb-1 ml-1"
                          color="blue"
                          text-color="white"
                          small
                          dense
                        >
                          {{formData.status}}
                        </v-chip>
                    </div>
                </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          dense
                          label="Customer Name"
                          outlined
                          v-model="formData.name"
                          placeholder="Enter Customer Name"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          dense
                          label="Customer Email"
                          v-model="formData.email"
                          outlined
                          placeholder="Enter Customer Email"
                          :rules="[rules.required, rules.emailRules]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          dense
                          label="Customer Phone"
                          v-model="formData.phone"
                          outlined
                          placeholder="Enter Customer Phone"
                          prepend-inner-icon="mdi-card-account-details"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'customerForm',
  data: function () {
    return {
      isValid: true,
      formData: {
        name: '',
        email: '',
        phone: '',
      },
      rules: {
        required: (value) => !!value || 'Required.',
         emailRules:(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((v) => {
      if (v.$route.params.code) {
        v.$store.dispatch(
          'getCustomer',
          v.$route.params.code
        )
      }
    })
  },
  computed: {
    customer () {
      return this.$store.getters['customer']
    },
    displayActions () {
      return this.$route.params.code
    },
  },
  watch: {
    customer() {
        if (this.$route.params) {
          this.formData = { ...this.customer }
        }
    },
  },
  methods: {
    save() {    
      if (!this.isValid) {
        this.$refs.customerForm.validate()
      } else {
          if (this.$route.params.code) {
      this.$store.dispatch('updateCustomer', { ...this.formData})
      }else{
        console.log(this.formData)
        this.$store.dispatch('addCustomer', { ...this.formData})
      }
    }
},
    removeCustomer() {
      this.$store.dispatch('removeCustomer', this.$route.params.code)
    },
  }
}
</script>
<style>
</style>
