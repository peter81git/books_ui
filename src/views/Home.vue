<template>
  <navbar/>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    navbar: () => import("@/components/NavBar"),
  }
}
</script>
