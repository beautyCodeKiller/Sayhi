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
export const createTemplate = (data: TextTemplateProps) => {
  const {
    sayMorning,
    poetry,
    gjmj
  } = data
  let description = `<div class=\"highlight\">🎈${sayMorning}</div>
    <div class=\"gray\">🌈${poetry?.content} ——— ${poetry?.author}《${poetry?.source}》</div>
    <div class=\"gray\">🔖${gjmj?.content} ——— ${gjmj?.source}</div>`
  const title = '伍春婷同学早上好呀😘😘'
  const url = 'https://www.yxgapp.com/'
  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      url,
      btntxt: `学无止境`,
    },
  }
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
    star,
    english,
  } = data

  // 今日、恋爱天数
  const today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(CONFIG.start_stamp, 'day')

  // 拼接内容
  let description = `<div class=\"gray\">${area} | ${today} | ${week}</div>`
  let emoj = ''
  const flag = weather.includes('转') ? weather.split('转')[0] : weather
  if (flag.includes('雨')) {
    emoj = '🌧'
  } else if (flag.includes('多云')) {
    emoj = '⛅️'
  } else if (flag.includes('晴')){
    emoj = '🌞'
  }

    description += `今日天气状况：${emoj}${weather}    温度：🌡${lowest} ~ ${highest}\n`
  if (CONFIG.date_lunarInfo && lunarInfo) {
    const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
    // 公历节日、农历节日和二十四节气
    const festival_info = festival ? `| ${festival}` : ''
    const lunar_festival_info = lunar_festival ? ` ${lunar_festival}` : ''
    const jieqi_info = jieqi ? `| ${jieqi}` : ''

    description += `节日： 📅${festival_info}${lunar_festival_info} ${jieqi_info}\n`
  }
  if (weather.includes('雨')) {
    description += `降雨概率：${pop}%  降雨量：${pcpn}mm`
  }
  description += `<div class=\"gray\">♉金牛座今日运势：</div>`
  star.length > 0 && star.forEach((item: any, index: any) => {
    if (index < 3) {
      description += `🌈${item.type}：${item.content}\n`
    }
  });
  description += `🔖${english.content}\n${english.note}\n`



  description += `
   今日新闻📩  ❤️ 🧡 💛 💚 💖`

  const title = `今天是我们相识的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      url: `${CONFIG.card_url}`, // 60s看世界
      btntxt: `By${CONFIG.boy_name}`,
    },
  }
}
