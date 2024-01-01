<template>
  <div id="app">
    <router-view />
    <footer>Inspired by Mintscan. Not affiliated with L2Beat.</footer>
  </div>
</template>

<script setup lang="ts">
import '@fontsource/ibm-plex-mono';
</script>

<style>
:root {
  --font-sans: -apple-system, 'BlinkMacSystemFont', avenir next, avenir,
    segoe ui, helvetica neue, helvetica, 'Ubuntu', roboto, noto, arial,
    sans-serif;
  --font-serif: 'Iowan Old Style', 'Apple Garamond', 'Baskerville',
    'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro', serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono: 'IBM Plex Mono', 'Menlo', 'Consolas', 'Monaco', 'Liberation Mono',
    'Lucida Console', monospace;
}

#app {
  display: flex;
  flex-direction: column;
}

body {
  font-family: var(--font-mono);
  background: #0e0e0e;
  color: #9d9d9d;
}

footer {
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
</style>
