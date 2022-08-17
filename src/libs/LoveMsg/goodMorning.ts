/**
 * @name goodMorning
 * @description 说早安
 */
import { create } from 'domain'
import { type } from 'os'
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
// import { textTemplate } from './templates/text'
import { textCardTemplate ,createTemplate} from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.sayMorning(),
      API.getPoetry(),
      API.getGjmj()
    ])

    // 过滤掉异常数据
    const [sayMorning,poetry,gjmj] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayMorning,
      poetry,
      gjmj
    }

    const template = createTemplate(data)
    console.log('goodWord', template)

    await wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const star =await API.getStar() //早安
      const english = await API.getDayEnglish()
      const textData = {
        lunarInfo,
        ...weather,
        star,
        english,
      }
      const template = textCardTemplate(textData)
      console.log('weatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}


// goodMorning
export const goodMorning = async () => {
  await weatherInfo()
  await goodWord()

}
