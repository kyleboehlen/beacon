<script lang="ts" setup></script>
<template>
  <div class="stars stars1 stars2">
    <slot />
  </div>
</template>

<style scoped>
.stars {
  background: linear-gradient(to bottom, #000000, #0a0a0f, #050510);
  overflow: hidden;
}

.stars1:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: white;
  box-shadow:
    20vw 20vh 0 #fff,
    30vw 5vh 0 #fff,
    50vw 15vh 0 #fff,
    60vw 35vh 0 #fff,
    80vw 28vh 0 #fff,
    90vw 18vh 0 #fff,
    15vw 40vh 0 #fff,
    35vw 60vh 0 #fff,
    45vw 70vh 0 #fff,
    65vw 55vh 0 #fff,
    75vw 65vh 0 #fff,
    95vw 85vh 0 #fff,
    5vw 80vh 0 #fff;
  animation:
    twinkle1 3.5s infinite alternate,
    twinkle3 5s infinite alternate;
}

.stars2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: white;
  box-shadow:
    10vw 10vh 0 #fff,
    40vw 25vh 0 #fff,
    70vw 8vh 0 #fff,
    25vw 50vh 0 #fff,
    55vw 45vh 0 #fff,
    85vw 75vh 0 #fff,
    25vw 90vh 0 #fff;
  animation: twinkle2 2.9s infinite alternate-reverse;
}

.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 100%;
  box-shadow:
    8vw 19vh 0 #fff,
    21vw 6vh 0 #fff,
    34vw 29vh 0 #fff,
    42vw 13vh 0 #fff,
    54vw 35vh 0 #fff,
    66vw 21vh 0 #fff,
    73vw 8vh 0 #fff,
    85vw 27vh 0 #fff,
    92vw 16vh 0 #fff,
    6vw 45vh 0 #fff,
    17vw 56vh 0 #fff,
    28vw 63vh 0 #fff,
    36vw 71vh 0 #fff,
    47vw 49vh 0 #fff,
    58vw 77vh 0 #fff,
    69vw 54vh 0 #fff,
    77vw 69vh 0 #fff,
    88vw 62vh 0 #fff,
    95vw 74vh 0 #fff,
    4vw 82vh 0 #fff,
    15vw 88vh 0 #fff,
    27vw 96vh 0 #fff,
    38vw 84vh 0 #fff,
    51vw 92vh 0 #fff,
    62vw 86vh 0 #fff,
    74vw 94vh 0 #fff,
    83vw 81vh 0 #fff,
    97vw 88vh 0 #fff,
    25vw 18vh 0 1px #fff,
    50vw 32vh 0 1px #fff,
    75vw 25vh 0 1px #fff,
    12vw 65vh 0 1px #fff,
    61vw 78vh 0 1px #fff,
    82vw 52vh 0 1px #fff,
    45vw 84vh 0 1px #fff,
    78vw 11vh 0 1px #fff,
    32vw 92vh 0 1px #fff,
    65vw 5vh 0 1px #fff;
  animation: twinkle4 2.9s infinite alternate;
}

@keyframes twinkle1 {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

@keyframes twinkle2 {
  0% {
    opacity: 0.35;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes twinkle3 {
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.8;
  }
}

@keyframes twinkle4 {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
