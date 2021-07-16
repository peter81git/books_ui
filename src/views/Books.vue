<template>
  <div>
    <b-card-group deck>
        <b-card v-for="(book, index) in getBooks" :key="index" >
          <b-card-img width="50" :src="book.imgSrc" class="mb-2"></b-card-img>
          <b-card-title style="font-size: large">{{book.title}}</b-card-title>
          <b-card-text></b-card-text>
          <template #footer>
            <small class="text-muted" v-if="book.isReserved">Reserved</small>
            <b-button v-if="!book.isReserved" variant="primary" size="sm" @click="bookid=book.id;modalShow = !modalShow">Available</b-button>
          </template>
        </b-card>
    </b-card-group>

    <b-modal v-model="modalShow" >
      <b-form @submit="onSubmit" >
        <b-form-group id="input-group-3" label="Users:" label-for="input-3">
          <b-form-select
              id="input-3"
              v-model="form.user_id"
              :options="users"
              required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <template #modal-footer>
        <div/>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Books",
  data(){
    return{
        books:[],
        users:[],
        bookid:0,
        modalShow: false,
        form: {
          user_id: '',
        }
    }
  },
  beforeMount() {

      this.getAllBooks();
      fetch(`http://localhost:3000/users/all`,{})
          .then((response)=>{if(response.ok) return response.json();})
          .then((data)=>{
            this.users= data.map((t) => {
              return { value: t.id, text: t.name };
            });

          })
          .catch(()=>{
          });
  },
  computed:{
    getBooks(){
      return this.books;
    }
  },
  methods:{
    getAllBooks(){
      fetch(`http://localhost:3000/books/all`,{})
          .then((response)=>{if(response.ok) return response.json();})
          .then((data)=>{
            this.books=data.items;
            this.getBookCover();
          })
          .catch(()=>{
          });
    },
    getBookCover(){
      this.books.forEach((b)=>{
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${b.isbn}`,{})
            .then((response)=>{if(response.ok) return response.json();})
            .then((data)=>{
              b.imgSrc=data.items[0].volumeInfo.imageLinks.smallThumbnail
            })
            .catch(()=>{
            });
      })

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
      url = `http://localhost:3000/requests`;

      fetch(url, requestOptions)
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then(() => {

            this.getAllBooks();

          })
          .catch(() => {

          });
    },
  }
}
</script>

<style scoped>

</style>
