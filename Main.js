import { DataStore } from "./js/base/DataStore";
import { ResourceLoader } from "./js/base/ResourceLoader";
import { Background } from "./js/runtime/Background";

// 游戏开始的入口,初始化游戏的整个元素
export class Main{// 定义main类
   constructor(){// 构造函数 初始化数据 new的时候调用该方法
      console.log("游戏开始");
      // 初始化游戏过程中用到的数据
      this.canvas = wx.createCanvas(); //获取canvas
      this.ctx = this.canvas.getContext("2d"); // 获取ctx
      this.loader = new ResourceLoader(); // 创建资源加载器实例对象
      this.store = DataStore.getInstance();   // 获取变量池(单例模式)
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
      new Background().draw()
   }
}