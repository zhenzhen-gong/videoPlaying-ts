import { clearInterval } from "timers";

let styles = require('./video.css').default // 引入组件css文件

interface Ivideo {
    url: string,
    elem: string | HTMLElement,
    width?: string,
    height?: string,
    autoplay?: boolean
}

interface Icomponent { // 组件方法的接口
    tempContainer: HTMLElement, //模板容器
    init: () => void, // 初始化组件
    template: () => void, // 创建模板
    handle: () => void // 事件
}

function video ( options: Ivideo) {
    return new Video (options)
}

class Video implements Icomponent {
    tempContainer;
    constructor( private settings : Ivideo) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            autoplay: false
        }, this.settings)
        this.init()
    }

    init() {
      this.template()
      this.handle()
    }

    template() {
      this.tempContainer = document.createElement('div')
      this.tempContainer.className = styles.video
      this.tempContainer.style.width = this.settings.width
      this.tempContainer.style.height = this.settings.height
      this.tempContainer.innerHTML = `
        <video class="${styles['video-content']}" src="${this.settings.url}"></video>
        <div class="${styles['video-controls']}">
          <div class="${styles['video-progress']}">
            <div class="${styles['video-progress-now']}"></div>
            <div class="${styles['video-progress-suc']}"></div>
            <div class="${styles['video-progress-bar']}"></div>
          </div>
          <div class="${styles['video-play']}">
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="${styles['video-time']}">
             <span>00:00</span> / <span>00:00</span>
          </div>
          <div class="${styles['video-full']}">
            <i class="iconfont icon-quanping1"></i>
          </div>
          <div class="${styles['video-volume']}">
            <i class="iconfont icon-yinliang"></i>
            <div class="${styles['video-volprogress']}">
              <div class="${styles['video-volprogress-now']}"></div>
              <div class="${styles['video-volprogress-bar']}"></div>
          </div>
          </div>
        </div>
      `
      if ( typeof this.settings.elem === 'object') {
          // 如果检测出elem为HTMLElement则直接添加
          this.settings.elem.appendChild(this.tempContainer)
      }
      else {
         // 否则需要通过document.querySelector去转换
          document.querySelector(`${this.settings.elem}`).appendChild(this.tempContainer)
      }
    }

    handle() {
      let videoContent: HTMLVideoElement = this.tempContainer.querySelector(`.${styles['video-content']}`)
      let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`)
      let videoPlay = this.tempContainer.querySelector(`.${styles['video-play']} i`)
      let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`)
      let timer;
      let videoFull = this.tempContainer.querySelector(`.${styles['video-full']} i`)
      let videoProgress = this.tempContainer.querySelectorAll(`.${styles['video-progress']} div`)
      let videovolprogress = this.tempContainer.querySelectorAll(`.${styles['video-volprogress']} div`)

      videoContent.volume = 0.5 // 音量默认为0.5，范围是0-1

      if (this.settings.autoplay) {
        // 如果autoplay为true，则执行视频播放及播放中的事件
        timer = setInterval(playing, 1000)
        videoContent.play()
      }

      // 鼠标进入时显示控制条
      this.tempContainer.addEventListener('mouseenter', () => {
        videoControls.style.bottom = 0;
      })
      // 鼠标离开时隐藏控制条
      this.tempContainer.addEventListener('mouseleave', () => {
        videoControls.style.bottom = '-54px';
      })
      // 视频是否加载完成
      videoContent.addEventListener('canplay', () => {
         videoTimes[1].innerHTML = formatTime(videoContent.duration)
      })

      // 视频播放事件
      videoContent.addEventListener('play', () => {
        // 如果是播放状态，就将图标换成暂停图标
        videoPlay.className = 'iconfont icon-zantingtingzhi'
        timer = setInterval(playing, 1000)
      })

      // 视频暂停事件
      videoContent.addEventListener('pause', () => {
        // 如果是暂停状态，就将图标换成播放图标
        videoPlay.className = 'iconfont icon-bofang'
        window.clearInterval(timer)  // 如果不加window会报timeout.close is not a function错，是因为vscode会在你使用clearTimeou的时候，自动import {clearTimeout} from timers。导致clearTimeout找不到
      })

      videoPlay.addEventListener('click', () => {
        if (videoContent.paused) {
          videoContent.play()
        }
        else {
          videoContent.pause()
        }
      })
    
      // 全屏
      videoFull.addEventListener('click', () => {
        videoContent.requestFullscreen()
      })
      
      // 播放进度拖动
      videoProgress[2].addEventListener('mousedown', function(ev:MouseEvent) {
        let downX = ev.pageX  // 记录按下时的坐标
        let downL = this.offsetLeft // 记录按下的到当前有定位的节点的距离（this指向事件定义时的环境 即videoProgress[2]）
        document.onmousemove = (ev:MouseEvent) => {
          let scale = (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth // 最终位置与父级元素宽度的比率
          // 限制不可拖出区域
          if (scale < 0) {
            scale = 0
          }
          else if (scale > 1) {
            scale = 1
          }
          videoProgress[0].style.width = scale * 100 + '%'
          videoProgress[1].style.width = scale * 100 + '%'
          this.style.left = scale * 100 + '%' // 相当于videoProgress[2].style.left = scale * 100 + '%'
          videoContent.currentTime = scale * videoContent.duration
        }
        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null
        } // 鼠标事件结束后，清空事件
        ev.preventDefault() // 阻止默认行为
      })
      
      // 音量拖动
      videovolprogress[1].addEventListener('mousedown', function(ev:MouseEvent) {
        let downX = ev.pageX  // 记录按下时的坐标
        let downL = this.offsetLeft // 记录按下的到当前有定位的节点的距离（this指向事件定义时的环境 即videoProgress[2]）
        document.onmousemove = (ev:MouseEvent) => {
          let scale = (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth // 最终位置与父级元素宽度的比率
          // 限制不可拖出区域
          if (scale < 0) {
            scale = 0
          }
          else if (scale > 1) {
            scale = 1
          }
          videovolprogress[0].style.width = scale * 100 + '%'
          this.style.left = scale * 100 + '%' // videovolprogress[2].style.left = scale * 100 + '%'
          videoContent.volume = scale
        }
        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null
        } // 鼠标事件结束后，清空事件
        ev.preventDefault() // 阻止默认行为
      })

      // 播放中
      function playing() {
        // 播放进度的比率
        let scale = videoContent.currentTime / videoContent.duration
        // 缓存进度的比率
        let scaleSuc = videoContent.buffered.end(0) / videoContent.duration
        videoTimes[0].innerHTML = formatTime(videoContent.currentTime)
        videoProgress[0].style.width = scale * 100 + '%'
        videoProgress[1].style.width = scaleSuc * 100 + '%'
        videoProgress[2].style.left = scale * 100 + '%'
      }
      
      // 时长格式转换
      function formatTime( num: number):string {
         num = Math.round(num)
         let min = Math.floor(num/60) // 分钟取整
         let sec = num%60 // 秒数取余数
         return setZero(min) + ':' + setZero(sec)
      }
      // 时间格式加零
      function setZero(num: number):string{
         if (num < 10) {
           return '0' + num
         }
         else {
           return '' + num
         }
      }
    }
}

export default video