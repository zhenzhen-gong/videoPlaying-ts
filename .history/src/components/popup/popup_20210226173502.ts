interface Ipopup {
    width?: string,
    height?: string,
    title?: string,
    position?: string,
    mask?: boolean, // 是否有遮罩层
    content?: () => void // 要显示的内容，可能是图片、文字或视频等，故不限制（void）
}

function popup () {
  return new Popup()
}

class   Popup {

}

export default popup;