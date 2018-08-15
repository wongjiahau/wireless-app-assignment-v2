/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text,
    View
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
        const pinnedTask = this.state.tasks.filter((x) => x.pinned === 1);
        const unpinnedTask = this.state.tasks.filter((x) => x.pinned === 0);
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.tasks.length > 0 ? null :
                    <View>
                        <Text>There is no on going task.</Text>
                    </View>

                }
                {
                    pinnedTask.length === 0 ? null: 
                    <View>
                        <Text style={styles.header}>Pinned tasks</Text>
                        {this.renderTask(pinnedTask)}
                    </View>
                }
                <Text>{"\n"}</Text>
                {
                    unpinnedTask.length === 0 ? null:
                    <View>
                        <Text style={styles.header}>Unpinned tasks</Text>
                        {this.renderTask(unpinnedTask)}
                    </View>
                }
            </ScrollView>
        )
    }

    renderTask = (tasks) => {
        return tasks.map((x) => (
            <TaskItem 
                key={x.id}
                title={x.title}
                handleEdit={this.handleEdit}
                handleDelete={() => this.handleDelete(x)}
                handleTogglePin={() => this.handleTogglePin(x)}
                handleToggleComplete={() => this.handleToggleComplete(x)}
                />
        ))
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
        Controller.getOnGoingTask((tasks) => {
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
    },
    header: {
        marginLeft: 1
    }
})