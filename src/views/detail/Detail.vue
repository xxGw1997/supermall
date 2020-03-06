<template>
 <div id="detail">
    <detail-navbar/>
    <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo"/>
        <detail-param-info :param-info="paramInfo"/>
        <detail-comment-info :comment-info="commentInfo"/>
        <goods-list :goods="recommends"/>
    </scroll>
 </div>
</template>

<script>
 import DetailNavBar from './childComps/DetailNavBar'
 import DetailSwiper from './childComps/DetailSwiper'
 import DetailBaseInfo from './childComps/DetailBaseInfo'
 import DetailShopInfo from './childComps/DetailShopInfo'
 import DetailGoodsInfo from './childComps/DetailGoodsInfo'
 import DetailParamInfo from './childComps/DetailParamInfo'
 import DetailCommentInfo from './childComps/DetailCommentInfo'

 import Scroll from 'components/common/scroll/Scroll'
 import GoodsList from 'components/content/goods/GoodsList'

 import { getDetail , Goods , Shop , GoodsInfo , getRecomment} from 'network/detail'
 export default {
   data () {
     return {
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramsInfo:{},
         commentInfo:{},
         recommends:[]
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

           //4.保存商品的详情数据
           this.detailInfo = data.detailInfo

           //5.获取参数信息
           this.paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

           //6.获取评论信息
           if(data.rate.cRate !== 0){
               this.commentInfo = data.rate.list[0]
           }
       })

       getRecomment().then(res=>{
           this.recommends = res.data.list
       })
   },
//    mouted(){
//        this.$bus.$on('itemImgLoad',()=>{

//        })
//    },
   methods:{
       imageLoad(){
           this.$refs.scroll.refresh()
       }
   },
   components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
   }
 }
</script>

<style>
    .content{
        height: calc(100vh-44px);
    }
 
</style>
