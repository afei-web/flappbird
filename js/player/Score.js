// 得分 

import { DataStore } from "../base/DataStore";

// 得分不是图片 不需要继承Sprite
export class Score{
   constructor(){
      this.scoreNum = 0; //计分器
      this.dataStore = DataStore.getInstance()
      this.ctx = this.dataStore.ctx;
      this.canAdd = true // 是否可以加分
   }
   // 画分数
   draw(){
      this.ctx.font = "25px 微软雅黑"
      this.ctx.fillStyle = 'lightgreen'
      this.ctx.fillText(
         this.scoreNum, 
         this.dataStore.canvas.width/2 - 25, // 水平距离
         this.dataStore.canvas.height/9  // 垂直距离
      )
   }
}