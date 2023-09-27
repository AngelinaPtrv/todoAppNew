<template>
  <div class="list__table-wrapper">
    <div class="table__header-total_block">
      <span
        class="table__header-total_text"
        :class="{'table__header-tab_active': activeTab === 'all'}"
        @click="setActiveTab('all')"
      >
        Total
      </span>
      <span class="table__header-total_count">{{total}}</span>
      <span
        class="table__header-done_text"
        :class="{'table__header-tab_active': activeTab === 'done'}"
        @click="setActiveTab('done')"
      >
        Done
      </span>
      <span class="table__header-done_count">{{done}}</span>
      <span
        class="table__header-progress_text"
        :class="{'table__header-tab_active': activeTab === 'undone'}"
        @click="setActiveTab('undone')"
      >
        In progress
      </span>
      <span class="table__header-progress_count">{{undone}}</span>
    </div>
    <div class="list__table-header">
      <div class="table__header-search">
        <input
          v-model="searchValue"
          type="text"
          placeholder="Search task"
        >
      </div>
      <div>
        <img
          :src="require('@/assets/svg/sort.svg')"
          class="table__icon-sort"
          @click="sortWithParameters"
        >
      </div>
      <div>
        <img
          :src="require('@/assets/svg/plus.svg')"
          class="table__icon-add"
          @click="isOpenPopup = true"
        />
      </div>
    </div>
    <div
      v-if="total"
    >
      <div class="list__table-body">
        <TodoListTableItem
          v-for="task in taskList"
          :key="task.id"
          :data="task"
        />
      </div>
    </div>
    <div
      v-else
      class="list__table-empty"
    >
      <span>You have no planned activities</span>
    </div>
    <TodoListItemPopup
      v-if="isOpenPopup"
      title="Add task"
      @close="isOpenPopup = false"
      :is-open-popup="isOpenPopup"
    />
  </div>
</template>

<script>
import TodoListTableItem from "@/components/TodoListTableItem";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex"
import TodoListItemPopup from "@/components/TodoListItemPopup";

export default {
  name: "TodoListTable",

  components: {TodoListItemPopup, TodoListTableItem},

  data:() => {
    return {
      isOpenPopup: false,
      sortParameter: false,
    }
  },

  computed: {
    ...mapGetters({
      total: 'getTotal',
      done: 'getDoneLength',
      undone: 'getUndoneLength',
      taskList: 'searchTask',
    }),

    ...mapState([
      'search',
      'activeTab',
    ]),

    searchValue: {
      get() {
        return this.search;
      },

      set(value) {
        this.setSearch(value);
      },
    }
  },

  methods: {
    ...mapMutations([
      'setSearch',
      'setActiveTab',
    ]),

    ...mapActions([
      'sortTasks',
    ]),

    async sortWithParameters() {
      await this.sortTasks(this.sortParameter).then(() => this.sortParameter = !this.sortParameter);
    },
  },
}
</script>

<style scoped>
.list__table-wrapper {
  width: 60%;
  margin: auto;
  padding-top: 50px;
}

.list__table-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #333;
}

.list__table-header button {
  padding: 16px;
  border-radius: 8px;
  background: #1E6F9F;
  margin-left: 10px;
  cursor: pointer;
}

.table__header-total_block {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.table__header-total_text {
  color: #4EA8DE;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.table__header-total_count, .table__header-done_count, .table__header-progress_count {
  padding: 2px 8px;
  border-radius: 30px;
  background: #333;
  margin-left: 5px;
  margin-right: 10px;
}

.table__header-done_text {
  color: #E25858;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.table__header-progress_text {
  color: #8284FA;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.table__header-search {
  width: 60%;
}

.table__header-search input {
  background-color: #262626;
  border-radius: 8px;
  border: 1px solid #0D0D0D;
  padding: 5px 0 5px 16px;
  width: 100%;
}

.table__header-search input::placeholder {
  color: #808080;
  font-size: 16px;
  font-weight: 400;
}

.table__header-tab_active {
  border-bottom: 1px solid #ffffff;
}

.list__table-body {
  overflow: auto;
  height: 55vh;
}

.list__table-empty {
  height: 40vh;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list__table-empty span {
  color: #808080;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}

.table__icon-add {
  width: 20px;
}
</style>
