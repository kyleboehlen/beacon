<script lang="ts" setup></script>
<template>
  <div class="stars">
    <div class="stars1"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    <div class="stars4"></div>
    <div class="stars5"></div>
    <div class="stars6"></div>
    <div class="stars7"></div>
    <div class="stars8"></div>
    <div class="stars9"></div>
    <div class="stars10"></div>
    <div class="stars11"></div>
    <div class="stars12"></div>
    <div class="stars13"></div>
    <div class="stars14"></div>
    <div class="stars15"></div>
    <slot />
  </div>
</template>

<style scoped>
.stars {
  background: linear-gradient(to bottom, #000000, #0a0a0f, #050510);
  overflow: hidden;
}

:slotted(*) {
  position: relative;
  z-index: 1;
}

.stars1, .stars2, .stars3, .stars4, .stars5,
.stars6, .stars7, .stars8, .stars9, .stars10,
.stars11, .stars12, .stars13, .stars14, .stars15 {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* stars1: size 6px, speed 9.4s */
.stars1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    71.67vw 34.91vh 0 #fff,
    59.58vw 93.89vh 0 #fff;
  animation: twinkle1 9.4s infinite alternate;
}

/* stars2: size 6px, speed 9.2s */
.stars2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    47.5vw 28.61vh 0 #fff;
  animation: twinkle2 9.2s infinite alternate-reverse;
}

/* stars3: size 5px, speed 7.6s */
.stars3::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    76.67vw 3.52vh 0 #fff;
  animation: twinkle3 7.6s infinite alternate;
}

/* stars4: size 5px, speed 7.6s */
.stars4::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    46.09vw 48.89vh 0 #fff;
  animation: twinkle4 7.6s infinite alternate-reverse;
}

/* stars5: size 5px, speed 7.4s */
.stars5::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    3.18vw 35.09vh 0 #fff,
    11.41vw 71.85vh 0 #fff;
  animation: twinkle5 7.4s infinite alternate;
}

/* stars6: size 5px, speed 7.4s */
.stars6::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    57.66vw 28.24vh 0 #fff,
    96.51vw 29.17vh 0 #fff,
    51.04vw 37.78vh 0 #fff,
    30.36vw 90.19vh 0 #fff,
    60.68vw 90.56vh 0 #fff,
    93.02vw 90.56vh 0 #fff;
  animation: twinkle6 7.4s infinite alternate-reverse;
}

/* stars7: size 4px, speed 7.2s */
.stars7::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    73.44vw 8.33vh 0 #fff,
    20.78vw 47.59vh 0 #fff,
    15.68vw 48.52vh 0 #fff,
    93.18vw 74.17vh 0 #fff,
    70.68vw 82.41vh 0 #fff;
  animation: twinkle7 7.2s infinite alternate;
}

/* stars8: size 3px, speed 5.6s */
.stars8::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    1.09vw 7.87vh 0 #fff,
    18.12vw 11.39vh 0 #fff,
    60.78vw 12.13vh 0 #fff,
    78.75vw 15.28vh 0 #fff,
    21.72vw 23.7vh 0 #fff,
    52.5vw 26.02vh 0 #fff,
    43.18vw 30.65vh 0 #fff,
    79.9vw 32.78vh 0 #fff,
    93.33vw 34.35vh 0 #fff,
    44.32vw 35.83vh 0 #fff,
    68.85vw 47.87vh 0 #fff,
    80.73vw 49.35vh 0 #fff,
    62.81vw 58.52vh 0 #fff,
    27.29vw 60.28vh 0 #fff,
    79.17vw 63.98vh 0 #fff,
    97.4vw 67.22vh 0 #fff,
    57.03vw 74.91vh 0 #fff,
    16.09vw 83.06vh 0 #fff,
    47.55vw 84.17vh 0 #fff,
    5.47vw 92.41vh 0 #fff,
    23.23vw 94.91vh 0 #fff;
  animation: twinkle8 5.6s infinite alternate-reverse;
}

/* stars9: size 3px, speed 5.5s */
.stars9::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    90.0vw 0.37vh 0 #fff,
    35.99vw 1.57vh 0 #fff,
    30.05vw 13.52vh 0 #fff,
    59.22vw 15.65vh 0 #fff,
    91.82vw 17.13vh 0 #fff,
    52.08vw 24.26vh 0 #fff,
    40.62vw 40.83vh 0 #fff,
    70.52vw 45.83vh 0 #fff,
    93.28vw 48.06vh 0 #fff,
    40.1vw 55.0vh 0 #fff,
    17.55vw 56.76vh 0 #fff,
    47.08vw 81.76vh 0 #fff,
    85.94vw 84.44vh 0 #fff,
    92.24vw 94.72vh 0 #fff,
    88.91vw 96.02vh 0 #fff,
    58.54vw 98.52vh 0 #fff;
  animation: twinkle9 5.5s infinite alternate;
}

