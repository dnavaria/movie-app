import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers";
import thunk from 'redux-thunk';

// const logger = function({dispatch, action}){
//   return function(next){
//     return function(action){
//       console.log("Action Type ::",action.type)
//       next(action)
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action !== 'function') {
    console.log("Action Type ::", action.type)
  }
  next(action)
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   if (typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action)
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk)

})

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>;
//   }
// }

// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
  
);
