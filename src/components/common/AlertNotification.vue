<script setup>

const props = defineProps(['formSuccessMessage', 'formErrorMessage'])

</script>


<template>
                <v-alert
                v-if="props.formSuccessMessage"
                :text="props.formSuccessMessage"
                title="Success!"
                type="success"
                variant="tonal"
                density="compact"
                border="start"
                closable
                class="mb-4"
              ></v-alert>

              <!-- Error Message -->
              <v-alert
                v-if="props.formErrorMessage"
                :text="props.formErrorMessage"
                title="Ooops!"
                type="error"
                variant="tonal"
                density="compact"
                border="start"
                closable
                class="mb-4"
              ></v-alert>
</template>
<style scoped>
.v-alert {
  color: white;
  background-color: white;
}
</style>