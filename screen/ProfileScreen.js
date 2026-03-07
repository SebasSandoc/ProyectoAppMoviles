import {View, Text, Button} from 'react-native'

export default function ProfileScreen({navigation}){
    return(
        <View>
            <Text>Pagina profile</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}