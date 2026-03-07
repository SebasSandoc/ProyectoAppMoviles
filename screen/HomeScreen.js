import {StyleSheet, Text, View, Button, TextInput, ScrollView, Image} from 'react-native'

export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>
              <ScrollView>
              <Image source={{uri:'https://static.wikia.nocookie.net/silly-cat/images/0/0e/Zazu.png'}}  style={{width:100, height:100}}/>
              <Text style={styles.title}>App movil</Text>
              <TextInput placeholder='ingrese un dato' style ={{padding: 1, borderWidth:1}}/>
              <Button title='Profile Screen' onPress={()=>navigation.navigate("Profile")}/>
              </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 2,
    margin:2,
    fontFamily: 'Arial',
    fontSize: 20,
    color: "#f10",
    textAlign: "center"
  }
});