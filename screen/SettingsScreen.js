import {View, Text, Button} from 'react-native'

export default function SettingsScreen({navigation}){
    return(
        <View>
            <Text>Pagina configuracion</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}