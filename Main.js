/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import {
    createStackNavigator
} from "react-navigation";
import { HomeScreen } from "./HomeScreen";
import { MovieScreen } from "./MovieScreen";
import { AddReminderScreen } from "./AddReminderScreen";
import { TaskListScreen } from "./TaskListScreen";

export const Main = createStackNavigator({
    'Home': {
        screen: HomeScreen
    },
    'TaskListScreen': {
        screen: TaskListScreen
    },
    'MovieScreen': {
        screen: MovieScreen,
    },
    'AddReminderScreen': {
        screen: AddReminderScreen
    }
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'lightblue',
        }
    }
}
) 