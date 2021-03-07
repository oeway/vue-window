import { SinglePointerEvent } from './SinglePointerEvent';

export type Options = {
  onMove?: () => void,
  onMoveStart?: () => void,
  onMoveEnd?: () => void,
}

export class DraggableHelper {
  private unbindDown: () => void
  private unbindMove?: () => void
  private unbindUp?: () => void
  private unbindLeave?: () => void

  constructor(readonly handle: HTMLElement, readonly container: HTMLElement, readonly options: Options = {}) {
    this.unbindDown = SinglePointerEvent.bindDown(handle, this.mousedown)
    handle.classList.add('draggable-handle')
  }

  teardown() {
    this.handle.classList.remove('draggable-handle')
    this.unbindDown()
    this.unbindUp && this.unbindUp()
    this.unbindMove && this.unbindMove()
  }

  private offsetX!: number
  private offsetY!: number

  private mousedown = (e: SinglePointerEvent) => {
    e.preventDefault()
    const { left, top } = this.handle.getBoundingClientRect()
    this.offsetX = e.clientX - left
    this.offsetY = e.clientY - top
    this.options.onMoveStart && this.options.onMoveStart()
    this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove)
    this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup)
    this.unbindLeave = SinglePointerEvent.bindUp(document, this.mouseleave)
  }

  private mousemove = (e: SinglePointerEvent) => {
    this.container.style.left = `${e.clientX - this.offsetX}px`
    this.container.style.top = `${e.clientY - this.offsetY}px`
    this.options.onMove && this.options.onMove()
    this.container.style.pointerEvents = 'none'
  }

  private mouseup = (e: SinglePointerEvent) => {
    this.options.onMoveEnd && this.options.onMoveEnd()
    this.unbindUp!()
    this.unbindMove!()
    this.unbindLeave!()
    this.unbindUp = this.unbindMove = this.unbindLeave = undefined
    this.container.style.pointerEvents = 'all'
  }

  private mouseleave = (e: SinglePointerEvent) => {
    this.mouseup(e)
  }
}