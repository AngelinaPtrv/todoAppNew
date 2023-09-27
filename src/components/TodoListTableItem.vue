<template>
  <div class="list__item-wrap">
    <div class="list__item-done">
      <input
        v-model="task.done"
        type="checkbox"
        @input="completeTask"
      />
    </div>
    <span
      class="list__item-name"
      :class="{'list__item-text_done': task.done}"
    >
      {{task.name}}
    </span>
    <span
      class="list__item-date"
      :class="{'list__item-text_done': task.done}"
    >
      {{task.date}}
    </span>
    <div class="list__item-actions">
      <img
        :src="require('@/assets/svg/edit.svg')"
        @click="openPopup"
      />
      <img
        :src="require('@/assets/svg/trash.svg')"
        @click="deleteItem"
      >
    </div>
    <TodoListItemPopup
      v-if="isOpenPopup"
      title="Edit task"
      @close="isOpenPopup = false"
      :is-open-popup="isOpenPopup"
      :item="task"
      mode="edit"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TodoListItemPopup from '@/components/TodoListItemPopup';
export default {
  name: "TodoListTableItem",

  components: {TodoListItemPopup},

  props: {
    data: Object,
    default:() => ({}),
  },

  data:() => {
    return {
      task: {},
      isOpenPopup: false,
    }
  },

  created() {
    this.task = {...this.data};
  },

  methods: {
    ...mapActions([
      'editTask',
      'deleteTask',
    ]),

    async completeTask() {
      this.task.done = !this.task.done;
      await this.editTask(this.task);
    },

    async deleteItem() {
      await this.deleteTask(this.task);
    },

    openPopup() {
      if (!this.task.done) {
        this.isOpenPopup = true;
      }
    }
  }
}
</script>

<style scoped>
.list__item-wrap {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #333;
  background: #262626;
  padding: 16px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list__item-wrap span {
  font-size: 14px;
  font-weight: 300;
}

.list__item-done {
  width: 5%;
  display: flex;
  justify-content: center;
}

.list__item-name {
  width: 60%;
  overflow: hidden;
}

.list__item-date {
  width: 10%;
}

.list__item-actions {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.list__item-actions img:first-child {
  width: 14px;
}

.list__item-done input {
  -webkit-appearance: none;
  appearance: none;
  background-color: #262626;
  margin: 0;
  font: inherit;
  color: #262626;
  width: 18px;
  height: 18px;
  border: 1px solid #1E6F9F;
  border-radius: 18px;
  display: grid;
  place-content: center;
}

.list__item-done input::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: #5E60CE;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.list__item-done input:checked::before {
  transform: scale(1);
}

.list__item-text_done {
  text-decoration-line: line-through;
  color: #808080;
}

.list__item-actions {
  fill: #FFFFFF;
}

</style>
