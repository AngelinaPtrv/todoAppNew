<template>
  <div class="list__wrapper">
    <div class="list__header">
      <span class="list__header-title">To Do List</span>
    </div>
    <div class="list__body">
      <TodoListTable/>
    </div>
  </div>
</template>

<script>
import TodoListTable from "@/components/TodoListTable";

export default {
  name: "TodoList",

  components: {TodoListTable},
}
</script>

<style scoped>
.list__wrapper {
  background-color: #1A1A1A;
  height: 100vh;
  position: relative;
}

.list__header {
  background-color: #0D0D0D;
  height: 20vh;
  display: flex;
}

.list__header-title {
  font-size: 40px;
  font-weight: 900;
  background: -webkit-linear-gradient(0deg, rgba(94,96,206,1) 22%, rgba(78,168,222,1) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: auto;
}
</style>
