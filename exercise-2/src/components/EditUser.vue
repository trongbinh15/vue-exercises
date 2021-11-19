<template>
  <v-container>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            label="Full Name*"
            required
            v-model="name"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12">
          <v-text-field
            label="Username*"
            required
            v-model="username"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Phone"
            v-model="phone"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-row justify="center">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="editUser"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-row>

     <v-snackbar
      v-model="snackbar"
      timeout="1000"
      centered
    >
      {{ updateUserText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
  
</template>

<script>
  export default {
    name: 'EditUser',
    props: {
      dialog: Boolean,
      close: Function,
      id: String
    },

    data: () => ({
      snackbar: false,
      updateUserText: 'Successfully update user: ',
      name: '',
      username: '',
      phone: '',
    }),
    inject: ['userService'],

    created: async function() {
      await this.loadUser() ;
    },

    methods: {
      async editUser(){
        await this.userService.updateOne({
          id: this.id,
          name: this.name,
          username: this.username,
          phone: this.phone
        });
        this.snackbar = true;

        setTimeout(() => {
          this.close();
        }, 1200);
      },

      async loadUser(){
        const res = await this.userService.getDetail(this.id);
        const {name, username, phone} = res.data;
        this.username = username;
        this.name = name;
        this.phone = phone;
      }
    }
  }
</script>
