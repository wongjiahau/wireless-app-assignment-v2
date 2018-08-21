import React, { Component } from 'react';
import { Controller } from './js/Controller';
import { TaskForm } from './TaskForm';

export class AddTaskScreen extends Component {
  static navigationOptions = {
    title: "Add new task"
  }

  render() {
    const emptyTask = {
      title: "",
      content: "",
      reminder: null
    };

    return (
      <TaskForm 
        task={emptyTask}
        handleTask={(task, callback) => Controller.createTask(
          task.title,
          task.content,
          task.reminder,
          callback
        )}
        navigation={this.props.navigation}
        buttonText="ADD TASK"
        renderMessage={(task) => `Created task: ${task.title}`}
        />
    );
  }

}
