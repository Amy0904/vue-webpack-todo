/*
 * @Author: 夏夏夏
 * @Date: 2020-04-17 09:44:17
 * @LastEditors: 夏夏夏
 * @LastEditTime: 2020-04-17 10:28:49
 * @Description: 优化css
 */

//  需要加前缀的属性自动处理
const autoprefixer = require('autoprefixer')
 
module.exports = {
  plugins: [                     
    autoprefixer()
  ]
}