/* stars10: size 3px, speed 5.3s */
.stars10::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    87.6vw 26.94vh 0 #fff,
    82.6vw 47.13vh 0 #fff,
    85.52vw 48.24vh 0 #fff,
    17.97vw 59.07vh 0 #fff,
    59.84vw 76.3vh 0 #fff;
  animation: twinkle10 5.3s infinite alternate-reverse;
}

/* stars11: size 3px, speed 5.2s */
.stars11::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    56.51vw 46.67vh 0 #fff;
  animation: twinkle11 5.2s infinite alternate;
}

/* stars12: size 2px, speed 3.8s */
.stars12::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    39.74vw 2.31vh 0 #fff,
    35.0vw 3.33vh 0 #fff,
    54.27vw 3.89vh 0 #fff,
    60.21vw 4.17vh 0 #fff,
    90.89vw 9.54vh 0 #fff,
    29.64vw 10.74vh 0 #fff,
    31.98vw 10.93vh 0 #fff,
    98.75vw 13.33vh 0 #fff,
    16.46vw 14.44vh 0 #fff,
    30.78vw 15.65vh 0 #fff,
    7.24vw 16.85vh 0 #fff,
    29.32vw 18.24vh 0 #fff,
    36.82vw 18.89vh 0 #fff,
    26.2vw 23.06vh 0 #fff,
    44.43vw 24.26vh 0 #fff,
    38.18vw 26.3vh 0 #fff,
    66.82vw 27.41vh 0 #fff,
    85.89vw 27.87vh 0 #fff,
    24.48vw 32.31vh 0 #fff,
    89.01vw 33.8vh 0 #fff,
    64.53vw 37.31vh 0 #fff,
    70.52vw 37.78vh 0 #fff,
    40.26vw 38.24vh 0 #fff,
    36.72vw 38.98vh 0 #fff,
    64.17vw 39.35vh 0 #fff,
    8.02vw 39.44vh 0 #fff,
    56.3vw 40.56vh 0 #fff,
    52.03vw 41.76vh 0 #fff,
    58.75vw 42.13vh 0 #fff,
    52.71vw 43.98vh 0 #fff,
    45.99vw 44.54vh 0 #fff,
    79.01vw 45.19vh 0 #fff,
    28.44vw 45.93vh 0 #fff,
    39.53vw 46.39vh 0 #fff,
    89.48vw 48.61vh 0 #fff,
    58.75vw 48.8vh 0 #fff,
    20.78vw 49.35vh 0 #fff,
    9.38vw 53.52vh 0 #fff,
    46.09vw 54.91vh 0 #fff,
    49.64vw 55.65vh 0 #fff,
    33.02vw 55.93vh 0 #fff,
    55.99vw 60.09vh 0 #fff,
    52.71vw 60.28vh 0 #fff,
    82.86vw 63.89vh 0 #fff,
    52.92vw 64.26vh 0 #fff,
    46.09vw 64.72vh 0 #fff,
    58.65vw 69.07vh 0 #fff,
    85.99vw 70.09vh 0 #fff,
    47.45vw 72.22vh 0 #fff,
    4.9vw 72.5vh 0 #fff,
    36.93vw 73.43vh 0 #fff,
    15.0vw 80.0vh 0 #fff,
    0.21vw 84.26vh 0 #fff,
    3.44vw 84.81vh 0 #fff,
    38.02vw 91.57vh 0 #fff,
    8.96vw 93.33vh 0 #fff,
    88.75vw 93.33vh 0 #fff,
    2.55vw 94.81vh 0 #fff,
    87.76vw 97.41vh 0 #fff,
    83.54vw 97.59vh 0 #fff,
    74.22vw 99.35vh 0 #fff;
  animation: twinkle12 3.8s infinite alternate-reverse;
}

