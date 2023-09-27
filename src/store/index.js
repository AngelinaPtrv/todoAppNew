function formatDate(value) {
  return value.slice(0, 10).split('.').reverse().join('-');
}

const filter = {
  all: () => true,
  done: (task) => task.done,
  undone: (task) => !task.done,
};

export const state = {
  listOfTasks: [],
  total: 0,
  done: 0,
  undone: 0,
  lastOccupiedId: 1,
  search: '',
  activeTab: 'all',
}

export const getters = {
  getTotal(state, getters) {
    return getters.searchTask.length;
  },

  getDoneLength(state, getters) {
    return getters.searchTask.filter(task => task.done).length;
  },

  getUndoneLength(state, getters) {
    return getters.searchTask.filter(task => !task.done).length;
  },

  searchTask(state) {
    return state.listOfTasks
                .filter(task => task.name.toLowerCase().includes(state.search.toLowerCase()))
                .filter(filter[state.activeTab]);
  },
}

export const mutations = {
  setListOfTasks(state, payload) {
    state.listOfTasks = payload;
  },

  setId(state) {
    state.lastOccupiedId += 1;
  },

  setSearch(state, payload) {
    state.search = payload;
  },

  setActiveTab(state, payload) {
    state.activeTab = payload;
  },
}

export const actions = {
  addNewTask({state, commit}, payload) {
    const list = state.listOfTasks;
    const data = {
      ...payload,
      id: state.lastOccupiedId,
      done: false,
    }
    list.push(data);
    commit('setListOfTasks', list);
    commit('setId');
  },

  editTask({state, commit}, payload) {
    const list = state.listOfTasks;
    const index = list.findIndex(({id}) => id === payload.id);
    let el = list.splice(index, 1)[0];
    el = {
      ...payload,
      id: state.lastOccupiedId
    }
    list.splice(index, 0, el);
    commit('setListOfTasks', list);
    commit('setId');
  },

  deleteTask({state, commit}, payload) {
    const list = state.listOfTasks;
    const index = list.findIndex(({id}) => id === payload.id);
    list.splice(index, 1);
    commit('setListOfTasks', list);
  },

  sortTasks({state, commit}, payload) {
    const list = state.listOfTasks;
    list.sort((a,b) => {
      const date1 = new Date(formatDate(a.date));
      const date2 = new Date(formatDate(b.date));
      return payload ? date1 - date2 : date2 - date1;
    });
    commit('setListOfTasks', list);
  },
}
