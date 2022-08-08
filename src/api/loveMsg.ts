import axios from 'axios'
import { getTian } from '../utils/http'

/**
 * 给女朋友发送内容的相关接口
 */
enum LoveMsgURL {
  // 天气接口：默认获取最近7天的数据
  weather = 'http://api.tianapi.com/tianqi/index',
  // 早安心语
  sayMoring = 'http://api.tianapi.com/zaoan/index',
  // 每日一句美好英语
  dayEnglish = 'http://api.tianapi.com/everyday/index',
  // 韩寒主编的ONE一个杂志，本接口返回每日一句
  oneMagazines = 'http://api.tianapi.com/one/index',
  // 网易云热评
  netEaseCloud = 'http://api.tianapi.com/hotreview/index',
  // 获取农历信息
  lunarDate = 'http://api.tianapi.com/lunar/index',
  // 彩虹屁
  caihongpi = 'http://api.tianapi.com/caihongpi/index',
  // 一言
  oneWord = 'https://v1.hitokoto.cn/?encode=json',
  //星座
  constellation ="http://api.tianapi.com/star/index",
  //诗词
  poetry = "http://api.tianapi.com/flmj/index"
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
  async sayMoring(){
    const res = await getTian({ url: LoveMsgURL.sayMoring})
    console.log(res)
    return res?.[0].content
  }


  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // one一个杂志
  async getOneMagazines() {
    const res = await getTian<OneMagazines[]>({ url: LoveMsgURL.oneMagazines })
    return res?.[0]
  }

  // 网易云热评
  async getNetEaseCloud() {
    const res = await getTian<NetEaseCloudProps[]>({ url: LoveMsgURL.netEaseCloud })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    return res?.[0]
  }

  // 彩虹屁
  async getCaihongpi() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.caihongpi })
    return res?.[0]
  }
  //星座运势
  async getStar(){
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.constellation,params:{astro:'金牛座'} })
    return res?.[0]
  }
  //诗词
  async getPoetry(type:string){
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.poetry,params:{type,num:1} })
    console.log(res)
    return res?.[0]
  }
  // 一言
  async getOneWord(): Promise<OneWordProps | null> {
    try {
      const response = await axios(LoveMsgURL.oneWord, { timeout: 30000 })
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export default new API()
