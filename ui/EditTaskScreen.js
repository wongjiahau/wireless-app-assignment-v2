import React, { Component } from 'react';
import { Controller } from '../js/Controller';
import { TaskForm } from './TaskForm';

export class EditTaskScreen extends Component {
  static navigationOptions = {
    title: "Edit task"
  }
  constructor(props) {
    super(props);
    this.task = this.props.navigation.getParam("task");
  }

  render() {
    return (
      <TaskForm
        task={this.task}
        handleTask={(task, callback) => Controller.updateTask(
          task,
          callback
        )}
        navigation={this.props.navigation}
        buttonText="UPDATE TASK"
        renderMessage={() => `Task updated.`}
      />
    )
  }
}
