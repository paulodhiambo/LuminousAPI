<template>
  <v-app>
    <!--  Side Bar  -->
    <template v-if="!$route.path.includes('login')">
      <v-navigation-drawer
          v-model="drawer"
          :permanent="$vuetify.breakpoint.mdAndUp"
          :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
          app
          color="aside"
          dark
          style="font-family: 'PT Sans Caption', sans-serif"
          class="fill-height"
      >
        <v-card flat color="aside" class="pa-2" width="100%">
          <div class="d-flex flex-column">
            <v-avatar class="align-self-center" size="70">
              <v-img
                  alt="Logo"
                  :src="require('../assets/fikisha-logo.png')"
                  transition="scale-transition"
              />
            </v-avatar>
          </div>

          <v-card-subtitle
              v-if="!mini"
              class="overline text-center pa-0 mt-3"
              style="line-height: 1rem"
          >
          </v-card-subtitle>
        </v-card>

        <v-divider></v-divider>

        <v-list>
          <div v-for="(item, i) in Links" :key="i">
            <v-list-group
                v-if="item.sublinks.length > 0"
                v-model="item.active"
                active-class="selectedItem"
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item-group>
                <v-list-item
                    v-for="(sub, s) in item.sublinks"
                    :key="s"
                    link
                    :to="sub.to"
                    active-class="selectedItem"
                >
                  <v-list-item-avatar v-if="!mini"> &nbsp; </v-list-item-avatar>
                  <v-list-item-icon class="mr-2">
                    <v-icon v-if="!mini">{{ sub.icon }}</v-icon>

                    <v-badge
                        v-else
                        :content="sub.value || ''"
                        :value="sub.value"
                        color="indigo indigo-darken-4"
                        overlap
                        left
                    >
                      <v-icon>{{ sub.icon }}</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ sub.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="sub.value">
                    <v-chip x-small color="success">
                      {{ sub.value }}
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list-group>

            <v-list-item-group v-else>
              <v-list-item :to="item.to">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block text @click="logout">
              <v-icon>mdi-logout</v-icon> Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <!--  App Bar  -->
      <v-app-bar app elevation="0">
        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndUp"
            @click="mini = !mini"
        ></v-app-bar-nav-icon>
        <v-spacer class="spacer" sm="0" />
        <v-btn rounded icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                @click="logout"
            >
            <v-icon>mdi-logout</v-icon> Logout
            </v-btn>
              <div class="pa-2">
          </div>
          </template>
        </v-tooltip>
      </v-app-bar>

      <v-divider />
    </template>

    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () =>({
    drawer: null,
    leftDrawer: false,
    mini: false,
    selectedItem: 0,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    Links: [
      {
        title: 'Dashboard',
        icon: 'mdi-view-grid',
        to: '/dashboard',
        sublinks: []
      },
      {
        title: 'Customers',
        icon: 'mdi-account-multiple',
        to: '/customers',
        sublinks: []
      },
      {
        title: 'Vehicles',
        icon: 'mdi-car-pickup',
        to: '/vehicles',
        sublinks: []
      },
      {
        title: 'Orders',
        icon: 'mdi-playlist-check',
        to: '/orders',
        sublinks: []
      }
    ]
  }),
  methods: {
    logout(){
      this.$store.dispatch('logout');
    }
  }
};
</script>
