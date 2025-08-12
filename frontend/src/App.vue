<script setup>
import { ref } from 'vue';

const number = ref(0);
const result = ref('');
const error = ref('');

let eventSource = null;

function convertNumber() {
  error.value = '';
  result.value = '';

  // Close the stream if there's an existing connection
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  // JS method for using SSE back-end
  // Declare eventSource here because var number can be changed anytime if we click on submit 
  eventSource = new EventSource(`http://localhost:3000/convert-sse?number=${number.value}`);

  eventSource.addEventListener('result', (event) => {
    result.value = event.data;
    // console.log('Conversion result:', result.value);
    eventSource.close();
    eventSource = null;
  });

  eventSource.addEventListener('error', (event) => {
    error.value = 'Erreur lors de la conversion ou connexion SSE fermée.';
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  });
}
</script>

<template>
  <h1>Roman Numeral Converter (0 & 100 only)</h1>
  <form @submit.prevent="convertNumber">
    <label for="number">Number (0–100):</label>
    <input type="number" id="number" v-model.number="number" min="0" max="100" required />
    <button type="submit">Convert</button>
  </form>
  <h2>Result : {{ result }}</h2>
  <p v-if="error" style="color: red">{{ error }}</p>
</template>

<style scoped></style>
