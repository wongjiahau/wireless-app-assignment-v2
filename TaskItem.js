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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={{ marginTop: -10 }}>
              <View style={styles.buttonView}>
                <Text style={styles.textStyling}>{this.props.title}</Text>
                <Button style={styles.buttons}
                    large
                    icon={{name: 'edit', type:'font-awesome'}}
                    title='EDIT'
                    buttonStyle={{
                    backgroundColor: "#daa520",
                    ...buttonStyle
                    }} 
                    onPress={this.props.handleEdit}
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
                  onPress={this.props.handleTogglePin}
                  />

                <Button style={styles.buttons}
                  large
                  icon={{name: 'check', type:'feather'}}
                  title='MARK AS COMPLETE'
                  buttonStyle={{
                    backgroundColor: "#20b2aa",
                    ...buttonStyle
                  }} 
                  onPress={this.props.handleToggleComplete}
                  />
              
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View>
            <Text style={styles.textStyling}>{this.props.title}</Text>
            </View>
          </TouchableHighlight>
          
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
  textStyling: {
    width: 360,
    height: 70, 
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 10, 
    fontSize: 20,
  },
  buttonView: {
    paddingTop: 80,
    paddingBottom: 0,
    paddingLeft: 45,
  },
  buttons: {

  }
});

