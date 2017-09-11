import {observable, computed} from "mobx";
import {observer} from "mobx-react";
import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import {pink400,pink500} from 'material-ui/styles/colors';


@observer class Todo extends Component{
    @observable newTitle;
    @observable newPriority=false;
    @observable openEdit =false;

    constructor(){
        super();
    }
    
    render(){
        const {todo,remove} = this.props;
        const colors = [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue',
            'Purple',
            'Black',
            'White',
        ];
        const style = {
            width:"60%",
            height: 40,
            marginLeft: "20%"
            
        };
        const iconStyles = {
            marginRight: 24
        };
        const toggleStyles = {
            margin: 10,
            width:"60%",
            top:10
        };
        const hideStyle={
            display:"none"
        }
        const rightStyle={
            float:"right",
            marginTop: -40
        }
        
        return(
            <div>
                <Paper style={style}>
                    <Toggle style={toggleStyles} labelPosition="right" label={todo.title} toggled={todo.finished} onToggle={()=>this.handleToggle(todo)} />
                    <div style={rightStyle}>
                        <FontIcon style={todo.priority?{}:hideStyle} color={pink400} className="material-icons">priority_high</FontIcon>
                        <IconButton tooltip="delete" onClick={remove} >
                            <FontIcon color={pink400} className="material-icons">delete_forever</FontIcon>
                        </IconButton>
                        <IconButton tooltip="edit" onClick={()=>this.handleOpen(todo)} >
                            <FontIcon color={pink400} className="material-icons">mode_edit</FontIcon>
                        </IconButton>
                    </div>
                    <Dialog
                        title="New Title"
                        actions={[
                            <FlatButton label="Cancel" primary={true} onClick={()=>this.handleClose(todo)} />,
                            <FlatButton label="Submit" primary={true} onClick={()=>this.handleSubmit(todo)} />
                        ]}
                        modal={false}
                        open={this.openEdit}
                        onRequestClose={()=>this.handleClose(todo)} >
                            <AutoComplete hintText={todo.title} dataSource={colors} onUpdateInput={(value)=>this.newTitle=value} />
                            <Checkbox
                                checked = {this.newPriority}
                                onCheck ={()=> this.handleCheckClick(todo)}
                                checkedIcon={<FontIcon color={pink400} className="material-icons">favorite</FontIcon>}
                                uncheckedIcon={<FontIcon color={pink400} className="material-icons">favorite_border</FontIcon>}
                                label="priority"
                                />
                    </Dialog>
                </Paper>
            </div>
        )
    }

    handleOpen(todo){
        this.openEdit=true;
        this.newPriority = todo.priority;
        this.newTitle = todo.title;
    }

    handleCheckClick(todo){
        this.newPriority=!this.newPriority;
    }

    handleToggle(todo){
        todo.finished = !todo.finished;
    }

    handleClose(todo){
        console.log("=handleClose=",this.props);
        this.openEdit=false
    }

    handleSubmit(todo){
        todo.priority = this.newPriority;
        this.openEdit=false;
        if(this.newTitle && this.newTitle != todo.title){
            todo.title = this.newTitle;
        }
    }


}


export default Todo;