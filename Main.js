/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import {
    createStackNavigator
} from "react-navigation";
import { MovieListScreen } from "./MovieListScreen";
import { HomeScreen } from "./HomeScreen";
import { MovieScreen } from "./MovieScreen";
import { AddReminderScreen } from "./AddReminderScreen";

export const Main = createStackNavigator({
    'Home': {
        screen: HomeScreen
    },
    'MovieListScreen': {
        screen: MovieListScreen
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