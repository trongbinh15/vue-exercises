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
          @click="addNewUser"
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
      {{ newUserAddedText }}
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
import { v4 as uuid } from 'uuid';
  export default {
    name: 'AddNewUser',
    props: {
      dialog: Boolean,
      close: Function
    },
    inject: ['userService'],
    data: () => ({
      snackbar: false,
      newUserAddedText: 'Successfully added one new user: ',
      name: '',
      username: '',
      phone: '',
    }),
    methods: {
      async addNewUser(){
        await this.userService.addOne({
          id: uuid(),
          name: this.name,
          username: this.username,
          phone: this.phone
        });
        this.snackbar = true;
        setTimeout(() => {
          this.close();
        }, 1200);
      }
    }
  }
</script>
