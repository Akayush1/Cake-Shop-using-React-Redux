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

const STREET_UPDATED = 'STREET__UPDATED'

function updatestreet(street) //Action creator
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
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload,

            //     },
            // }

            return produce(state,(draft)=>{
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