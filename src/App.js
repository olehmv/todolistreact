import React, { Component } from 'react';
import {Table,Button,Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,Label,Input} from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state={
    todos:[]
    ,newTodo:{
         id:0
         ,todo:""
         ,startAt:""
         ,endAt:""
     }
    ,editTodo:{
       id:0
       ,todo:""
       ,startAt:""
       ,endAt:""
    }
    ,newTodoModel: false
    ,editTodoModel : false
  }

  componentWillMount(){
    this.refreshTodoList();
  }

  postTodo(){
    axios.post("http://akkhttpserver:8080/todos",this.state.newTodo).then((res)=>{
    let {todos} = this.state;
    todos.push(res.data)
    this.setState({
                   todos
                   ,newTodoModel:false
                   ,newTodo:{
                             id:0
                             ,todo:""
                             ,startAt:""
                             ,endAt:""
                             }});
    }
    );
  }
  putTodo(){
    axios.put("http://akkhttpserver:8080/todos/"+this.state.editTodo.id,this.state.editTodo).then((res)=>{
    console.log(res)
    let {todos} = this.state;
    todos.push(res.data)
    this.setState({
                   todos
                      ,editTodoModel:false
                      ,editTodo:{
                                id:0
                                ,todo:""
                                ,startAt:""
                                ,endAt:""
                                }});
      this.refreshTodoList();
      }
      )
  }

  deleteTodo(id){
    axios.delete("http://akkhttpserver:8080/todos/"+id).then((res)=>{
    this.refreshTodoList();
    })
  }

  toggleNewTodoModel(){
   this.setState({newTodoModel: ! this.state.newTodoModel})
  }

  toggleEditTodoModel(){
   this.setState({editTodoModel: ! this.state.editTodoModel})
  }

  editTodo(id,todo,startAt,endAt){
   this.toggleEditTodoModel();
   this.setState({editTodo:{id,todo,startAt,endAt}});
  }

  refreshTodoList(){
   axios.get('http://akkhttpserver:8080/todos').then((res)=>{
   console.log(res.headers)
   this.setState({todos: res.data})
   });
  }


  render() {
    console.log(this.state)
    let todos = this.state.todos.map((todo)=>{
    return(
        <tr key={todo.id}>
            <td>{todo.todo}</td>
            <td>{todo.startAt}</td>
            <td>{todo.endAt}</td>
            <td>
            <Button color="info" size="sm" className="mr-2" onClick={this.editTodo.bind(this,todo.id,todo.todo,todo.startAt,todo.endAt)}>Edit</Button>
            <Button color="info" size="sm" className="" onClick={this.deleteTodo.bind(this,todo.id)}>Delete</Button>
            </td>
        </tr>
    )
    });
    return (
        <div className="App">
        <Button color="info" onClick={this.toggleNewTodoModel.bind(this)}>+</Button>
        <Modal isOpen={this.state.newTodoModel} toggle={this.toggleNewTodoModel.bind(this)}>
          <ModalHeader toggle={this.toggleNewTodoModel.bind(this)}>TODO ADD</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label for="exampleText">TODO</Label>
                <Input type="textarea" name="text" id="exampleText"
                 value={this.state.newTodo.todo} onChange={(e)=>
                 {
                    let {newTodo}   = this.state;
                    newTodo.todo = e.target.value;
                    this.setState({newTodo})}
                 }
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">START AT</Label>
                <Input type="date" name="date" id="exampleDate"
                 value={this.state.newTodo.startAt} onChange={(e)=>
                 {
                    let {newTodo}   = this.state;
                    newTodo.startAt = e.target.value;
                    this.setState({newTodo})}
                 }
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">END AT</Label>
                <Input type="date" name="date" id="exampleDate"
                 value={this.state.newTodo.endAt} onChange={(e)=>
                 {
                    let {newTodo}   = this.state;
                    newTodo.endAt = e.target.value;
                    this.setState({newTodo})}
                 }
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.postTodo.bind(this)}>ADD</Button>
            <Button color="secondary" onClick={this.toggleNewTodoModel.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.editTodoModel} toggle={this.toggleEditTodoModel.bind(this)}>
          <ModalHeader toggle={this.toggleEditTodoModel.bind(this)}>TODO UPDATE</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Label for="exampleText">TODO</Label>
                <Input type="textarea" name="text" id="exampleText"
                 value={this.state.editTodo.todo} onChange={(e)=>
                 {
                    let {editTodo}   = this.state;
                    editTodo.todo = e.target.value;
                    this.setState({editTodo})}
                 }
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">START AT</Label>
                <Input type="date" name="date" id="exampleDate"
                 value={this.state.editTodo.startAt} onChange={(e)=>
                 {
                    let {editTodo}   = this.state;
                    editTodo.startAt = e.target.value;
                    this.setState({editTodo})}
                 }
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">END AT</Label>
                <Input type="date" name="date" id="exampleDate"
                 value={this.state.editTodo.endAt} onChange={(e)=>
                 {
                    let {editTodo}   = this.state;
                    editTodo.endAt = e.target.value;
                    this.setState({editTodo})}
                 }
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.putTodo.bind(this)}>Update</Button>
            <Button color="secondary" onClick={this.toggleEditTodoModel.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>




        <Table>
            <thead>
                <tr>
                    <th>Todo</th>
                    <th>Start At</th>
                    <th>End At</th>
                </tr>
            </thead>
            <tbody>
                {todos}
            </tbody>
    </Table>
</div>
);
}
}

export default App;
