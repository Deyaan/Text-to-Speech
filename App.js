import * as React from 'react';
import * as Speech from 'expo-speech';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AdMobInterstitial, AdMobBanner, AdMobRewarded } from 'expo-ads-admob';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.bannerAdID =
      Platform.OS === 'ios'
        ? 'ca-app-pub-1357280268793427/8944079277'
        : 'ca-app-pub-1357280268793427/9961647475';
    this.interstitialAdID =
      Platform.OS === 'ios'
        ? 'ca-app-pub-1357280268793427/6126344246'
        : 'ca-app-pub-1357280268793427/6892631000';
    this.rewardID =
      Platform.OS === 'ios'
        ? 'ca-app-pub-1357280268793427/6126344246'
        : 'ca-app-pub-ca-app-pub-1357280268793427/4216165077';
  }

  async componentDidMount() {
    AdMobInterstitial.setAdUnitID(this.interstitialAdID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
  }
  speak = () => {
    var thingToSay = this.state.name;
    Speech.speak(thingToSay);

    AdMobRewarded.setAdUnitID(this.rewardID);
    AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    AdMobRewarded.showAdAsync();
  };

  render() {
    return (
      <SafeAreaProvider>
        <View>
          <Header
            backgroundColor={'#00bfff'}
            centerComponent={{
              text: 'Text To Speech Coverter',
              style: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
            }}
          />
          <View style={{ alignSelf: 'center' }}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={this.bannerAdID}
              servePersonalizedAds={false}
            />
          </View>
          <Image
            style={styles.imageIcon}
            source={require('./textToSpeech.png')}
          />
          <Text style={styles.title}>Enter the word</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
            value={this.state.name}
            defaultValue={'The'}
            placeholder="Type your text here"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.state.name === '' || this.state.name == ' '
                ? alert('Please type your text to hear the speech.')
                : this.speak();
            }}>
            <Text style={styles.buttonText}>Click Here to hear Speech</Text>
          </TouchableOpacity>
          <View style={{ alignSelf: 'center' }}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={this.bannerAdID}
              servePersonalizedAds={false}
            />
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 25,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  imageIcon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 15,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 17,
  },
  button: {
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 100,
    backgroundColor: '#00bfff',
    padding: 5,
    width: 300,
    height: 70,
    borderWidth: 3,
  },
  buttonText: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
