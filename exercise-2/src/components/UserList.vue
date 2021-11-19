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
      @click="dialogAdd=true"
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
          @click="selectedUserId = user.id"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.phone }}</td>
          <td v-if="actionVisible" align="right">
            <v-icon
                large
                class="mr-2"
                @click="dialogEdit=true"
              >
                mdi-pencil
            </v-icon>
              <v-icon
                large
                @click="deleteUser(user.id)"
              >
                mdi-delete
              </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <UserDialog
    :dialog="dialogAdd"
    :closeFn="closeAddDialog"
    dialogTitle="Add New User"
    v-slot:default="{close}"
  >
    <AddNewUser :close="close"
    />
  </UserDialog>

  <UserDialog
    :dialog="dialogEdit"
    :closeFn="closeEditDialog"
    :userId="selectedUserId"
    dialogTitle="Edit User"
    v-slot:default="{close, id}"
  >
    <EditUser :close="close" :id="id"
    />
  </UserDialog>

  
  <v-snackbar
    v-model="snackbar"
    timeout="1000"
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
import EditUser from '@/components/EditUser'
import UserDialog from '@/components/UserDialog'

export default {
  name: "UserList",
  components: {
    AddNewUser,
    EditUser,
    UserDialog,
  },
  data() {
    return {
      userList: [],
      error: null,
      actionVisible: true,
      dialogAdd: false,
      dialogEdit: false,
      selectedUserId: null,
      snackbar: false,
    }
  },
  inject: ['userService'],
  created: async function() {
    await this.loadUsers();
  },
  methods: {
    closeAddDialog(){
      this.dialogAdd = false;
      this.loadUsers();
    },
    closeEditDialog(){
      this.dialogEdit = false;
      this.loadUsers();
    },
    async loadUsers(){
      await this.userService.getAll();
      this.userList = this.userService.info;
    },
    async deleteUser(id){
      await this.userService.deleteOne(id);
      this.snackbar = true;
      this.loadUsers();
    }
  }
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