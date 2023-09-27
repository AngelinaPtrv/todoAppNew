<template>
  <div :class="{'overlay': isOpenPopup}">
    <div class="item__popup-wrapper">
      <img
        :src="require('@/assets/svg/close.svg')"
        class="item__popup-wrapper_close"
        @click="$emit('close')"
      />
      <div class="item__popup__header">
        <span>{{ title }}</span>
      </div>
      <div class="item__popup-body">
        <div class="item__popup-body_input-block">
          <textarea
            v-model="task.name"
            placeholder="Enter text of task"
          />
          <span class="input__error">{{taskNameError}}</span>
        </div>
        <div class="item__popup-body_input-block">
          <input
            v-model="task.date"
            placeholder="Enter date"
            v-mask="'##.##.####'"
            @input="taskDateError = ''"
          />
          <span class="input__error">{{taskDateError}}</span>
        </div>
      </div>
      <div class="item__popup-footer">
        <button
          @click="sendNewTask"
        >
          Save
        </button>
        <button
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "TodoListItemPopup",

  props: {
    title: {
      type: String,
      default: '',
    },

    item: {
      type: Object,
      default: () => ({}),
    },

    isOpenPopup: {
      type: Boolean,
      default: false,
    },

    mode: {
      type: String,
      default: 'add',
    },
  },

  data:() => {
    return {
      task: {},
      taskNameError: '',
      taskDateError: '',
    }
  },

  computed: {
    ...mapState([
      'listOfTasks',
    ]),
  },

  watch: {
    'task.name'() {
      this.taskNameError = ''
    },
  },

  mounted() {
    this.task = {...this.item};
    if (!this.task.date) {
      const date = new Date();
      this.task.date = date.toLocaleDateString('ru-Ru');
    }
  },

  methods: {
    ...mapActions([
      'addNewTask',
      'editTask',
    ]),

    async sendNewTask() {
      if (!this.task.name || !this.task.date) {
        this.taskNameError = !this.task.name ? 'Enter the name' : '';
        this.taskDateError = !this.task.date ? 'Enter the date' : '';
        return
      }
      if (!this.validateDate(this.task.date)) {
        return
      }
      const date = new Date();
      if (this.task.date < date.toLocaleDateString('ru-Ru')) {
        this.taskDateError = 'Only a future date is possible';
        return
      }
      if (this.mode === 'add') {
        await this.addNewTask(this.task)
          .then(() => this.$emit('close'))
      } else {
        await this.editTask(this.task)
          .then(() => this.$emit('close'))
      }
    },

    validateDate(date) {
      const regexpDate = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;
      if (!regexpDate.test(date)) {
        this.taskDateError = 'Date is not valid';
        return false;
      }
      return true;
    },
  },
}
</script>

<style scoped>
.item__popup-wrapper {
  margin: 30vh auto;
  padding: 20px;
  background: #1A1A1A;
  border-radius: 5px;
  width: 50%;
  position: relative;
  transition: all 5s ease-in-out;
  display: flex;
  flex-direction: column;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;
}

.item__popup-wrapper_close {
  margin-left: auto;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.item__popup__header {
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-weight: 500;
}

.item__popup-body {
  display: flex;
  justify-content: space-around;
}

.item__popup-body div:first-child {
  width: 50%;
}

.item__popup-body_input-block {
  display: flex;
  flex-direction: column;
}

.item__popup-body textarea {
  background-color: #262626;
  border-radius: 8px;
  border: 1px solid #0D0D0D;
  padding: 10px;
  color: #FFFFFF;
}

.item__popup-body input {
  background-color: #262626;
  border-radius: 8px;
  border: 1px solid #0D0D0D;
  padding: 16px 0 16px 16px;
  color: #FFFFFF;
}

.item__popup-body input::placeholder {
  color: #808080;
  font-size: 16px;
  font-weight: 400;
}

.item__popup-footer {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.item__popup-footer button:first-child {
  width: 90px;
  padding: 16px;
  border-radius: 8px;
  background: #1E6F9F;
  margin-left: 10px;
  margin-top: 30px;
  cursor: pointer;
}

.item__popup-footer button:last-child {
  width: 90px;
  padding: 16px;
  border-radius: 8px;
  border: 4px solid #1E6F9F;
  margin-left: 10px;
  margin-top: 30px;
  cursor: pointer;
}

.input__error {
  font-size: 14px;
  font-weight: 300;
  color: #E25858;
}
</style>
