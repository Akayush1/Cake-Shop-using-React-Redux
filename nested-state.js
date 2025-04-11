//immer is used in case of nested state example address where we have trouble maintaing other properties using ... state

const redux =require('redux')
const produce =require('immer').produce
const initialState={
    name:'Ayush',
    address:{
        street:'Ambedkar Nagar',
        city:'Sonbhadra',
        state:'UP',
    },
}

const STREET_UPDATED = 'STREET__UPDATED' // define constant for action type

function updatestreet(street) //Action creator ps. u can also use arrow function
{
    return{
        type:STREET_UPDATED,
        payload:street,      //Action
    }

}

const reducer =(state=initialState,action)=>{
    switch(action.type) 
    {
        case STREET_UPDATED :
            // return{                    // This is very complex so we use immer
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload,

            //     },
            // }

            return produce(state,(draft)=>{     //1st arg is current state and second is a function
                                                 // with a draft copy of the state
                draft.address.street=action.payload

            })
            default : {
                return state
            }

    }
}

const store = redux.createStore(reducer)
console.log('Initial State',store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log('Updated State',store.getState());
    
})
store.dispatch(updatestreet('Robertsganj')) //dispatch on action to udate the store
unsubscribe()