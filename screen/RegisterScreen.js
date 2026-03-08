import {View, Text, Button} from 'react-native'

export default function RegisterScreen({navigation}){
    return(
        <View>
            <Text>Pagina registro</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}