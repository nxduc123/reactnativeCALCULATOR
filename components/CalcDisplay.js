import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CalcButton extends React.Component {
  
    static defaultProps = {
        display: "",
    }

    render() {
        
    return (
        <View style={styles.container}>
            <Text style={styles.display} >{this.props.display}</Text>
        </View>    
    );
  }
}

const styles = StyleSheet.create({
    container: {},
    display: {fontSize: 60,color:"white", textAlign: "right"}
});
