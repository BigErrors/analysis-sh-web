class Base {
  constructor () {
    this.option = {}
  }
}

class Line extends Base {
  title (title) {
    this.option.title = title
    return this
  }
  subTitle (subtitle) {
    this.option.subtitle = subtitle
    return this
  }
}

let line = new Line()
line.title('测试标题').subTitle('测试副标题')
