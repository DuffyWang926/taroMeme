import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Ad, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  postProduct,
} from "../../actions/product";
import {
  postProductList,
} from "../../actions/productList";
import ImageCom from "../../components/ImageCom";
import NoDataCom from "../../components/NoDataCom";
const homeImg = require("../../assets/thanks.jpg")
let videoAd = null
if(tt?.createRewardedVideoAd){
  videoAd = tt.createRewardedVideoAd({adUnitId:'oogv2ylu86pnlcqjdm'});
}

const mapStateToProps = (state)=>{
  const { product, productList } = state
  const { productListData } = productList
  const { productData } = product
    return {
      productData,
      productListData
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postProduct:(payload)=>{
      dispatch(postProduct(payload));
    },
    postProductList:(payload)=>{
      dispatch(postProductList(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      adFlag:true,
    }

    
  }

  componentDidMount(){
    const { id } = getCurrentInstance()?.router?.params || {};
    this.props.postProduct({
      id
    })
    this.props.postProductList({
      type:0,
      size:3
    })
    //加载tt广告
    if(videoAd){
      videoAd.onError((err) => {
        tt.hideLoading();
        switch (err.errCode) {
          case 1004:
            // 无合适的广告
            break;
          default:
          // 更多请参考错误码文档
        }
      });
  
      // 监听视频播放完成
      videoAd.onClose((data) => {
        tt.hideLoading();
        if (data.isEnded) {
          this.onImgClick()
          console.log("观看了", data.count, "个视频");
        } else {
          console.log("未观看完视频");
        }
      });
  
      // 预加载资源
      videoAd.load();

    }
  }

  onImgClick = () =>{
    const { imgUrl } = this.props.productData
    Taro.showLoading({
      title: '保存图片……',
    })
    Taro.getSetting({
      success (res) {
        const { authSetting } = res
        const { errMsg } = res
        const msgFlag = errMsg.includes('ok')
        if(authSetting["scope.writePhotosAlbum"] || authSetting["scope.userInfo"] || msgFlag ){
          if(authSetting["scope.album"] !== false){
            Taro.downloadFile({
              url:imgUrl,
              success (res) {
                if (res.statusCode === 200) {
                  const { tempFilePath } = res
                  Taro.saveImageToPhotosAlbum({
                    filePath:tempFilePath,
                    success(){
                      console.log(res,'saveImageToPhotosAlbum')
                      Taro.hideLoading()
                      Taro.showToast({
                        title:'保存成功'
                      })
                      
                    },
                    fail(){
                      Taro.hideLoading()
                      Taro.showToast({
                        title:'保存失败，请重试'
                      })
                    },
              
                  })
                }
              },
              fail(){
                Taro.showToast({
                  title:'保存失败，请重试'
                })
              },
              complete(){
                Taro.hideLoading()
              }
            })

          }else{
            Taro.openSetting({
              success(res){
                const { authSetting } = res
                if(!authSetting["scope.writePhotosAlbum"]){
                  Taro.showToast({
                    title:'提示',
                    content:'获取权限成功，请再次点击图片即可保存'
                  })
  
                }else{
                  Taro.showToast({
                    title:'提示',
                    content:'获取权限失败'
                  })
  
                }
                
              }
            })

          }
          
          

        }else{
          Taro.openSetting({
            success(res){
              const { authSetting } = res
              if(!authSetting["scope.writePhotosAlbum"]){
                Taro.showToast({
                  title:'提示',
                  content:'获取权限成功，请再次点击图片即可保存'
                })

              }else{
                Taro.showToast({
                  title:'提示',
                  content:'获取权限失败'
                })

              }
              
            }
          })
          
        }
      },
      
    })
    
    
  }

  adlLoadHandler = () =>{
    console.log("广告加载成功");
  }

  adErrorHandler = () =>{
    console.log("广告加载失败", e);
    tt.showToast({
      title: "广告加载失败" + e.errMsg,
      icon: "fail",
    });
    this.setState({
      adFlag:false,
    })
  }

  adCloseHandler = () =>{
    console.log("广告关闭");
    debugger
    this.setState({
      adFlag:false,
    })
    
  }

  onAdClick = () =>{
    let that = this
    Taro.getSetting({
      success (res) {
        const { authSetting } = res
        const { errMsg } = res
        const msgFlag = errMsg.includes('ok')
        if(authSetting["scope.writePhotosAlbum"] || authSetting["scope.userInfo"] || msgFlag ){
          if(authSetting["scope.album"] !== false){
            if(videoAd){
              tt.showLoading();
              videoAd.show()
            }else{
              that.onImgClick()
            }
          }else{
            Taro.openSetting({
              success(res){
                const { authSetting } = res
                if(!authSetting["scope.writePhotosAlbum"]){
                  Taro.showToast({
                    title:'提示',
                    content:'获取权限成功，请再次点击图片即可保存'
                  })
  
                }else{
                  Taro.showToast({
                    title:'提示',
                    content:'获取权限失败'
                  })
  
                }
                
              }
            })

          }
        }else{
          Taro.openSetting({
            success(res){
              const { authSetting } = res
              if(!authSetting["scope.writePhotosAlbum"]){
                Taro.showToast({
                  title:'提示',
                  content:'获取权限成功，请再次点击图片即可保存'
                })

              }else{
                Taro.showToast({
                  title:'提示',
                  content:'获取权限失败'
                })

              }
              
            }
          })
          
        }
      },
      
    })
    
    // this.setState({
    //   adFlag:true,
    // })
  }

  

  

  render () {
    const { adFlag } = this.state
    const { imgUrl } = this.props.productData
    const { productListData } = this.props
    let itemListView = productListData.length > 0 && productListData.map( (v,i) =>{
      let res = (
        <ImageCom key={v.imgUrl} className='searchImg' props={v}></ImageCom>
      )
      return res
    })
   
    
    return (
      <View className='product'>
        <View className='productTop'>
          <Image
            className='productImg'
            src={imgUrl}
            onClick = { () => {this.onImgClick()}}
          ></Image>
          {/* <View className='productTip' onClick = {this.onAdClick} >
            点击图片即可下载
          </View> */}
          <View className='productAd' onClick = {this.onAdClick} >
            看广告下载表情包
          </View>
        </View>
        {/* {
          adFlag && 
          <View className='adView'>
            <ad
              className='adView'
              unit-id="oogv2ylu86pnlcqjdm"
              bindload={this.adlLoadHandler}
              binderror={this.adErrorHandler}
              bindclose={this.adCloseHandler}
              type="video"
              scale="110"
            ></ad>
          </View>
        } */}
        
        {/* <View className='productList'>
          { productListData.length > 0 ? itemListView : <NoDataCom/> }
        </View> */}
      </View>
    )
  }
}
