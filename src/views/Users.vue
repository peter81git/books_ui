<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-button-group size="sm" class="mb-2">
          <b-button @click="modalShow = !modalShow">Insert User</b-button>
        </b-button-group>
      </b-row>
    </b-container>
    <b-table striped hover :items="getUsers" :fields="fields">
      <template #cell(actions)="row">
        <b-button size="sm"  class="mr-1" v-if="row.item.status" @click="changeUserStatus(row.item.id,!row.item.status)">
          Inactive User
        </b-button>
        <b-button size="sm"  class="mr-1" v-else @click="changeUserStatus(row.item.id,!row.item.status)">
          Activate User
        </b-button>
      </template>
    </b-table>

    <b-modal v-model="modalShow" >
      <b-form @submit="onSubmit" >
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: [],
      modalShow: false,
      form: {
        email: '',
        name:''
      },
      fields: [
        {key:"name"},{key:"insertdate"},
        {key: "modifydate"},
        {key: "email",label:'User Email'}
        ,{key: "status",label:'Active',formatter: (value) => {
            return value ? 'Yes' : 'No'}}
        ,{ key: 'actions', label: 'Actions' }
      ]
    }

  },
  beforeMount() {

    this.getAllUsers();

  },
  computed:{
    getUsers(){
      return this.users;
    }
  },
  methods: {
    getAllUsers() {
      fetch(`http://localhost:3000/users/all`, {})
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then((data) => {
            this.users = data;

          })
          .catch(() => {
          });
    },
    onSubmit(event) {
      event.preventDefault()
      this.form.book_id=this.bookid;
      let raw = JSON.stringify(this.form);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      let url = '';
      url = `http://localhost:3000/users`;

      fetch(url, requestOptions)
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then(() => {
            this.getAllUsers();

          })
          .catch(() => {

          });
    },
    changeUserStatus(userid,state){

      let raw = JSON.stringify({status:state});
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw
      };

      let url = '';
      url = `http://localhost:3000/users/${userid}`;

      fetch(url, requestOptions)
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then(() => {
            //context.commit('incidents',result.meta);
            this.getAllUsers();

          })
          .catch(() => {

          });
    }
  }
}
</script>

<style scoped>

</style>
