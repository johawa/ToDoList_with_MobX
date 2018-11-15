import { computed, observable } from "mobx";

class Todo {
  @observable value;
  @observable id;
  @observable complete;

  constructor(value) {
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

export class TodoStore {
  constructor() {
    mobx.autorun(() => console.log(this.report));
  }
  
  @observable todos = [];
  @observable filter = "";
  //computed values can get derived from an existing state or other computed values
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i");
    //"i" means ignore groß und kleinschreibung
    return this.todos.filter(
      todo => !this.filter || matchesFilter.test(todo.value)
    );
    // test will test the RegExp, so this.props.store.filter will automtaticly return
    // the filtered Value, on the CLient Side
  }

  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  };
}

export default new TodoStore();
