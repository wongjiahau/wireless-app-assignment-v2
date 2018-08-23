import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  View
} from "react-native";
import { TaskItem } from './TaskItem';
import { Controller } from '../js/Controller';
import { OpenModal } from './OpenModal';
import { Database } from '../js/Database';
import { NavigationActions } from 'react-navigation';

const DEBUG = false;
if(DEBUG) {
  Database.reinitializeDatabase();
}

export class TaskListScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Task Reminder App",
      headerLeft: null,
      headerRight: (
        <View style={{marginRight: 10}}>
          <Button title="logout" onPress={async () => {
            try {
              await Controller.uploadTask(async() => {
                await Controller.logout();
                navigation.navigate("WelcomeScreen");
              })
            } catch(error) {
              Alert.alert("Unable to backup your data.");
            }
          }}/>
        </View>
    )
    }
  } 

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showCompletedTasks: false,
      showOnGoingTasks: true
    };
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.refresh()),
    ];
  }

  render() {
    const onGoingTasks = this.state.tasks.filter((x) => x.completed === 0);
    const pinnedTask   = onGoingTasks.filter((x) => x.pinned === 1);
    const unpinnedTask = onGoingTasks.filter((x) => x.pinned === 0);

    const completedTask = this.state.tasks.filter((x) => x.completed === 1);
    return (
      <OpenModal 
        showOnGoingTasks={this.state.showOnGoingTasks}
        showCompletedTasks={this.state.showCompletedTasks}
        navigation={this.props.navigation}
        handleShowOnGoingTasks={()=>{
          this.setState({
            showOnGoingTasks: true,
            showCompletedTasks: false
          })
        }} 
        handleShowCompletedTasks={()=>{
          this.setState({
            showOnGoingTasks: false,
            showCompletedTasks: true
          })
        }}
        handleAllTasks={()=>{
          this.setState({
            showOnGoingTasks: true,
            showCompletedTasks: true
          })
        }}
        >
        <ScrollView style={styles.container}>
          {!this.state.showOnGoingTasks ? null :
            <View>
              <Text style={styles.title}>On-going tasks</Text>
              {onGoingTasks.length > 0 ? null :
              <View>
                <Text>There is no on going task.</Text>
              </View>}

              {pinnedTask.length === 0 ? null: 
              <View>
                <Text style={styles.header}>Pinned tasks</Text>
                {this.renderTask(pinnedTask)}
              </View>}

              <Text>{"\n"}</Text>

              {unpinnedTask.length === 0 ? null:
              <View>
                <Text style={styles.header}>Unpinned tasks</Text>
                {this.renderTask(unpinnedTask)}
                <Text>{"\n\n"}</Text>
              </View>}
            </View>}
          {!this.state.showCompletedTasks ? null :
            <View>
              {completedTask.length > 0 ? null :
              <View>
                <Text>There is no completed task.</Text>
              </View>}
              {completedTask.length === 0 ? null : 
              <View>
                <Text style={styles.title}>Completed tasks</Text> 
                {this.renderTask(completedTask)}
              </View>}
            </View>
          }
          <Text>{"\n\n"}</Text>
        </ScrollView>
      </OpenModal>
    )
  }

  renderTask = (tasks) => {
    return tasks.map((x) => (
      <TaskItem 
        key={x.id}
        title={x.title}
        content={x.content}
        pinned={x.pinned}
        reminder={x.reminder}
        completed={x.completed}
        handleEdit={() => this.handleEdit(x)}
        handleDelete={() => this.handleDelete(x)}
        handleTogglePin={() => this.handleTogglePin(x)}
        handleToggleComplete={() => this.handleToggleComplete(x)}
        />
    ))
  }

  handleEdit = (task) => {
    this.props.navigation.navigate("EditTaskScreen", {task: task});
  }

  handleDelete = (task) => {
    Alert.alert(
    "Warning", 
    `Are you sure you want to delete ${task.title}?`,
    [
      { text: "Cancel", style: "cancel",},
      { text: "DELETE", style: "destructive", onPress: () => {
        Controller.deleteTask(task.id, (result) => {
          if(result.rowsAffected > 0) {
            this.refresh();
            ToastAndroid.show(
              `Deleted task: "${task.title}"`, 
              ToastAndroid.SHORT
            );
          } else {
            alert("An error occured when deleting the task.");
          }
        });
      }}
    ]
    )
  }

  handleToggleComplete = (task) => {
    if(task.completed === 0)         {
      Controller.encompleteTask(task, () => {
        ToastAndroid.show(`Completed "${task.title}"`, ToastAndroid.SHORT);
        this.refresh();
      })
    } else if(task.completed === 1) {
      Controller.decompleteTask(task, () => {
        ToastAndroid.show(`"${task.title}" is marked as uncompleted.`, ToastAndroid.SHORT);
        this.refresh();
      })
    }
  }

  handleTogglePin = (task) => {
    if(task.pinned === 0) {
      Controller.enpinTask(task, () => {
        ToastAndroid.show(`Pinned "${task.title}"`, ToastAndroid.SHORT);
        this.refresh();
      });
    } else if(task.pinned === 1) {
      Controller.depinTask(task, () => {
        ToastAndroid.show(`Unpinned "${task.title}"`, ToastAndroid.SHORT);
        this.refresh();
      });
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    Controller.getAllTask((tasks) => {
      this.setState({tasks: tasks});
    });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    marginLeft: 1
  },
  title: {
    fontSize: 20, 
    marginBottom: 5
  }
})