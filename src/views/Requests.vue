<template>
<div>
  <b-table striped hover :items="getRequests" :fields="fields" >
    <template #cell(actions)="row">
      <b-button size="sm"  class="mr-1" v-if="row.item.book.isReserved" @click="returnBook(row.item.id)">
        Return Book
      </b-button>
    </template>
  </b-table>
</div>
</template>

<script>
export default {
  name: "Requests",
  data() {
    return {
      fields: [
          {key:"returndate"},{key:"createdate"},{key: "book.title",label:'Book Title'}
          ,{key: "book.isReserved",label:'Reserved',formatter: (value) => {
            return value ? 'Yes' : 'No'}}
          ,{key: "user.email",label:'User Email'}
          ,{ key: 'actions', label: 'Actions' }
      ],
      items: [{}]
    }
  },
  computed:{
    getRequests(){
      return this.items;
    }
  },
  beforeMount() {

    this.getAllRequests();

  },
  methods:{
    getAllRequests(){
      fetch(`http://localhost:3000/requests/all`,{})
          .then((response)=>{if(response.ok) return response.json();})
          .then((data)=>{
            this.items=data.items;
          })
          .catch(()=>{
          });
    },
    returnBook(bookid){


      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
      };

      let url = '';
      url = `http://localhost:3000/requests/${bookid}`;

      fetch(url, requestOptions)
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then(() => {
            //context.commit('incidents',result.meta);
            this.getAllRequests();

          })
          .catch(() => {

          });
    }
  }
}
</script>

<style scoped>

</style>
