import React, { Component } from 'react';
import { Controller } from '../js/Controller';
import {
  Image,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';
import Modal from "react-native-modal";
import FloatingAction from '../react-native-floating-action/component/FloatingAction';

const actions = [{
  text: 'Add new task',
  color: '#c80000',
  // @ts-ignore
  icon: require('../images/plus.png'),
  name: 'add',
  position: 2
}, {
  text: 'Filter',
  color: '#c80000',
  // @ts-ignore
  icon: require('../images/fiterv2.png'),
  name: 'filter',
  position: 1
},{
  text: 'Backup',
  color: '#c80000',
  // @ts-ignore
  icon: require('../images/upload.png'),
  name: 'backup',
  position: 0
}];

var radio_props = [
  { label: 'ON Going', value: 0 },
  { label: 'COMPLETE', value: 1 },
  { label: '  all   ', value: 2 },
];
export class OpenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: null,
      fabPressed: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <FloatingAction
          actions={actions}
          color={'#a80000'}
          floatingIcon={(
            <Image
              source={
                this.state.fabPressed ? 
                // @ts-ignore
                require("../images/xv3.png") :
                // @ts-ignore
                require("../images/hamburger.png")
              }
            />
          )}
          onBackdropPress={this.closeFab}
          onPressMain={() => this.setState({fabPressed: !this.state.fabPressed})}
          onPressItem={(name) => {
            switch (name) {
              case 'add':
                this.closeFab();
                this.props.navigation.navigate("AddTaskScreen")
                break;
              case 'filter':
                this.closeFab();
                this.setState({ modalVisible: 1 });
                break;
              case 'backup':
                this.closeFab();
                Controller.uploadTask(() => ToastAndroid.show("Successfully save your data to server!", ToastAndroid.SHORT));
                break;
            }
          }
          }
        />

        {!this.state.modalVisible ? null :
        <Modal
          isVisible={this.state.modalVisible === 1}
          onBackdropPress={() => {
            this.setState({ modalVisible: null });
            this.closeFab();
          }}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={150}
          animationOutTiming={150}
          >
          <View style={styles.modalContent}>
            <View style={styles.buttonRow}>
              {this.props.showOnGoingTasks && !this.props.showCompletedTasks ? null :
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.closeFab();
                this.props.handleShowOnGoingTasks();
                }}>
                  <Text style={styles.text}> Show on-going tasks only</Text>
              </TouchableOpacity>}

              {this.props.showCompletedTasks && !this.props.showOnGoingTasks ? null :
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.closeFab();
                this.props.handleShowCompletedTasks();
                }}>
                  <Text style={styles.text}> Show completed tasks only </Text>
              </TouchableOpacity>}

              {this.props.showCompletedTasks && this.props.showOnGoingTasks ? null :
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.closeFab();
                this.props.handleAllTasks();
                }}>
                  <Text style={styles.text}> Show all tasks</Text>
              </TouchableOpacity>}
            </View>
          </View>
        </Modal>}
      </View>
    ); 
  }

  closeFab = () => this.setState({fabPressed: false, modalVisible: null})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    flex:1,
    backgroundColor: 'lightblue',
    padding: 10,
    margin:5,
    width:300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'grey',
  },
  buttonRow: {
    margin: 40,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    height:400,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'grey',
  },
});