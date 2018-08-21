import {
  createStackNavigator
} from "react-navigation";
import { HomeScreen } from "./HomeScreen";
import { AddTaskScreen } from "./AddTaskScreen";
import { TaskListScreen } from "./TaskListScreen";
import { EditTaskScreen } from "./EditTaskScreen";

export const Main = createStackNavigator({
  'Home': {
    screen: HomeScreen
  },
  'TaskListScreen': {
    screen: TaskListScreen
  },
  'AddTaskScreen': {
    screen: AddTaskScreen
  },
  'EditTaskScreen': {
    screen: EditTaskScreen
  }
}, {
  initialRouteName: 'TaskListScreen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'lightblue',
    }
  }
}
) 