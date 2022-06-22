import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
const EachSpace = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [registration, setRegistration] = useState('');
  const [time, setTime] = useState(moment(new Date()).format('hh:mm a'));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const parkingLotsLeft = useSelector(
    initialState => initialState.parkingLotsLeft,
  );
  const parkingLotsRight = useSelector(
    initialState => initialState.parkingLotsRight,
  );
  const route = useRoute();
  const item = route?.params?.item;
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    console.warn('A date has been picked: ', moment(date).format('hh:mm a'));
    setTime(moment(date).format('hh:mm:ss a'));
    hideDatePicker();
  };

  const Add = async () => {
    const filter = parkingLotsLeft.filter(item => {
      return item.reserved == false;
    });
    const filter2 = parkingLotsRight.filter(item => {
      return item.reserved == false;
    });
    if (filter?.length > 0) {
      let remainingParkingLots = parkingLotsLeft;
      let itemCopy = {
        ...filter[filter?.length - 1],
        reserved: true,
        time: time,
        registrationNumber: registration,
      };

      remainingParkingLots[filter?.length - 1] = itemCopy;
      dispatch({type: 'setParkingLotsLeft', payLoad: remainingParkingLots});
      navigation.goBack();
    }

    if (filter?.length == 0 && filter2.length > 0) {
      let remainingParkingRight = parkingLotsRight;
      let itemCopy2 = {
        ...filter2[filter2?.length - 1],
        reserved: true,
        time: time,
        registrationNumber: registration,
      };

      remainingParkingRight[filter2?.length - 1] = itemCopy2;
      dispatch({type: 'setParkingLotsRight', payLoad: remainingParkingRight});
      navigation.goBack();
    }
    if (filter.length === 0 && filter2.length === 0) {
      alert('THE SPACE IS FULL');
    }
    console.log('FILTER', parkingLotsLeft);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cover}>
        <Text style={styles.coverTxt}>{item?.id ? item?.id : 'Allocate'}</Text>
      </View>
      {/* <Text style={styles.txtMain}>Space Number:</Text>
      <Text
        style={[
          styles.txtMain,
          {
            bottom: 120,
          },
        ]}>
        {item?.id}
      </Text> */}
      <View style={{padding: 10}}>
        <Text style={styles.txtHeading}>Registration Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          onChangeText={setRegistration}
          keyboardType={'default'}
        />
        <Text style={styles.txtHeading}>Time</Text>
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text>{time}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        minimumDate={new Date()}
        accentColor={'#FFC300'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        onPress={() => Add()}
        disabled={registration !== '' ? false : true}
        style={[styles.addButton, {opacity: registration !== '' ? 1 : 0.2}]}>
        <Text style={{fontWeight: 'bold', color: '#FDFEFE', fontSize: 20}}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EachSpace;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cover: {
    height: '30%',
    backgroundColor: '#FFC300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMain: {
    // bottom: 100,
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FDFEFE',
  },
  coverTxt: {
    fontWeight: 'bold',
    fontSize: 80,
    color: '#FDFEFE',
  },
  txtHeading: {
    fontWeight: 'bold',
  },
  addButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFC300',
    position: 'absolute',
    bottom: 0,
  },
});
