<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="indigo">
                <v-toolbar-title class="flex text-center">FIKISHA LIMITED</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form  v-model="isValid" ref="loginForm">
                  <v-text-field
                      prepend-icon="person"
                      label="Username"
                      v-model="formData.username"
                      :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="lock"
                      label="Password"
                      v-model="formData.password"
                      :rules="[rules.required]"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text" color="indigo" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  data: ()=>({
    formData: {
      username:'',
      password: ''
    },
    showPassword: false,
    isValid: true,
    rules: {
        required: (value) => !!value || 'Required.',
        emailRules:(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

  }
  }),
  methods:{
    login() {    
      if (!this.isValid) {
        this.$refs.loginForm.validate()
      } else {
      this.$store.dispatch('login', { ...this.formData})
      }
    },
  }

};
</script>

<style></style>
