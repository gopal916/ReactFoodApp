import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageLoad from 'react-native-image-placeholder';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class HomeComponent extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  state = {
    isLoading: false,
    itemArray: [],
  };

  componentDidMount() {
    return this.fetchFoodItem();
  }

  recipeClick = info => {
    this.props.navigation.navigate('RecipeDetail', {
      recipeInfo: JSON.stringify(info),
    });
  };

 

  fetchFoodItem = () => {
    this.setState({
      isLoading: true,
    });

    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(responseJson => {
        this.setState({
          isLoading: false,
          itemArray: responseJson.map(function(item) {
            return {
              recipeId: item.recipeId,
              name: item.name,
              photo: item.photo,
              preparationTime: item.preparationTime,
              serves: item.serves,
              complexity: item.complexity,
              firstName: item.firstName,
              lastName: item.lastName,
              inCookingList: item.inCookingList,
            };
          }),
        });
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.itemArray}
            renderItem={(info, index) => (
              <TouchableWithoutFeedback
                onPress={() => this.recipeClick(info.item)}>
                <View style={myStyle.itemViewStyle}>
                  <ImageLoad
                    style={{height: 250}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    imageStyle={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    source={
                      info.item.photo != null
                        ? {uri: info.item.photo}
                        : require('./image/splashback.jpeg')
                    }>
                    <TouchableOpacity
                      style={{alignItems: 'flex-end', zIndex: 1}}>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          margin: 16,
                          width: 40,
                          height: 40,
                          borderRadius: 150 / 2,
                          backgroundColor: 'white',
                        }}>
                        <Image
                          style={{
                            width: 26,
                            height: 26,
                            tintColor: 'red',
                            marginTop: 8.8,
                            marginRight: 8,
                          }}
                          source={require('./image/heart.png')}></Image>
                      </View>
                    </TouchableOpacity>
                  </ImageLoad>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={myStyle.textStyle}>{info.item.name}</Text>
                    <Text style={myStyle.textSmallStyle}>
                      {info.item.firstName} {info.item.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}>
            {' '}
          </FlatList>
          {this.state.isLoading ? (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '120%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: 1,
              }}>
              <ActivityIndicator
                size="large"
                isLoading="true"
                color="white"
                style={{flex: 1, zIndex: 1}}></ActivityIndicator>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const myStyle = StyleSheet.create({
  itemViewStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    margin: 10,
    elevation: 7,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    marginLeft: 5,
    marginTop: 5,
  },
  textSmallStyle: {
    color: '#939393',
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 5,
  },
});

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(HomeComponent);
