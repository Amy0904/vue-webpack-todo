/*
 * @Author: 夏夏夏
 * @Date: 2020-04-17 10:33:07
 * @LastEditors: 夏夏夏
 * @LastEditTime: 2020-04-20 09:26:58
 * @Description: file content
 */
import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'xiamin'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>written by {this.author}</span>
      </div>
    )
  }
}