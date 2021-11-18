<template>
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
          <th v-if="actionVisible" class="text-center">
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
          <td v-if="actionVisible">
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
    dialogTitle="Edit an User"
    v-if="dialog"
  >
    <EditUser
      :userId="selectedUserId"
      @setDialogChildren="(status) => dialog = status"
    />
  </UserDialog>
  <v-snackbar
      v-model="snackbar"
      timeout="-1"
      centered
    >
      The user has been deleted
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
</template>
<script>
// import { mapGetters, mapActions, mapMutations } from "vuex";
import UserDialog from '@/components/UserDialog'
import {
  // LOAD_USER_LIST,
  // DELETE_USER,
  // RESET_FORM_EDIT_ADD,
} from '@/store/actions.type'

  export default {
    name: "UserList",
    components: {
      UserDialog,
    },
    data() {
      return {
        actionVisible: true,
        dialog: false,
        selectedUserId: null,
        snackbar: false,
        originalUserListLength: 0,
      }
    },
    

}
</script>

<style lang="scss">
  .tableUserWrapper {
    max-width: 700px;
    border: 1px solid #ccc;
  }
   
   .feature-hidden {
     display: none;
   }
</style>