const hiddenScroll = element => {
  element.style.overflow = 'hidden'
}
const showScroll = element => {
  element.style.overflow = 'auto'
}

export function useScroll(element) {
  return {
    hidden: () => hiddenScroll(element),
    show: () => showScroll(element),
  }
}
