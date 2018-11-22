# ToDoList_with_Mobx
## Quote taken from the offical Docs

MobX is not a state container
People often use MobX as alternative for Redux. But please note that MobX is just a library to solve a technical problem and not an architecture or even state container in itself. In that sense the above examples are contrived and it is recommended to use proper engineering practices like encapsulating logic in methods, organize them in stores or controllers etc. Or, as somebody on HackerNews put it:

'“MobX, it's been mentioned elsewhere but I can't help but sing its praises. Writing in MobX means that using controllers/ dispatchers/ actions/ supervisors or another form of managing dataflow returns to being an architectural concern you can pattern to your application's needs, rather than being something that's required by default for anything more than a Todo app.”'

### Quick overview over MobX

1. `@observable` makes an object, array or variable in the array observable
2. `@autorun` will inform whenever the State of the Store changes, message is avaidable even on the clientSide
3. `@computed` computed values are like formulas in spreadsheets (the sum of CellA and CellB), they just fire whenever they need to fire
4. `@action` nothing like in `Redux` there are no Actions, Reducers or Dispatchers, and you dont have to worry about Immutability
   you directly access the State of your Store and change it with action

#Simple Setup
Make sure we wrapp your Provider like Redux around your App Component !

````javascript 
import {Provider} from 'mobx-react'
import { YourStore } from './store';

const Root = (
    <Provider Store={YourStore}>
        <App />
    </Provider>
);

///Then render the 'Root' to your DOM
````
Import store from your Store and pass it as a prop to your Component,like `<YourComponent store={store} />`
now you can decorate your `YourComponent Class` with the observable decorator like this:

```javascript
import { observable } from "mobx-react";

@observable
class YourComponent extends React.Component {
  render() {
    return <div>{this.props.store.XY}</div>;
  }
}
```

So now you are able to access the store values via props and you can also manipulate them !

You can also access Methods from inside your Store, wich change the store data, but don't forget to .bind(this)

In our example we are doing a ToDo-App, each ToDO is a class like :

```javascript
class Todo {
  @observable value;
  @observable id;

  constructor(value) {
    this.value = value;
    this.id = "someId";
  }
}
```

and inside the Store we, add each ToDo into a todos-Array

```javascript
class Store {
    todos = [];

    @action createToDo(value) => {
        this.todos.push(new Todo(value))
    }
}
```

#More on Computed-Values

This is an Example of how you can use a Computed Value

```javascript
//this is inside the Store

var Store = {
   @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i");
    //"i" means ignore groß und kleinschreibung
    return this.todos.filter(
      todo => !this.filter || matchesFilter.test(todo.value)
    );
}

```

Above you will Notice the Getter Keyword on the filteredTodos-Method

```

```

