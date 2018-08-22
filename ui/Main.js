import {
  createStackNavigator,
} from "react-navigation";
import { AddTaskScreen } from "./AddTaskScreen";
import { TaskListScreen } from "./TaskListScreen";
import { EditTaskScreen } from "./EditTaskScreen";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import { WelcomeScreen } from "./WelcomeScreen";

export const Main = createStackNavigator({
  'WelcomeScreen': {
    screen: WelcomeScreen
  },
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
  initialRouteName: 'WelcomeScreen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'lightblue',
    }
  }
}
) 