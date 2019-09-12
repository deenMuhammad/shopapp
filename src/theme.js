import { observable } from "mobx"

const theme = observable({
  setOpacity: (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  },
  palette: {
    // p: {m: '#5F5AA4', l: '#7D76D7', d: '#423E71'}, // ink
    p: {m: '#510273', l: '#6E038C', d: '#3F0259'}, // elixir
    // p: {m: '#C9463D', l: '#FF5E35', d: '#962E40'}, // sunset
    // p: {m: '#1C1F26', l: '#24262D', d: '#13171F'}, // dark    
    // p: {m: '#FF7E0D', l: '#EB6B01', d: '#FF7003'}, // orange
    // p: {m: '#495DC2', l: '#5C52BD', d: '#495DC2'}, // goluboy

    c: {b: '#252525', w: '#ffffff', g: '#575757', e: '#aa0000', s: '#00aa00', w2: 'rgba(255,255,255, 0.8)', bl: '#000000'},
  },
})

export default theme