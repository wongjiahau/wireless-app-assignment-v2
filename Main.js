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
import { AddMovieScreen } from "./AddMovieScreen";

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
    'AddMovieScreen': {
        screen: AddMovieScreen
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