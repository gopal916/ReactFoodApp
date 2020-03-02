import React from 'react';

import {
  View,
  Text,
  Image,
  ImageLoad,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Provider as PaperProvider, Chip} from 'react-native-paper';

export default class RecipeDetail extends React.Component {
  state = {
    recipeInfo: {},
  };

  componentDidMount() {
    this.setState({
      recipeInfo: JSON.parse(
        this.props.navigation.state['params']['recipeInfo'],
      ),
    });
    console.log(this.state.recipeInfo);
  }

  render() {
    return (
      <PaperProvider>
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
            <Image
              source={
                this.state.recipeInfo.photo != null
                  ? {uri: this.state.recipeInfo.photo}
                  : require('./image/splashback.jpeg')
              }
              style={{
                height: 250,
                width: '100%',
                borderRadius: 10,
              }}
            />

            <View>
              <Text style={mystyle.textStyle}>
                {this.state.recipeInfo.name}{' '}
              </Text>
              <Text style={mystyle.textSmallStyle}>
                By{' '}
                {this.state.recipeInfo.firstName +
                  ' ' +
                  this.state.recipeInfo.lastName}{' '}
              </Text>
              <View style={{flexDirection: 'row',marginTop:20}}>
                <Chip
                  style={mystyle.chipStyle}
                  onPress={() => console.log('Pressed')}>
                  Noodles
                </Chip>
                <Chip
                  style={mystyle.chipStyle}
                  onPress={() => console.log('Pressed')}>
                  Italian
                </Chip>
                <Chip
                  style={mystyle.chipStyle}
                  onPress={() => console.log('Pressed')}>
                  Main Dish
                </Chip>
              </View>
              <View style={{flexDirection:"row",marginTop:22}}>
                <View>
                  <View
                    style={{
                    
                      width: 100,
                      height: 75,
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      style={{width: 28, height: 28, alignItems: 'center'}}
                      source={require('./image/clock_time.png')}></Image>
                    <Text style={mystyle.txtNormalStyle}>{this.state.recipeInfo.preparationTime}</Text>
                  </View>
                </View>
                <View style={{backgroundColor:'#EBEDEF' ,width:1}}></View>
                <View>
                  <View
                    style={{
                    
                      width: 100,
                      height: 75,
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      style={{width: 28, height: 28, alignItems: 'center'}}
                      source={require('./image/heart_cal.png')}></Image>
                    <Text style={mystyle.txtNormalStyle}>130 Cal</Text>
                  </View>
                </View>
                <View style={{backgroundColor:'#EBEDEF' ,width:1}}></View>
                <View>
                  <View
                    style={{
                    
                      width: 100,
                      height: 75,
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      style={{width: 28, height: 28, alignItems: 'center'}}
                      source={require('./image/ingredients.png')}></Image>
                    <Text style={mystyle.txtNormalStyle}>3/5</Text>
                  </View>
                </View>
                <View>
          
              </View>
              
            </View>
            </View>
            <View></View>
          </View>
        </View>
      </PaperProvider>
    );
  }
}
const mystyle = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    marginTop: 10,
    alignItems: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
  },
  textSmallStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#82E0AA',
  },
  txtNormalStyle: {
    fontSize: 15,
    marginTop: 10,

    color: 'black',
  },
  chipStyle: {
    marginRight: 10,
    marginTop: 10,
  },
});
