import {View, Text, Button} from 'react-native'

//sin uso, reemplazado por la pantalla de configuraciones

export default function ProfileScreen({navigation}){
    return(
        <View>
            <Text>Pagina profile</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}