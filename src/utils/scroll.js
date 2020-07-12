function Scroll(element) {
  this.element = element
}

Scroll.prototype.hidden = function () {
  this.element.style.overflow = 'hidden'
}
Scroll.prototype.show = function () {
  this.element.style.overflow = 'auto'
}

export default Scroll
