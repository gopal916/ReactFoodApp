import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginComponent from './LoginComponent';
import HomeComponent from './homecomponent';
import RecipeDetail from './RecipeDetail'
import AddReceipe from './AddReceipe'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Image,TouchableOpacity} from 'react-native';


const Appcontainer = createAppContainer(
  createStackNavigator({
    Login: {screen: LoginComponent},
    Home: {
      screen: HomeComponent,
      navigationOptions: {
        headerRight: () => (
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('AddReceipe', {
              recipeInfo: "",
            });
          }}>
            <Image
              style={{width: 20, height: 20, marginRight: 16}}
              source={require('./image/plus.png')}></Image>
          </TouchableOpacity>
        ),
      },
    },
    RecipeDetail: {screen: RecipeDetail},
    AddReceipe: {screen: AddReceipe},
   
  }),
);

const initState = {
  token: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        token: action.payload,
      };
      break;
    default:
      return {
        token: action.payload,
      };
  }
};

const storeName = createStore(reducer);

export default function App() {
  return (
    <Provider store={storeName}>
      <Appcontainer />
    </Provider>
  );
}
