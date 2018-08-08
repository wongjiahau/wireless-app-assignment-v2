import {
    createStackNavigator
} from "react-navigation";
import { MovieListScreen } from "./MovieListScreen";
import App from "./App";
import { HomeScreen } from "./HomeScreen";
import { MovieScreen } from "./MovieScreen";

export const Main = createStackNavigator({
    'Home': {
        screen: HomeScreen
    },
    'MovieListScreen': {
        screen: MovieListScreen
    },
    'MovieScreen': {
        screen: MovieScreen,
    }
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'green'
        }
    }
}
) 