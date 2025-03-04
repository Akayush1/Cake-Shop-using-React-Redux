//import redux from redux; use this in case pf rect application

const redux = require('redux')
const createStore = redux.createStore
const bindActionCreator =redux.bindActionCreators
const combinedReduxer = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()




const CAKE_ORDERED='cake_ordered'
const CAKE_RESTOCKED='cake_restocked'//Defines different action types as constants to avoid typos.

const ICECREAM_ORDERED='ICECREAM_ORDERED'
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED'
function orderCake()  //action creator . It is used so that we dont have to make changes in all dispatche in future 
{                        // we can directly copy the  action object in 
                           // store.dispatch({ type:CAKE_ORDERED,  //Action
                            //quantity : 1,)}
                                
    return {
    type:CAKE_ORDERED,  //Action
    payload : 1,
}


}
function restockCake(qty=1)
{
    return{
        type:CAKE_RESTOCKED,
        payload:qty,
    }

}

function orderIceCream(qty=1)
{
    return{
        type:ICECREAM_ORDERED,
        payload:qty
    }
}
function restockIceCream(qty=1)
{
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
}

// const initialState= {
//     numOfCakes :10,
//     numOfIceCream:20,  //default or initial state of application
// }
const initialCakeState= {
    numOfCakes :10,
      //default or initial state of seperate cake application
}
const initialIceCreamState= {
    numOfIceCream:20,  //default or initial state of iceCream  application
}

//(previousState,action)=>newState

const cakereducer  = (state=initialCakeState,action)=>{ //shopkeeper=reducer there can be multiple shopkeepers 
    switch(action.type){
        case CAKE_ORDERED: 
        return{
            ...state, // if we want to change only a particular property of statte
            // we make a copy of it using spread operator this way no 
            //change will occur to left over properties 
            numOfCakes: state.numOfCakes-1,
        }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes: state.numOfCakes+ action.payload,
            }
        default:
            return state
    }
}

const iceCreamreducer  = (state=initialIceCreamState,action)=>{ //shopkeeper=reducer there can be multiple shopkeepers 
    switch(action.type){
        case ICECREAM_ORDERED: 
        return{
            ...state, // if we want to change only a particular property of statte
            // we make a copy of it using spread operator this way no 
            //change will occur to left over properties 
            numOfIceCream: state.numOfIceCream-1,
        }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIceCream: state.numOfIceCream+ action.payload,
            }
        default:
            return state
    }
}


const rootReducer = combinedReduxer({
    cake:cakereducer,
    icecream:iceCreamreducer,
})
const store = createStore(rootReducer,applyMiddleware(logger)) // create store 



console.log('Initial state',store.getState())
const unsubscribe= store.subscribe(()=>{});
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
const actions = bindActionCreator({orderCake,restockCake,orderIceCream,restockIceCream},store.dispatch)
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(9)

actions.orderCake()
unsubscribe();