import {
  createStackNavigator
} from "react-navigation";
import { AddTaskScreen } from "./AddTaskScreen";
import { TaskListScreen } from "./TaskListScreen";
import { EditTaskScreen } from "./EditTaskScreen";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

export const Main = createStackNavigator({
  'LoginScreen': {
    screen: LoginScreen,
  },
  'RegisterScreen': {
    screen: RegisterScreen,
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