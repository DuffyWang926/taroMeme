import { Component } from 'react'
import { View, TabBar, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
  changeHomeData

} from "../../actions/home";

// import { AtTabBar } from "taro-ui";
import SearchCom from "../../components/SearchCom";
import HomeItem from "../../components/HomeItem";
import TapCom from "../../components/TapCom";

const homeImg = require("../../assets/thanks.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { itemList, tapCurrent } = home
    return {
      itemList,
      tapCurrent
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    getHomeDetail:(payload)=>{
      dispatch(getHomeDetail(payload));
    },
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    }
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  
  onLoad(){
    this.props.getHomeDetail()
  }
  changeTab= ()=>{
    this.props.changeHomeData({ tapCurrent:1})
  }


  

  render () {
    const { itemList } = this.props
    const itemListView = itemList.length > 0 && itemList.map( (v,i) =>{
      v.url = '/pages/productList/index?type='+v.type
      let res = (
        <HomeItem key={v.type} props={v}></HomeItem>
      )
      return res
    })
    const searchProps ={
      url:'/pages/search/index',
      changeTab:this.changeTab
    }
    
    return (
      <View className='home'>
        <Swiper
          className='homeSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay>
          <SwiperItem key='SwiperItem1'>
            <Image src={homeImg} className='homeImg' ></Image>
          </SwiperItem>
          <SwiperItem key='SwiperItem2'>
            <Image src={homeImg} className='homeImg' ></Image>
          </SwiperItem>
        </Swiper>
        <View className='homeSearch'>
          <SearchCom props={searchProps}></SearchCom>
        </View>
        <View className='homeList'>
          { itemListView }
        </View>
        <TapCom ></TapCom>
      </View>
    )
  }
}