/* stars13: size 2px, speed 3.5s */
.stars13::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    33.65vw 0.0vh 0 #fff,
    85.62vw 0.28vh 0 #fff,
    65.94vw 2.5vh 0 #fff,
    4.01vw 5.56vh 0 #fff,
    47.45vw 6.39vh 0 #fff,
    86.3vw 6.94vh 0 #fff,
    52.03vw 8.24vh 0 #fff,
    16.88vw 10.0vh 0 #fff,
    22.5vw 10.09vh 0 #fff,
    23.49vw 10.19vh 0 #fff,
    25.05vw 10.19vh 0 #fff,
    25.99vw 11.67vh 0 #fff,
    38.02vw 15.83vh 0 #fff,
    16.2vw 16.67vh 0 #fff,
    58.44vw 18.7vh 0 #fff,
    5.83vw 19.72vh 0 #fff,
    0.83vw 20.56vh 0 #fff,
    30.31vw 21.11vh 0 #fff,
    23.85vw 23.24vh 0 #fff,
    75.36vw 23.33vh 0 #fff,
    27.5vw 26.11vh 0 #fff,
    40.73vw 30.0vh 0 #fff,
    45.31vw 30.09vh 0 #fff,
    29.43vw 33.8vh 0 #fff,
    28.49vw 37.13vh 0 #fff,
    10.94vw 37.87vh 0 #fff,
    75.83vw 37.87vh 0 #fff,
    68.8vw 39.91vh 0 #fff,
    48.75vw 46.76vh 0 #fff,
    61.67vw 46.76vh 0 #fff,
    50.83vw 52.31vh 0 #fff,
    14.06vw 52.78vh 0 #fff,
    24.84vw 53.43vh 0 #fff,
    10.52vw 53.7vh 0 #fff,
    60.62vw 54.91vh 0 #fff,
    64.01vw 55.09vh 0 #fff,
    72.97vw 57.5vh 0 #fff,
    32.45vw 61.48vh 0 #fff,
    44.48vw 61.3vh 0 #fff,
    84.27vw 61.48vh 0 #fff,
    94.79vw 61.39vh 0 #fff,
    63.7vw 64.35vh 0 #fff,
    35.47vw 66.11vh 0 #fff,
    74.32vw 68.61vh 0 #fff,
    74.48vw 73.06vh 0 #fff,
    31.2vw 76.57vh 0 #fff,
    61.67vw 76.85vh 0 #fff,
    71.98vw 79.81vh 0 #fff,
    45.31vw 81.2vh 0 #fff,
    9.38vw 82.41vh 0 #fff,
    53.39vw 82.96vh 0 #fff,
    46.09vw 83.24vh 0 #fff,
    97.4vw 88.8vh 0 #fff,
    48.65vw 90.19vh 0 #fff,
    39.06vw 91.39vh 0 #fff,
    18.44vw 95.93vh 0 #fff,
    64.01vw 95.93vh 0 #fff,
    24.27vw 97.41vh 0 #fff,
    88.91vw 99.17vh 0 #fff;
  animation: twinkle13 3.5s infinite alternate;
}

/* stars14: size 2px, speed 3.2s */
.stars14::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    18.33vw 0.0vh 0 #fff,
    62.66vw 0.0vh 0 #fff,
    92.5vw 0.0vh 0 #fff,
    96.51vw 0.0vh 0 #fff,
    55.05vw 15.37vh 0 #fff,
    65.21vw 15.28vh 0 #fff,
    49.58vw 22.13vh 0 #fff,
    43.28vw 23.8vh 0 #fff,
    46.25vw 27.04vh 0 #fff,
    53.7vw 43.8vh 0 #fff,
    3.28vw 44.35vh 0 #fff,
    71.82vw 65.65vh 0 #fff,
    58.02vw 66.48vh 0 #fff,
    67.03vw 69.54vh 0 #fff,
    62.81vw 73.52vh 0 #fff,
    12.19vw 85.09vh 0 #fff;
  animation: twinkle14 3.2s infinite alternate-reverse;
}

/* stars15: size 1px, speed 2.8s */
.stars15::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    37.34vw 99.81vh 0 #fff;
  animation: twinkle15 2.8s infinite alternate;
}

@keyframes twinkle1 {
  0% { opacity: 0.1; }
  100% { opacity: 0.6; }
}

@keyframes twinkle2 {
  0% { opacity: 0.08; }
  100% { opacity: 0.55; }
}

@keyframes twinkle3 {
  0% { opacity: 0.1; }
  100% { opacity: 0.6; }
}

@keyframes twinkle4 {
  0% { opacity: 0.08; }
  100% { opacity: 0.55; }
}

@keyframes twinkle5 {
  0% { opacity: 0.1; }
  100% { opacity: 0.55; }
}

@keyframes twinkle6 {
  0% { opacity: 0.12; }
  100% { opacity: 0.6; }
}

@keyframes twinkle7 {
  0% { opacity: 0.08; }
  100% { opacity: 0.5; }
}

@keyframes twinkle8 {
  0% { opacity: 0.05; }
  100% { opacity: 0.45; }
}

@keyframes twinkle9 {
  0% { opacity: 0.08; }
  100% { opacity: 0.4; }
}

@keyframes twinkle10 {
  0% { opacity: 0.05; }
  100% { opacity: 0.45; }
}

@keyframes twinkle11 {
  0% { opacity: 0.05; }
  100% { opacity: 0.4; }
}

@keyframes twinkle12 {
  0% { opacity: 0.05; }
  100% { opacity: 0.4; }
}

@keyframes twinkle13 {
  0% { opacity: 0.05; }
  100% { opacity: 0.38; }
}

@keyframes twinkle14 {
  0% { opacity: 0.02; }
  100% { opacity: 0.32; }
}

@keyframes twinkle15 {
  0% { opacity: 0.02; }
  100% { opacity: 0.28; }
}

@media (prefers-reduced-motion: reduce) {
  .stars1::before, .stars2::before, .stars3::before,
  .stars4::before, .stars5::before, .stars6::before,
  .stars7::before, .stars8::before, .stars9::before,
  .stars10::before, .stars11::before, .stars12::before,
  .stars13::before, .stars14::before, .stars15::before {
    animation: none;
    opacity: 0.3;
  }
}
</style>
