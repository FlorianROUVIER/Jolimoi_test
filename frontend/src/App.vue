<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const number = ref(0);
const result = ref('');
const error = ref('');

async function convertNumber() {
  error.value = '';
  result.value = '';

  try {
    const response = await api.getRomanNumber({ number: number.value });
    // console.log(response.data);
    result.value = response.data.romanResult;
    // console.log('Conversion done:', result.value);
  } catch (err) {
    // console.error('API Error:', err);
    error.value = err.response?.data?.error || 'Error during the conversion...';
  }
}
</script>

<template>
  <h1>Roman Numeral Converter (0 & 100 only)</h1>
  <form @submit.prevent="convertNumber">
    <label for="number">Number (0–100):</label>
    <!-- Limit between 0 & 100  -->
    <input type="number" id="number" v-model.number="number" min="0" max="100" required />
    <button type="submit">Convert</button>
  </form>
  <h2>Result : {{ result }}</h2>
  <p v-if="error" style="color: red">{{ error }}</p>
</template>

<style scoped></style>





