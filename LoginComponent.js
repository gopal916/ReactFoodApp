import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LoginComponent extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    title: 'Hunger Zone',
    txtUserName: 'jm1@example.com',
    txtPassword: 'jay@123',
    isLoading: false,
  };

  edtUsernameHandler = value => {
    this.setState({
      txtUserName: value,
    });
  };

  edtPasswordHandler = valuepassword => {
    this.setState({
      txtPassword: valuepassword,
    });
  };

  btnclick = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.txtUserName == '') {
      alert('Email is blank');
    } else if (reg.test(this.state.txtUserName) === false) {
      alert('Email is not valid');
    } else if (this.state.txtPassword == '') {
      alert('Password is blank');
    } else {
      this.doLogin();
    }
  };

  doLogin = () => {
    this.setState({
      isLoading: true,
    });

    fetch('http://35.160.197.175:3006/api/v1/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        email: this.state.txtUserName,
        password: this.state.txtPassword,
      }),
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(responjson => {
        this.setState({
          isLoading: false,
        });
        if (responjson != null) {
          this.props.updateT(responjson.token);

          const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
          });
          this.props.navigation.dispatch(navigateAction);
        } else {
          alert('Login Failed!');
        }
      });
  };

  render() {
    return (
      <View style={{Colors: 'white'}}>
        <ImageBackground
          source={require('./image/splashback.jpeg')}
          style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'rgba(1,1,1,0.7)',
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={mystyles.textviewStyle}>{this.state.title}</Text>
            <TextInput
              placeholder="Email"
              value={this.state.txtUserName}
              style={mystyles.edtStyle}
              onChangeText={this.edtUsernameHandler}></TextInput>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={[mystyles.edtStyle, {marginTop: 20}]}
              onChangeText={this.edtPasswordHandler}
              value={this.state.txtPassword}></TextInput>
            {/* <View style={mystyles.btnStyle}>
              <Button title="Login" onPress={this.btnclick}></Button>
            </View> */}
            <TouchableOpacity onPress={this.btnclick}>
              <Text style={mystyles.buttonText}>Login</Text>
            </TouchableOpacity>

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
        </ImageBackground>
      </View>
    );
  }
}

const mystyles = StyleSheet.create({
  textviewStyle: {
    fontSize: 30,
    color: 'white',
    alignItems: 'center',
  },
  edtStyle: {
    backgroundColor: '#ffffff',
    borderColor: 'white',
    borderRadius: 20,
    width: '80%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 40,
    fontSize: 12,
    marginTop: 30,
  },
  btnStyle: {
    color: '#f7c744',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonText: {
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: 'orange',
    color: 'white',
    width: 325,
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const updateToken = token => {
  return {
    type: 'UPDATE_TOEKN',
    payload: token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateT: token1 => updateToken(token1),
    },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
