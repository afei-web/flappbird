import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";

// 重新开始按钮
export class StartButton extends Sprite{
   constructor(){
      let img = Sprite.getImage('startButton')
      let canvas = DataStore.getInstance().canvas
      let buttonX = canvas.width/1.8 - img.width
      let buttonY = canvas.height/2 - img.height
      super(img,0,0,img.width,img.height,buttonX,buttonY,img.width,img.height)
   }
}