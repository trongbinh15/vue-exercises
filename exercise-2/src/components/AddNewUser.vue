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
          @click="() => {}"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="() => {}"
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
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
  
</template>

<script>
// import http from "../services/http-common";
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

    
  }
</script>
