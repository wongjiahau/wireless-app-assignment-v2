import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Icon,Button } from 'react-native-elements'
import { formatDate } from '../util';
import { NULL_DATE } from '../js/Database';

const buttonStyle = {
  height : 100,
  width : 300,
  borderWidth : 0,
  borderRadius : 10,
  marginTop: 20
}


export class TaskItem extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            style={{height: 80}}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View>
              <Text style={styles.heading1}>{this.props.title}</Text>
              {this.props.reminder === NULL_DATE ? null :
              <Text style={styles.subtitle}>{"Reminder: " + formatDate(this.props.reminder)}</Text>
              }
            </View>
          </TouchableHighlight>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={{ marginTop: -10 }}>
              <View style={styles.buttonView}>
                <Text style={styles.heading1}>{this.props.title}</Text>
                <Button style={styles.buttons}
                    large
                    icon={{name: 'edit', type:'font-awesome'}}
                    title='EDIT'
                    buttonStyle={{
                      backgroundColor: "#daa520",
                      ...buttonStyle
                    }} 
                    onPress={() => {
                      this.setModalVisible(false);
                      this.props.handleEdit();
                    }}
                  />

                <Button style={styles.buttons}
                  large
                  icon={{name: 'delete', type:'material-community'}}
                  title='DELETE'
                  buttonStyle={{
                    backgroundColor: "#b22222",
                    ...buttonStyle
                  }} 
                  onPress={this.props.handleDelete}
                  />

                <Button style={styles.buttons}
                  large
                  icon={!this.props.pinned ? {name: 'pin', type:'entypo'} : {name: 'pin-off', type: 'material-community'}}
                  title={this.props.pinned ? 'UNPIN' : 'PIN'}
                  buttonStyle={{
                    backgroundColor: "#87ceeb",
                    ...buttonStyle
                  }} 
                  onPress={() => {
                    this.props.handleTogglePin();
                    this.setModalVisible(false);
                  }}
                  />

                <Button style={styles.buttons}
                  large
                  icon={this.props.completed ? {name: "cancel"} : {name: 'check', type:'feather'}}
                  title={this.props.completed ? 'MARK AS UNCOMPLETED' : 'MARK AS COMPLETED'}
                  buttonStyle={{
                    backgroundColor: "#20b2aa",
                    ...buttonStyle
                  }} 
                  onPress={this.props.handleToggleComplete}
                  />
              
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  heading1: {
    width: 360,
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 10, 
    fontSize: 20,
  },
  subtitle: {
    paddingBottom: 10,
    paddingLeft: 10
  },
  buttonView: {
    paddingTop: 80,
    paddingBottom: 0,
    paddingLeft: 45,
  },
  buttons: {

  }
});

