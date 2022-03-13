

  
  const INITIAL_STATE = {
    itemList: [
      {
        title:'热门表情包',
        type:0,
        imgList:[
          {
            id:'1',
            imgUrl:1,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'2',
            imgUrl:2,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'3',
            imgUrl:3,
            type:'',
            name:'',
            emotion:''
          }
        ]
      },
      {
        title:'最新表情包',
        type:1,
        imgList:[
          {
            id:'4',
            imgUrl:4,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'5',
            imgUrl:5,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'6',
            imgUrl:6,
            type:'',
            name:'',
            emotion:''
          }
        ]
      },
      
    ],
    tapCurrent:0
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "HOMEDETAIL":
        const { data } = action.payload
        return {
          ...state,
          itemList:data
        }
      case "CHANGEHOMEDATA":
        const { tapCurrent } = action.payload
        return {
          ...state,
          tapCurrent
        }
      default:
        return state
    }
  }
  