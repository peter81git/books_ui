<template>
  <b-sidebar id="sidebar-1" title="Sidebar" backdrop shadow bg-variant="light" text-variant="light">
    <nav class="mb-3">
      <b-nav vertical>
        <b-nav-item to="books">Books</b-nav-item>
        <b-nav-item to="requests">Requests</b-nav-item>
        <b-nav-item to="users">Users</b-nav-item>
      </b-nav>
    </nav>
  </b-sidebar>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>

</style>
