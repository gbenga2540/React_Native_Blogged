// import React from 'react';
// import { AppRegistry } from 'react-native';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store from './src/Configs/Redux_Store/Redux_Store';
// import App from './src/App/App';

// const Root = () => {
//     return (
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistedStore}>
//                 <App />
//             </PersistGate>
//         </Provider>
//     );
// };

// AppRegistry.registerComponent(appName, () => Root);


// For testing Purposes... -> Enable the code above for Production
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/Configs/Redux_Store/Redux_Store';
import App from './src/App/App';

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => Root);
