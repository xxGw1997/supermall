<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
   <tab-control :class="tab-control" 
                :title="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl"
                 class="tab-control" v-show="isTabFixed"/>
   <scroll class="content" ref="scroll"
           :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :class="tab-control" 
                 :title="['流行','新款','精选']" @tabClick="tabClick"
                  ref="tabControl"/>
    <good-list :goods="showGoods"/>
   </scroll>
   <back-top @click.native="backTop" v-show="isShowBackTop"/>
 </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata,getHomeGoods } from "network/home"
  import {debounce} from 'common/utils'
 export default {
   data () {
     return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImgListener:null
     }
   },
   components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
   },
   computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   created(){
     this.getHomeMultidata()

     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
   },
   mounted(){
     //监听item图片加载完成
     const refresh = debounce(this.$refs.scroll.refresh(),100)
     this.itemImgListener = ()=>{
       refresh()
     }
     this.$bus.$on('itemImageLoad',itemImgListener)

   },
   activated(){
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
   },
   deactivated(){
     //1.保存离开前节点
     this.saveY = this.$refs.scroll.getY()
     //2.取消全局事件监听
     this.$bus.$off('itemImgLoad',itemImgListener)
   },
   methods:{
     /**
      * 事件监听
      */
     tabClick(index){
       switch (index){
         case 0:
          this.currentType = 'pop'
          break
         case 1:
          this.currentType = 'new'
          break
         case 2:
          this.currentType = 'sell'
          break
         default:
          this.currentType = 'pop'
          break
       }
       this.$refs.tabControl.currentType = index
     },
     backTop(){
       this.$refs.scroll.scrollTo(0,0)
     },
     contentScroll(position){
       //1.判断BackTop是否显示
       this.isShowBackTop = -(position.y) > 1000

       //2.判断tabControl是否吸顶
       this.isTabFixed = (-position.y) > this.tabOffsetTop
     },
     loadMore(){
       this.getHomeGoods(this.currentType)
     },
     swiperImageLoad(){
       this.offsetTop = this.$refs.TabControl.$el.offsetTop
     },

     /**
      * 网络请求
      */
     getHomeMultidata(){
       getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommends.list
      })
     },
     getHomeGoods(type){
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res=>{
         this.goods[type].list.push(...(res.data.list))
         this.goods[type].page+=1
         this.$refs.scroll.finishPullUp()
      })
     },

   }
 }
</script>

<style>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color:var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 9; */
  }

  .tab-control{ 
    position: sticky;
    top:44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }
 
</style>
