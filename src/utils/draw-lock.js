function drawFace(ctx, radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()

  const grad = ctx.createRadialGradient(
    0,
    0,
    radius * 0.95,
    0,
    0,
    radius * 1.05
  )
  grad.addColorStop(0, '#333')
  grad.addColorStop(0.5, 'white')
  grad.addColorStop(1, '#333')
  ctx.strokeStyle = grad
  ctx.lineWidth = radius * 0.1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI)
  ctx.fillStyle = '#333'
  ctx.fill()
}

function drawNumbers(ctx, radius, isDrawRoman, isDraw24hour, meridiem) {
  const romans = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ]
  const fontBig = radius * 0.15 + 'px Arial'
  const fontSmall = radius * 0.075 + 'px Arial'
  let ang, num

  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.78)
    ctx.rotate(-ang)
    ctx.font = fontBig
    ctx.fillStyle = 'black'
    ctx.fillText(isDrawRoman ? romans[num - 1] : num.toString(), 0, 0)
    ctx.rotate(ang)
    ctx.translate(0, radius * 0.78)
    ctx.rotate(-ang)

    // Draw inner numerals for 24 hour time format
    if (isDraw24hour) {
      ctx.rotate(ang)
      ctx.translate(0, -radius * 0.6)
      ctx.rotate(-ang)
      ctx.font = fontSmall
      ctx.fillStyle = 'red'
      ctx.fillText((num + 12).toString(), 0, 0)
      ctx.rotate(ang)
      ctx.translate(0, radius * 0.6)
      ctx.rotate(-ang)
    }
  }

  // ctx.font = fontSmall
  // ctx.fillStyle = '#3D3B3D'
  // ctx.translate(0, radius * 0.3)
  // ctx.fillText(meridiem, 0, 0)
  // ctx.translate(0, -radius * 0.3)
}

function drawTicks(ctx, radius) {
  let numTicks, tickAng, tickX, tickY

  for (numTicks = 0; numTicks < 60; numTicks++) {
    tickAng = (numTicks * Math.PI) / 30
    tickX = radius * Math.sin(tickAng)
    tickY = -radius * Math.cos(tickAng)

    ctx.beginPath()
    ctx.lineWidth = radius * 0.01
    ctx.moveTo(tickX, tickY)
    if (numTicks % 5 === 0) {
      ctx.lineTo(tickX * 0.88, tickY * 0.88)
    } else {
      ctx.lineTo(tickX * 0.92, tickY * 0.92)
    }
    ctx.stroke()
  }
}

function drawHand(ctx, position, length, width, color) {
  color = color || 'black'
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.moveTo(0, 0)
  ctx.rotate(position)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-position)
}

function drawTime(ctx, radius, hour, minute, second) {

  // hour
  hour %= 12
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60)
  drawHand(ctx, hour, radius * 0.5, radius * 0.05)
  // minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60)
  drawHand(ctx, minute, radius * 0.8, radius * 0.05)
  // second
  second = (second * Math.PI) / 30
  drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red')
}

export default {
  drawTicks,
  drawFace,
  drawTime,
  drawNumbers,
  drawHand
}