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
          @click="setDialog(false)"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="saveInfo"
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
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
  
</template>

<script>
import { mapActions } from "vuex";
import { v4 as uuid } from 'uuid';
import {
  ADD_NEW_USER,
} from '@/store/actions.type'
  export default {
    name: 'AddNewUser',
    props: {
    },

    data: () => ({
      snackbar: false,
      newUserAddedText: 'Successfully added one new user: ',
      name: '',
      username: '',
      phone: '',
    }),
    methods: {
      setDialog(status) {
        this.$emit('setDialogChildren', status)
      },
      ...mapActions({
        addUser: ADD_NEW_USER
      }),

      async saveInfo(){
        const payload  = {
          id: uuid(),
          name: this.name,
          username: this.username,
          phone: this.phone
        }
        await this.addUser(payload);
        this.snackbar = true;
        this.clear();
        setTimeout(() => {
          this.setDialog(false);
        }, 1200);
      },
      clear(){
        this.name = '';
        this.username ='';
        this.phone = '';
      }
    }
  }
</script>
