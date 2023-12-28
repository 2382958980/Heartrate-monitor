import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { HeartRate } from '@zos/sensor'
import { Vibrator, VIBRATOR_SCENE_DURATION } from '@zos/sensor'
import { setPageBrightTime, resetPageBrightTime } from '@zos/display'

let okay=1;
Page({
  build() {
    const arc = createWidget(widget.ARC, {
      x: (466 - 400) / 2,
        y: (466 - 400) / 2,
        w: 400,
        h: 400,
      start_angle: -90,
      end_angle: 270,
      color: 0x4f4f4f,
      line_width: 20
    })
    arc.setEnable(false);
    const button1 = createWidget(widget.BUTTON, {
      x: (466 - 200) / 2,
      y: (466 - 200) / 2,
      w: 200,
      h: 200,
      radius: 100,
      normal_color: 0xbebebe,
      press_color: 0x708090,
      text: '开启检测',
      text_size: 36,
      click_func: (button_widget) => {
        if(okay==1)
        {
          okay=0;
          button_widget.setProperty(prop.MORE, {
            x: (466 - 200) / 2,
            y: (466 - 200) / 2,
            w: 200,
            h: 200,
            normal_color: 0xff7f,
            press_color: 0x8b45,
            text: '关闭检测',
          })
          const result = setPageBrightTime({
            brightTime: 90000000,
          })
          const heartRate = new HeartRate()
          
          const callback = () => {
            if(heartRate.getCurrent()<120)
            {
              arc.setProperty(prop.MORE, {
                x: (466 - 400) / 2,
                y: (466 - 400) / 2,
                w: 400,
                h: 400,
                start_angle: -90,
                end_angle: (heartRate.getCurrent()-60)*6-90,
                color: 0xff7f,
              })
            }
            else
            {
              const vibrator = new Vibrator()
                vibrator.setMode(VIBRATOR_SCENE_DURATION)
                vibrator.start()
              arc.setProperty(prop.MORE, {
                x: (466 - 400) / 2,
                y: (466 - 400) / 2,
                w: 400,
                h: 400,
                start_angle: -90,
                end_angle: 270,
                color: 0xff7f24,
              })
            }
          }
          heartRate.onCurrentChange(callback)
        }
        else
        {
          okay=1;
          const result = resetPageBrightTime()
          const heartRate = new HeartRate()
          heartRate.offCurrentChange(callback)
          button_widget.setProperty(prop.MORE, {
            x: (466 - 200) / 2,
            y: (466 - 200) / 2,
            w: 200,
            h: 200,
            normal_color: 0xbebebe,
            press_color: 0x708090,
            text: '开启检测',
          })
        }
      }
    })
  },
  onInit() {
    
  },

  onDestroy() {
    
  },
});