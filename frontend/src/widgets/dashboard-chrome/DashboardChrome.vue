<script setup lang="ts"></script>

                           <template>
                             <div class="absolute inset-0 pointer-events-none">
                               <!-- Top frame -->
                               <div class="absolute top-0 left-0 right-0 h-20 pointer-events-auto">
                                 <!-- Top corner brackets -->
                                 <div class="absolute top-0 left-0 w-12 h-12 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                                      style="clip-path: polygon(0 0, 100% 0, 100% 2px, 2px 2px, 2px 100%, 0 100%)"></div>
                                 <div class="absolute top-0 right-0 w-12 h-12 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                                      style="clip-path: polygon(0 0, 100% 0, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 2px, 0 2px)"></div>

                                 <!-- Top edge with glow -->
                                 <div class="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>

                                 <!-- Center panel -->
                                 <div class="absolute top-6 left-1/2 -translate-x-1/2">
                                   <div class="relative px-8 py-2 border border-white/40 bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        style="clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%)">
                                     <div class="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                                   </div>
                                 </div>
                               </div>

                               <!-- Bottom frame -->
                               <div class="absolute bottom-0 left-0 right-0 h-16 pointer-events-auto">
                                 <div class="absolute bottom-0 left-0 w-12 h-12 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                                      style="clip-path: polygon(0 0, 2px 0, 2px calc(100% - 2px), 100% calc(100% - 2px), 100% 100%, 0 100%)"></div>
                                 <div class="absolute bottom-0 right-0 w-12 h-12 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                                      style="clip-path: polygon(calc(100% - 2px) 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 2px), calc(100% - 2px) calc(100% - 2px))"></div>
                                 <div class="absolute bottom-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                               </div>

                               <!-- Left frame -->
                               <div class="absolute top-20 bottom-16 left-0 w-16">
                                 <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                                 <div class="absolute left-6 top-1/4 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                 <div class="absolute left-6 top-1/2 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                 <div class="absolute left-6 top-3/4 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>

                                 <!-- Accent diamonds -->
                                 <div class="absolute left-5 top-1/3 w-2 h-2 border border-white/70 rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.6)]"></div>
                                 <div class="absolute left-5 top-2/3 w-2 h-2 border border-white/70 rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.6)]"></div>
                               </div>

                               <!-- Right frame -->
                               <div class="absolute top-20 bottom-16 right-0 w-16">
                                 <div class="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                                 <div class="absolute right-6 top-1/4 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                 <div class="absolute right-6 top-1/2 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                 <div class="absolute right-6 top-3/4 w-6 h-px bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>

                                 <!-- Accent diamonds -->
                                 <div class="absolute right-5 top-1/3 w-2 h-2 border border-white/70 rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.6)]"></div>
                                 <div class="absolute right-5 top-2/3 w-2 h-2 border border-white/70 rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.6)]"></div>
                               </div>

                               <!-- Content area -->
                               <div class="absolute inset-0 pt-20 pb-16 px-16 pointer-events-auto overflow-hidden">
                                 <div class="w-full h-full">
                                   <slot></slot>
                                 </div>
                               </div>
                             </div>
                           </template>

                           <style scoped></style>
