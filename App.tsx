import React from 'react';
import Main from './Src/Screen/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EachSpace from './Src/Screen/EachSpace';
const Stack = createNativeStackNavigator();
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './Src/Redux/Reducers';
const store = createStore(Reducer);
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Main}
          />
          <Stack.Screen options={{}} name="EachSpace" component={EachSpace} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
