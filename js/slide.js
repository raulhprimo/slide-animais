export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper)
        this.distance = {
            finalPosition: 0,
            startX: 0,
            movement: 0
        }
    }

    moveSlide(distanceX) {
        this.distance.movePosition = distanceX
        this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`
    }

    updatePosition(clientX) {
        this.distance.movement = (this.distance.startX - clientX) * 1.6
        return this.distance.finalPosition - this.distance.movement
    }

    onStart(event) {
        event.preventDefault()
        this.distance.startX = event.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove)
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX)
        this.moveSlide(finalPosition)
    }

    onEnd() {
        this.wrapper.removeEventListener('mousemove', this.onMove)
        this.distance.finalPosition = this.distance.movePosition
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart)
        this.wrapper.addEventListener('mouseup', this.onEnd)
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this)
        this.onMove = this.onMove.bind(this)
        this.onEnd = this.onEnd.bind(this)
    }

    slidePosition(slide) {
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2
        return -(slide.offsetLeft - margin)
    }

    //Slides Config

    slidesConfig() {
        this.slideArray = [...this.slide.children].map((element) => {
            const position = this.slidePosition(element)
            return { position, element }
        })
    }

    slidesIndexNav(index) {
        const last = this.slideArray.length - 1;
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1
        }
    }

    changeSlide(index) {
        const activeSlide = this.slideArray[index]
        this.moveSlide(activeSlide.position)
        this.slidesIndexNav(index)
        this.distance.finalPosition = activeSlide.position
    }


    init() {
        this.bindEvents()
        this.addSlideEvents()
        this.slidesConfig()
        return this
    }
}