import {View, Text, Button} from 'react-native'

export default function CalendarScreen({navigation}){
    return(
        <View>
            <Text>Pagina calendario</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}