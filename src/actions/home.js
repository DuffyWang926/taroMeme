  
  import api from '../services/api'
  export const getHomeDetail = (payload) => {
    return dispatch => {
      api.get('/home',).then((res) => {
        dispatch({
          type: 'HOMEDETAIL',
          payload: res
        })
      })
    }
  }

  export const changeHomeData = (payload) => {
    return {
      type: 'CHANGEHOMEDATA',
      payload
    }
  }
  
//   export const getPlayListDetail = (payload) => {
//     const { id } = payload
//     return dispatch => {
//       dispatch({
//         type: RESETPLAYLIST,
//       })
//       api.get('/playlist/detail', {
//         id
//       }).then((res) => {
//         let playListDetailInfo = res.data.playlist
//         playListDetailInfo.tracks = playListDetailInfo.tracks.map((item) => {
//           let temp: any = {}
//           temp.name = item.name
//           temp.id = item.id
//           temp.ar = item.ar
//           temp.al = item.al
//           temp.copyright = item.copyright
//           return temp
//         })
//         dispatch({
//           type: GETPLAYLISTDETAIL,
//           payload: {
//             playListDetailInfo,
//             playListDetailPrivileges: res.data.privileges
//           }
//         })
//       })
//     }
//   }