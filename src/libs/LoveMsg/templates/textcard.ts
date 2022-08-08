/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

import dayjs from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg
export const createTemplate = async (data: TextCardTemplateProps)=>{
  const {} = data

}
export const textCardTemplate = (data: TextCardTemplateProps) => {
  const {
    area,
    date,
    weather,
    highest,
    lowest,
    week,
    pop,
    pcpn,
    lunarInfo,
    moringText,
    poetryText
  } = data

  // 今日、恋爱天数
  const today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(CONFIG.start_stamp, 'day')

  // 拼接内容
  let description = `${area} | ${today} | ${week}\n `

  if (CONFIG.date_lunarInfo && lunarInfo) {
    const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
    // 公历节日、农历节日和二十四节气
    const festival_info = festival ? `| ${festival}` : ''
    const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
    const jieqi_info = jieqi ? `| ${jieqi}` : ''
    
    description += ` ${festival_info}${lunar_festival_info} ${jieqi_info}`
  }
  description+=`${moringText}\n`
  description+=`${poetryText.content} | ${poetryText.source}`

  description += `\n今日天气状况：
天气：${weather}
温度：${lowest} ~ ${highest}\n`

  if (weather.includes('雨')) {
    description += `降雨概率：${pop}%
降雨量：${pcpn}mm\n`
  }

  description += `
  [ 点我有惊喜 ] ❤️ 🧡 💛 💚 💖`

  const title = `今天是我们相识的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: `${CONFIG.card_url}`, // 60s看世界
      btntxt: `By${CONFIG.boy_name}`,
    },
  }
}
