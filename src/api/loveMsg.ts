import axios from 'axios'
import { getTian } from '../utils/http'

/**
 * 给女朋友发送内容的相关接口
 */
enum LoveMsgURL {
  // 天气接口：默认获取最近7天的数据
  weather = 'http://api.tianapi.com/tianqi/index',
  // 早安心语
  sayMorning = 'http://api.tianapi.com/zaoan/index',
  // 每日一句美好英语
  dayEnglish = 'http://api.tianapi.com/everyday/index',
  // 获取农历信息
  lunarDate = 'http://api.tianapi.com/lunar/index',
  //星座
  constellation = "http://api.tianapi.com/star/index",
  //诗词
  // poetry = "http://api.tianapi.com/flmj/index"
  poetry = "http://api.tianapi.com/verse/index",
  //古籍名句
  gjmj = "http://api.tianapi.com/gjmj/index"
}

class API {
  key: string
  constructor(key?: string) {
    this.key = key || '' // 为了方便，key在 http中统一添加
  }

  getKey() {
    return this.key
  }

  /**
   * 接口 ++++++++++
   */

  // 天气
  async getWeather(city_name: string): Promise<IWeatherResponseProps> {
    const res = await getTian({ url: LoveMsgURL.weather, params: { city: city_name } })
    return res?.[0]
  }
  //早安心语
  async sayMorning() {
    let res = await getTian({ url: LoveMsgURL.sayMorning })
    console.log(res)
    if (res?.[0].content.length > 50) {
      res = await getTian({ url: LoveMsgURL.sayMorning })
    }
    return res?.[0].content
  }


  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    return res?.[0]
  }

  //星座运势
  async getStar() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.constellation, params: { astro: '金牛座' } })
    return res
  }
  //诗词
  async getPoetry() {
    const res = await getTian({ url: LoveMsgURL.poetry })
    return res?.[0]
  }
  async getGjmj(){
    const res = await getTian({ url: LoveMsgURL.gjmj })
    return res?.[0]
  }
}

export default new API()
