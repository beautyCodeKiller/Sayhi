/**
 * @name goodMorning
 * @description 说早安
 */
import { create } from 'domain'
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
    ])

    // 过滤掉异常数据
    const [caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
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
      const moringText = await API.sayMoring() //早安
      const { festival, lunar_festival, jieqi, lmonthname } = lunarInfo
      let poetryType =''
      const festivalArr = ['春节', '元宵', '端午', '七夕', '中秋', '重阳']
      const jijie = lmonthname.substring(1) + '天'
      poetryType = festivalArr.includes(lunar_festival) ? lunar_festival.replace('节', '') : jijie
      const poetryText = await API.getPoetry(poetryType)
      const textData = {
        lunarInfo,
        ...weather,
        moringText,
        poetryText
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
  // await goodWord()

}
