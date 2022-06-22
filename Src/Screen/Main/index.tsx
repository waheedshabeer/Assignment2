import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const Main = () => {
  const [isVisible, setisVisible] = useState(true);
  const [parkingLotNumber, setParkingLotNumber] = useState(0);
  // const [parkingLotRight, setParkingLotRight] = useState([]);
  // const [parkingLotLeft, setParkingLotLeft] = useState([]);
  const [parkingLotLine, setParkingLotLine] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const parkingLotsLeft = useSelector(
    initialState => initialState.parkingLotsLeft,
  );
  const parkingLotsRight = useSelector(
    initialState => initialState.parkingLotsRight,
  );
  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch({type: 'setParkingLotsLeft', payLoad: parkingLotsLeft});
      dispatch({type: 'setParkingLotsRight', payLoad: parkingLotsRight});
    });
  }, [parkingLotsLeft, parkingLotsRight]);

  useEffect(() => {
    let leftLots = [];
    let rightLots = [];

    if (parkingLotNumber > 0) {
      for (let index = 0; index < parkingLotNumber * 2; index++) {
        parkingLotLine.push(1);
      }
      for (let index = 0; index < parkingLotNumber; index++) {
        if (isEven(index)) {
          console.log(parkingLotsLeft);
          leftLots.push({reserved: false, id: getRandomInt(1, 1000)});
        } else {
          rightLots.push({reserved: false, id: getRandomInt(1, 1000)});
        }
      }
      dispatch({type: 'setParkingLotsLeft', payLoad: leftLots});
      dispatch({type: 'setParkingLotsRight', payLoad: rightLots});
    }
  }, [parkingLotNumber]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function isEven(n) {
    return n % 2 == 0;
  }

  function isOdd(n) {
    return Math.abs(n % 2) == 1;
  }
  const renderLeftParking = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('EachSpace', {item})}
          style={{
            width: 150,
            height: 50,
            backgroundColor: item?.reserved === true ? '#808B96' : '#FFC300',
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: item?.reserved === true ? 2 : 2,
            borderColor: item?.reserved === true ? 'red' : 'green',
          }}>
          <Text>{item?.reserved ? `RESERVED ${item?.id}` : item?.id}</Text>
          {item?.time && <Text>{item?.time && `At ${item.time}`}</Text>}
        </TouchableOpacity>
      </View>
    );
  };
  const renderRightParking = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('EachSpace', {item})}
          style={{
            width: 150,
            height: 50,
            alignSelf: 'flex-end',
            backgroundColor: item?.reserved === true ? '#808B96' : '#FFC300',
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: item?.reserved === true ? 2 : 2,
            borderColor: item?.reserved === true ? 'red' : 'green',
          }}>
          <Text>{item?.reserved ? `RESERVED ${item?.id}` : item?.id}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ABB2B9'}}>
      <View style={{padding: 10, backgroundColor: '#FFC300'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 10,
            color: '#FDFEFE',
          }}>
          Parking lot
        </Text>
        <Button
          onPress={() => navigation.navigate('EachSpace')}
          title="Allocate a vehicle"
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   alignItems: 'center',
            width: '100%',
          }}>
          <FlatList
            data={parkingLotsLeft}
            renderItem={renderLeftParking}
            extraData={parkingLotsLeft}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{width: '20%', flexDirection: 'column'}}>
            {parkingLotLine.map(() => {
              return (
                <View>
                  <View
                    style={{
                      backgroundColor: 'black',
                      //   width: '20%',
                      height: 5,
                      marginBottom: 10,
                    }}></View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      //   width: '20%',
                      height: 5,
                      marginBottom: 10,
                    }}></View>
                </View>
              );
            })}
          </View>
          <FlatList
            data={parkingLotsRight}
            renderItem={renderRightParking}
            extraData={parkingLotsRight}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View>
          <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideInLeft'}
            isVisible={isVisible}>
            <View
              style={{
                // flex: 1,
                padding: 10,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: '5%',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Hi, Welcome to Parking lot
              </Text>
              <Text style={{fontWeight: '400', fontSize: 20, marginTop: 10}}>
                How much parking spaces you want to see
              </Text>
              <TextInput
                style={{
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  width: '100%',
                  marginTop: 5,
                }}
                keyboardType={'number-pad'}
                onChangeText={txt => setParkingLotNumber(txt)}
                placeholder="Enter in numbers"
              />
              <View style={{width: '100%', marginTop: 5}}>
                <Button onPress={() => setisVisible(false)} title="Enter" />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
