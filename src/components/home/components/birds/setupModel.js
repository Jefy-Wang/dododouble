import { AnimationMixer } from 'three'

export function setupModel(data) {
  const model = data.scene.children[0] // 网格对象
  const clip = data.animations[0]

  const mixer = new AnimationMixer(model) // 混合器：将静态对象转换为动画对象
  const action = mixer.clipAction(clip)
  action.play()

  model.tick = (delta) => mixer.update(delta)

  return model
}

/** 动画系统使用关键帧来定义动画
 * 动画系统由许多组件组成，这些组件协同工作以创建动画、将它们附加到场景中的对象并控制它们
 *
 * 我们将动画系统分为两类：【动画创建】和【动画播放与控制】
 * */

/** 创建动画，涉及三个元素：关键帧、KeyframeTrack、AnimationClip */

/** 关键帧：动画系统中最底层的概念级别就是 关键帧
 *
 * 每个关键帧都由三部分信息组成：
 * ① 时间 time
 * ② 属性 property
 * ③ 值 value
 *
 * 这三个关键帧分别描述了某个属性在特定时间的值！但是关键帧没有指定任何特定的对象！
 */
