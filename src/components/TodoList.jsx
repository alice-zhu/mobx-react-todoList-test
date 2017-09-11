import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pink400,pink500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Todo from "./Todo";

@observer
class TodoList extends React.Component {
  @observable newTodoTitle = "";
  @observable newPriority=false;
  render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: pink400,
                primary2Color: pink500
            }
        });
        const {store} = this.props;
        const titleStyle={
            textAlign: "center"
        }
        const newStyle={
            width:"60%",
            marginTop:"10%",
            marginLeft:"20%",
            height:50
        }
        const inpStyle={
            border:"1px solid #ec407a",
            width:"70%",
            height:"100%",
            fontSize:20
        }
        const iconStyle={
            display:"inline-block",
            float:"right"
        }
        const checkStyle={
            display:"inline-block",
            width:"auto"
        }

        const taskStyle={
            marginTop:10,
            width:"60%",
            marginLeft:"20%",
            height:40
        }
        
    
        return (
            <MuiThemeProvider muiTheme={muiTheme}> 
                <div>
                    <div className="head">
                        <AppBar
                            style={titleStyle}
                            title="Todo App"
                        />
                    </div>
                    <div className="newTodo">
                        <Paper style={newStyle}>
                            <form onSubmit={this.handleFormSubmit}>
                                <input style = {inpStyle}
                                    type="text"
                                    value={this.newTodoTitle}
                                    placeholder="Add New Todo Item"
                                    onChange={this.handleInputChange}
                                />
                                <div className="icon" style={iconStyle}>
                                    <Checkbox
                                        style={checkStyle}
                                        checked = {this.newPriority}
                                        onCheck ={()=> this.newPriority=!this.newPriority}
                                        checkedIcon={<FontIcon color={pink400} className="material-icons">favorite</FontIcon>}
                                        uncheckedIcon={<FontIcon color={pink400} className="material-icons">favorite_border</FontIcon>}
                                        label="priority" />
                                    <IconButton type="submit" tooltip="submit" >
                                        <FontIcon color={pink400} className="material-icons">add_box</FontIcon>
                                    </IconButton>
                                </div>
                                
                            </form>
                        </Paper>
                        
                    </div>
                    <div className="list">
                        {store.todos.map((todo,index) => (
                            <Todo todo={todo} key={todo.id} remove={()=>this.remove(index)} />
                        ))}
                        
                    </div>
                    <div className="task">
                        <Toolbar style={taskStyle}>
                            <ToolbarGroup>
                                Tasks left: {store.unfinishedTodoCount==0?"0":store.unfinishedTodoCount}
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <FontIcon color={pink400} className="material-icons">{store.unfinishedTodoCount==0?"mood":"mood_bad"}</FontIcon>
                            </ToolbarGroup>
                            
                            
                        </Toolbar>
                    </div>
                    
                </div>
            </MuiThemeProvider>
        );
  }

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    console.log("==handleFormSubmit");
    if(this.newTodoTitle){
        this.props.store.addTodo(this.newTodoTitle,this.newPriority);
        this.newPriority=false;
        this.newTodoTitle = "";
    }
    
    e.preventDefault();
  };
  
  remove(index){
        this.props.store.todos.splice(index,1);
    }

}

export default TodoList;
