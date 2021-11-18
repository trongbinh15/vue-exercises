<template>
<div class="container">
   <h2>User List </h2>
   <v-alert
      v-if="error"
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          {{error}}
        </v-col>
        <v-col class="shrink">
          <v-btn @click="error = null">Understood</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-btn
      class="btnAdd"
      color="primary"
      dark
      @click="dialog=true"
    >
      New User
    </v-btn>

    <div class="tableUserWrapper">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Username
          </th>
          <th class="text-left">
            Phone
          </th>
          <th v-if="actionVisible" class="text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in userList"
          :key="user.id"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.phone }}</td>
          <td v-if="actionVisible" align="right">
            <v-icon
                large
                class="mr-2"
                @click="() => {}"
              >
                mdi-pencil
            </v-icon>
              <v-icon
                large
                @click="() => {}"
              >
                mdi-delete
              </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <UserDialog
    :dialog="dialog"
    dialogTitle="Add New User"
  >
    <AddNewUser
     
    />
  </UserDialog>

  
  <v-snackbar
    v-model="snackbar"
    timeout="-1"
    centered
  >
    Successfully deleted one user
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
</div>
</div>

</template>
<script>
import AddNewUser from '@/components/AddNewUser'
import UserDialog from '@/components/UserDialog'
// import http from "../services/http-common";

export default {
  name: "UserList",
  components: {
    AddNewUser,
    UserDialog,
  },
  data() {
    return {
      userList: [],
      error: null,
      successfullyDeleteUser: false,
      actionVisible: true,
      dialog: false,
      dialogEdit: false,
      selectedUserId: null,
      snackbar: false,
    }
  },

}
</script>

<style lang="scss">
 .btn-edit {
    margin-left: 15px;
    &.editUser {
      outline: 2px solid green;
    }
  }
  
  .container {
    margin: 15px auto;
    max-width: 1200px;
  }
  .btnAdd {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .tableUserWrapper {
    // max-width: 700px;
    border: 1px solid #ccc;
  }
   
  .feature-hidden {
    display: none;
  }
</style>