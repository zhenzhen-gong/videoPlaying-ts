interface Ipopup {
    width?: string,
    height?: string,
    title?: string,
    position?: string,
    mask?: boolean, // 是否有遮罩层
    content?: () => void // 要显示的内容，可能是图片、文字或视频等，故不限制（void）
}

function popup (options: Ipopup) {
  return new Popup(options)
}

class Popup {
  constructor ( private settings: Ipopup) {
     this.settings = Object.assign({
       width: '100%',
       height: '100%',
       title: '',
       position: 'center',
       mask: true,
       content: function() {}
     }, this.settings)
  }
}

export default popup;