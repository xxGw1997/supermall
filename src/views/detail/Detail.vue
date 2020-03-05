<template>
 <div id="detail">
    <detail-navbar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
 </div>
</template>

<script>
 import DetailNavBar from './childComps/DetailNavBar'
 import DetailSwiper from './childComps/DetailSwiper'
 import DetailBaseInfo from './childComps/DetailBaseInfo'
 import DetailShopInfo from './childComps/DetailShopInfo'

 import { getDetail , Goods , Shop} from 'network/detail'
 export default {
   data () {
     return {
         iid:null,
         topImages:[],
         goods:{},
         shop:{}
     }
   },
   created(){
       this.iid = this.$route.params.iid

       getDetail(this.iid).then(res=>{
           const data = res.result
           this.topImages = data.itemInfo.topImages
           //2.获取商品信息
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

           //3.获取店铺信息
           this.shop = new Shop(data.shopInfo)
       })
   },
   components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
   }
 }
</script>

<style>

 
</style>
