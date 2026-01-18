<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { BasicButton } from '@/shared/ui/basic-button'

export interface Step {
  id: string
  label: string
}

const props = defineProps<{
  steps: Step[]
}>()

const emit = defineEmits(['completed'])

// State
// TODO: state might need to be broken out to a composable, maybe. Navigation methods?
const currentStep = ref(0) // Everything is calculated based on this ref
const currentStepId = computed(() => {
  return props.steps[currentStep.value]?.id ?? null
})

const completedSteps = computed(() => {
  return props.steps.slice(0, currentStep.value)
})

const stepIsCompleted = (id: string) => {
  return completedSteps.value.some(step => step.id === id)
}
// End state

// Navigation methods
const handleNext = () => {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++
  }
}

const handleBack = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const handleFinish = () => {
  currentStep.value = props.steps.length
  emit('completed')
}

const navigateToCompletedStep = (id: string) => {
  // Only allow clicking on completed steps (go backwards)
  if (stepIsCompleted(id)) {
    currentStep.value = props.steps.findIndex(step => step.id === id)
  }
}
// End navigation methods

// Styling helpers
const getStepIndicatorClasses = (id: string) => {
  if (stepIsCompleted(id)) {
    return 'bg-green-600 text-white border-2 border-green-400'
  } else if (id === currentStepId.value) {
    return 'bg-white/10 text-white border-2 border-white'
  } else {
    return 'bg-white/10 text-white/50 border-2 border-white/20'
  }
}

const getStepLabelClasses = (id: string) => {
  if (stepIsCompleted(id)) {
    return 'text-green-400'
  } else if (id === currentStepId.value) {
    return 'text-white'
  } else {
    return 'text-white/50'
  }
}

const getProgressLineClasses = (id: string) => {
  if (stepIsCompleted(id)) {
    return 'bg-green-600'
  } else {
    return 'bg-white/20'
  }
}

// Expose state and methods for custom button slots
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === props.steps.length - 1)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Wizard Step Navigation -->
    <div role="tablist" aria-label="Wizard steps">
      <ul class="relative flex flex-row gap-x-2">
        <!-- Cursor pointer styles on this li are for letting the user know they can click back to completed steps -->
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="flex items-center gap-x-2 shrink basis-0 flex-1 group"
          :class="{
            'cursor-pointer': stepIsCompleted(step.id),
          }"
          @click="navigateToCompletedStep(step.id)"
          @keydown.enter="navigateToCompletedStep(step.id)"
          @keydown.space.prevent="navigateToCompletedStep(step.id)"
          :tabindex="stepIsCompleted(step.id) ? 0 : -1"
          role="tab"
          :aria-label="`${step.label}${stepIsCompleted(step.id) ? ' - Completed' : step.id === currentStepId ? ' - Current' : ''}`"
          :aria-selected="step.id === currentStepId"
          :aria-controls="`tabpanel-${step.id}`"
        >
          <span class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <!-- Step Indicator Circle -->
            <span
              class="size-7 flex justify-center items-center shrink-0 font-medium rounded-full transition-colors duration-200"
              :class="getStepIndicatorClasses(step.id)"
            >
              <!-- Step Number (hidden when complete) -->
              <span
                v-if="!stepIsCompleted(step.id)"
                class="text-sm"
              >
                {{ index + 1 }}
              </span>
              <!-- Checkmark Icon (shown when complete) -->
              <Icon
                v-else
                icon="mdi:check"
                class="size-4"
                aria-hidden="true"
              />
            </span>
            <!-- Step Label -->
            <span
              :id="`step-${step.id}-label`"
              class="ms-2 text-sm font-medium transition-colors duration-200"
              :class="getStepLabelClasses(step.id)"
            >
              {{ step.label }}
            </span>
          </span>
          <!-- Progress Line (hidden for last item) -->
          <div
            v-if="index < steps.length - 1"
            class="w-full h-px flex-1 transition-colors duration-200"
            :class="getProgressLineClasses(step.id)"
          />
        </li>
      </ul>
    </div>

    <!-- Stepper Content -->
    <div class="flex-1 mt-5 sm:mt-8 min-h-0">
      <div
        v-for="step in steps"
        :key="step.id"
        v-show="step.id === currentStepId"
        :id="`tabpanel-${step.id}`"
        role="tabpanel"
        :aria-labelledby="`step-${step.id}-label`"
        :tabindex="0"
        class="w-full h-full"
      >
        <slot :name="step.id" />
      </div>
    </div>

    <!-- Button Group -->
    <div class="mt-5 flex justify-between items-center gap-x-2">
      <!-- Back Button Slot -->
      <slot
        name="back-button"
        :handle-back="handleBack"
        :is-first-step="isFirstStep"
        :current-step="currentStep"
      >
        <!-- Default Back Button -->
        <BasicButton
          :disabled="isFirstStep"
          @click="handleBack"
          aria-label="Previous step"
        >
          <div class="flex flex-row items-center justify-center h-full">
            <Icon icon="mdi:chevron-left" class="size-6" aria-hidden="true" />
            <p>Back</p>
          </div>
        </BasicButton>
      </slot>

      <!-- Next/Finish Button Slot -->
      <slot
        name="next-button"
        :handle-next="handleNext"
        :handle-finish="handleFinish"
        :is-last-step="isLastStep"
        :current-step="currentStep"
      >
        <!-- Default Next Button (shown for all steps except last) -->
        <BasicButton
          v-if="!isLastStep"
          @click="handleNext"
          aria-label="Next step"
        >
          <div class="flex flex-row items-center justify-center h-full">
            <p>Next</p>
            <Icon icon="mdi:chevron-right" class="size-6" aria-hidden="true" />
          </div>
        </BasicButton>

        <!-- Default Finish Button (shown only on last step) -->
        <BasicButton
          v-else
          @click="handleFinish"
          aria-label="Complete wizard"
        >
          <div class="flex flex-row items-center justify-center h-full">
            <p>Finish</p>
            <Icon icon="mdi:check" class="size-6 ml-1" aria-hidden="true" />
          </div>
        </BasicButton>
      </slot>
    </div>

    <!-- Screen reader styles required to keep it in the flow for screen readers without actually showing up visually -->
    <div role="status" aria-live="polite" aria-atomic="true" class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
      <span v-if="currentStepId !== null">
        {{ `Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]?.label}` }}
      </span>
      <span v-else>
        Finished all steps
      </span>
    </div>
  </div>
</template>
