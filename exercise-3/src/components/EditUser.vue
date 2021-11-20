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
      timeout="-1"
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
import { mapActions, mapGetters } from "vuex";
import {
  UPDATE_USER,
  GET_CURRENT_USER
  } from '@/store/actions.type'
  export default {
    name: 'EditUser',
    props: {
    },

    data: () => ({
      snackbar: false,
      newUserAddedText: 'Successfully update user: ',
      name: '',
      username: '',
      phone: '',
    }),
    computed: {
      ...mapGetters(['userById']),
      currentUser(){
         return this.userById(this.$attrs.userId);
      }
    },
    methods: {
      setDialog(status) {
        this.$emit('setDialogChildren', status)
      },
      ...mapActions({
        updateUser: UPDATE_USER,
        getUser: GET_CURRENT_USER
      }),
      async saveInfo(){
        const payload  = {
          id: this.$attrs.userId,
          name: this.name,
          username: this.username,
          phone: this.phone
        }
        await this.updateUser(payload);
        this.snackbar = true;
        this.closeDialog();
      },
      clear(){
        this.name = '';
        this.username ='';
        this.phone = '';
      },
      closeDialog(){
        setTimeout(() => {
          this.setDialog(false);
          this.clear();
        }, 1200);
      }
    },
    watch: {
      currentUser: function(value){
        const {name, username, phone} = value;
        this.username = username;
        this.name = name;
        this.phone = phone;
      }
    }
  }
</script>
