const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//Apply middleware
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//03- Define Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// 03- Actions Creators
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

//02- Initial States
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

//02- Reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const mainReudcer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
//01-Creating Store
const store = createStore(mainReudcer, applyMiddleware(logger));
// Subscribe
console.log("Initial State ", store.getState());
const unsubscribe = store.subscribe(() => {});
//Dispatching Actions to update the store
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

//Unsubscribe to the changes
unsubscribe();
