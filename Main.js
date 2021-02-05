import { DataStore } from "./js/base/DataStore";
import { ResourceLoader } from "./js/base/ResourceLoader";
import { Sprite } from "./js/base/Sprite";
import { Director } from "./js/Director";
import { playbgm } from "./js/music";
import { Birds } from "./js/player/Birds";
import { Score } from "./js/player/Score";
import { StartButton } from "./js/player/StarButton";
import { Background } from "./js/runtime/Background";
import { Land } from "./js/runtime/Land";
import wxapi from './js/wxAPI';

// 游戏开始的入口,初始化游戏的整个元素
export class Main{// 定义main类
   constructor(){// 构造函数 初始化数据 new的时候调用该方法
      console.log("游戏开始");
      // 初始化游戏过程中用到的数据
      this.canvas = wx.createCanvas(); //获取canvas
      this.ctx = this.canvas.getContext("2d"); // 获取ctx
      this.loader = new ResourceLoader(); // 创建资源加载器实例对象
      this.store = DataStore.getInstance();   // 获取变量池(单例模式)
      this.director = Director.getInstance(); // 获取导演(单例模式)
      // 调用ResourceLoader的onloaded方法 确保图片全部加载完成
      this.loader.onloaded().then(map=>this.onResourceLoaded(map))
   }
   // 图片加载完成后
   onResourceLoaded(map){
      // 将游戏数据保存到变量池中 
      // 使用属性的方式保存数据 而不是调用DataStore中的put方法保存
      // 因为put方法保存的数据会在游戏结束时销毁
      // 而初始化数据在游戏结束时不能销毁
      this.store.res = map 
      this.store.canvas = this.canvas
      this.store.ctx = this.ctx
      // playbgm()
      // wxapi.getUserInfo()
      // wxapi.createUserInfoButton()
      wxapi.getTelInfo()
      // 调用初始化游戏的方法
      this.init()
   }

   // 初始化游戏数据
   init(){
      // 游戏开始
      this.director.isGameOver = false
      // 将游戏数据初始化并保持到变量池里
      // 使用DataStore的put保存,因为这些数据在游戏结束后会被销毁
      this.store
         .put('background',new Background())
         .put('land',new Land())
         .put('pipes',[])
         .put('birds',new Birds())
         .put('startButton',new StartButton())
         .put('score',new Score())
      // 先调用一次 创建水管的方法
      this.director.createPipes()
      // 调用导演的run方法来运行程序
      this.director.run()
      this.addEvent()
   }

   // 监听点击事件
   addEvent(){
      // 手机报错
      // this.canvas.addEventListener('touchstart',()=>{
      // 需要使用微信的API
      wx.onTouchStart(e => {
         let {clientX,clientY} = e.touches[0]
      if(this.director.isGameOver){
            // 游戏结束 点击重新开始
            let bg = Sprite.getImage('background')
            let land = Sprite.getImage('land')
            let btn = Sprite.getImage('startButton')
            // 重新定义开始按钮的矩形范围
            // 矩形起点的x坐标
            let startX = (this.canvas.width - btn.width)/2
            // 矩形起点的y坐标
            let startY = (this.canvas.height - land.height - btn.height)/2
            // 矩形终点x坐标
            let endX = startX + btn.width 
            let endY = startY + btn.height 
            if(
               clientX > startX &&
               clientX < endX   &&
               clientY > startY && 
               clientY < endY
            ){
               this.init()
            }else{
               // wxapi.showKeyboard()
            }
      }else{
            // 游戏进行中 点击小鸟向上飞
            this.director.birdsUp()
      }
      })
   }
}