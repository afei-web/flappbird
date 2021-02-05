
function playMusic(src='',loop=false){
   return function(){
      let audio = wx.createInnerAudioContext()
      audio.src = src
      audio.loop = loop
      // 手动播放
      // audio.play()
   }
}
export let playbgm = playMusic('audio/bgm.mp3',true)
export let boom = playMusic('audio/boom.mp3')
export let go = playMusic('audio/bullet.mp3')