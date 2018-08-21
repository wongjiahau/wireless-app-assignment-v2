import {
  createStackNavigator
} from "react-navigation";
import { AddTaskScreen } from "./AddTaskScreen";
import { TaskListScreen } from "./TaskListScreen";
import { EditTaskScreen } from "./EditTaskScreen";

export const Main = createStackNavigator({
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