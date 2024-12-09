import GUI from 'lil-gui'
import './index.css'

// 创建调试用的图形界面
export function createLilGui(camera, el) {
  const gui = new GUI({
    container: el
  })

  const layers = {
    'Toggle Name': () => {
      camera.layers.toggle(0)
    },
    'Toggle Mass': () => {
      camera.layers.toggle(1)
    },
    'Enable All': () => {
      camera.layers.enableAll()
    },
    'Disable All': () => {
      camera.layers.disableAll()
    }
  }

  gui.title('Camera Layers')

  gui.add(layers, 'Toggle Name')
  gui.add(layers, 'Toggle Mass')
  gui.add(layers, 'Enable All')
  gui.add(layers, 'Disable All')

  gui.open()

  return gui
}
