//import LIB từ https://github.com/ericmorgan1/swisscalc-lib 
require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.calc.calculator.js");
//

import React from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, StatusBar } from 'react-native';
import {CalcButton} from './../components';
import {CalcDisplay} from './../components';



export default class CalculatorScreen extends React.Component {
  constructor(props){
      super(props);
        this.state= {
            orientation: "portait"
        }
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new swisscalc.calc.calculator();  

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => { },
            onPanResponderRelease: (evt, gestureState) => {
              if (Math.abs(gestureState.dx) >= 50) {
                this.onBackspacePress();
              }
            },
          })
        } 
  

  onBackspacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  }
   

  onDigitPress = (digit) =>{
    this.calc.addDigit(digit);
    this.setState({display: this.calc.getMainDisplay()});
  }
  //xoa du lieu NUT C
  onClearPress = () => {
    this.calc.clear();
    this.setState({display: this.calc.getMainDisplay()});
  }
  //am duong press
  ongPlusMinusPress = () => {
      this.calc.negate();
      this.setState({display: this.calc.getMainDisplay()});
  }
// / x + - , co tich
  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }
// = 
  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  }

// %

onUnaryOperatorPress = (operator) => {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }
renderPortrait() {
    return (
        <View style={{flex:1}}>
        <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
        />
                <View style={styles.containerMain}>
                <View style={{flex:1, justifyContent: "flex-end"}} {...this.panResponder.panHandlers}>
                    <CalcDisplay display={this.state.display} />
                </View>
                <View style={styles.buttonRow}>
                    <CalcButton onPress={this.onClearPress} title="C" color="black" backgroundColor="white" />
                    <CalcButton onPress={this.ongPlusMinusPress} title="+/-" color="black" backgroundColor="white" />
                    <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="%" color="black" backgroundColor="white" />
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="/" color="white" backgroundColor="#FF9800" />
                </View>

                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => {this.onDigitPress("7") }} title="7" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("8") }} title="8" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("9") }} title="9" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="x" color="white" backgroundColor="#FF9800" />
                </View>
                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => {this.onDigitPress("4") }} title="4" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("5") }} title="5" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("6") }} title="6" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title="-" color="white" backgroundColor="#FF9800" />
                </View>
                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => {this.onDigitPress("1") }} title="1" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("2") }} title="2" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => {this.onDigitPress("3") }} title="3" color="white" backgroundColor="#607D8B" />
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title="+" color="white" backgroundColor="#FF9800" />
                </View>
                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => {this.onDigitPress("0") }} title="0" color="white" backgroundColor="#607D8B" style={{width: 140}} />
                    <CalcButton onPress={() => {this.onDigitPress(".") }}  title="." color="white" backgroundColor="#607D8B"  />
                    <CalcButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#FF9800" />
                </View>
            </View>

        </View>
    )

}
  
    render() {
        return (
            <View style={styles.containerMain}>
                {this.renderPortrait()}
            </View>
        );
    }   
} 
const styles = StyleSheet.create({
    containerMain :{flex:1, backgroundColor:"black"},
    displayContainer: {flex:1, justifyContent:"flex-end"},
    buttonRow: {flexDirection: 'row',justifyContent: 'space-between'},
})
