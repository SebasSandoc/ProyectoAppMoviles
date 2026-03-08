import {View, Text, Button} from 'react-native'

export default function NewTaskScreen({navigation}){
    return(
        <View>
            <Text>Pagina nueva tarea</Text>
            <Button title='Home Screen' onPress={()=>navigation.navigate("Home")}/>
        </View>
    );
}