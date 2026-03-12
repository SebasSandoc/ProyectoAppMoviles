import {View, Text, StyleSheet} from 'react-native'



export default function SettingsScreen({navigation}){

    

    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Calendario</Text>
            </View>
            <View style={{height:70}}/>
        </View>
    );
}

