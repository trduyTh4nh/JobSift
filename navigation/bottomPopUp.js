import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { useFonts } from "expo-font"
import Icon from 'react-native-remix-icon';
import STYLE from '../assets/css/universal'

const deviceHeight = Dimensions.get("window").height;

export class BottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  renderOutsideTouchable(onTouch) {
    if (!onTouch) return <View style={{ flex: 1, width: "100%" }} />;

    return (
      <React.Fragment>
        <TouchableOpacity onPress={onTouch} style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1, width: "100%" }} />
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View>
        <Text style={{
          color: "#182E44",
          fontSize: 20,
          fontWeight: "500",
          margin: 15,
        }}>{title}</Text>
      </View>
    );
  }



  renderContent = () => {
    const { data } = this.props
    return (
      <View>
        <FlatList
          style={{
            marginBottom: 20
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={this.renderItem}
          extraData={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={{
            paddingBottom: 40
          }}
        >

        </FlatList>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <TouchableOpacity style={{
          backgroundColor: item.colorTag,
          marginTop: 16,
          padding: 20,
          width: "90%",
          borderRadius: 20,
          borderWidth: 2,
          display: "flex",
          flexDirection: "row",
          gap: 10
        }} onPress={() => hideHeaderJob(item)}>
          <Icon name={item.iconName}></Icon>
          <Text style={styles.textInMenu}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSeparator = () => {
    <View style={{
      opacity: 0.1,
      backgroundColor: "#182E44",
      height: 1
    }}></View>
  }


  render() {
    const { show } = this.state;
    const { onTouchOutside, title, onDataFromChild } = this.props;

    hideHeaderJob = (item) => {
      if (item.id == 1) {
        this.close()
        const hidden = false
        onDataFromChild(hidden);
      }

    }


    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View style={{ flex: 1, backgroundColor: "#000000AA", justifyContent: "flex-end" }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View style={{
            backgroundColor: "#fff",
            width: "100%",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.4,
          }}>
            <View style={{ padding: 30, marginBottom: -70 }}>
              <Text
                style={{
                  ...STYLE.textTitle
                }}
              >Tuỳ chọn</Text>
            </View>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}

export default BottomPopup;


const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    color: 'blue',
  },
  buttonInMenu: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 20,
    width: "90%",
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  wrapMenu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textInMenu: {
    fontFamily: "RubikNormal",
    fontSize: 18,
    color: "#000"
  }
});


