/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    ToastAndroid
} from "react-native";
import { TaskItem } from './TaskItem';
import { Controller } from './js/Controller';

export class TaskListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.tasks.map((x) => (
                    <TaskItem 
                        key={x.id}
                        title={x.title}
                        handleEdit={this.handleEdit}
                        handleDelete={() => this.handleDelete(x)}
                        handleTogglePin={this.handleTogglePin}
                        handleToggleComplete={this.handleToggleComplete}
                        />
                ))}
            </ScrollView>
        )
    }

    handleEdit = (task) => {
        // this.props.navigation.navigate()
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

    }

    handleTogglePin = (task) => {

    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        Controller.getAllTask((tasks) => {
            this.setState({tasks: tasks});
        });
    }
}

TaskListScreen.navigationOptions = {
    title: "View tasks"
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})