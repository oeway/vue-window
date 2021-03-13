<template>
  <transition name="fade" @after-leave="$emit('close')" @after-enter="$emit('open')">
    <div v-show="isOpen" class="window" :style="styleWindow" ref="window" @mousedown="activate" @touchstart="activate">
      <div class="titlebar" @dblclick="maximized?normalSize():maximizeSize()" style="cursor: default;" :style="styleTitlebar" ref="titlebar" @click="activate">
        <div class="title" style="text-align:center">
          <div style="position: absolute; left:0" v-if="!minimized">
            <template v-if="controlButtons">
                <my-button v-for="btn in controlButtons" :key="btn.label" @click="btn.callback()">{{btn.label}}</my-button>
            </template>
            <template v-if="closeButton">
                <my-button @click="closeButtonClick">&times;</my-button>
            </template>
            <template v-if="maximizeButton">
                <my-button @click="minimizeSize">&minus;</my-button>
            </template>
            <template v-if="maximizeButton && maximized">
                <my-button @click="normalSize">&equals;</my-button>
            </template>
            <template v-if="maximizeButton && !maximized">
                <my-button @click="maximizeSize">&plus;</my-button>
            </template>
          </div>
          <template v-if="$slots.title">
            <slot name="title" />
          </template>
          <template v-else>{{title}}</template>
        </div>
      </div>
      <div v-show="!minimized" class="content" :style="styleContent" ref="content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { WindowType } from "./script"
export default WindowType
</script>

<style lang="scss" scoped>
.window {
  display: flex;
  flex-flow: column;
  position: absolute;
  border-radius: 4pt 4pt 0 0;
  max-width: 100%;
}

.titlebar {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 4pt 4pt 0 0;
  font-family: sans-serif;
  padding: 0.5em;
  flex: 0 0 auto;
}

.title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  flex-grow: 1;
  padding: 0.5em;
}

.draggable-handle {
  cursor: move;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.05s;
}
</style>
