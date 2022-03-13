import { View, Image } from "@tarojs/components";
import "./index.scss";
const noDataImg = require("../../assets/nodata.jpg")


const NoDataCom = () => {

  return (
    <View className="noDataCom" >
      <Image
       src={noDataImg}
       className="imageComImg"
      ></Image>
    </View>
  );
};

export default NoDataCom
