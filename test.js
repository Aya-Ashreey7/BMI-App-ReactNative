import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // تحويل من سم إلى متر

    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi('بيانات غير صالحة');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>احسب مؤشر كتلة الجسم (BMI)</Text>

      <TextInput
        style={styles.input}
        placeholder="ادخل الوزن بالكيلوجرام"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="ادخل الطول بالسنتيمتر"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Button title="احسب" onPress={calculateBMI} />

      {bmi && (
        <Text style={styles.result}>
          مؤشر كتلة الجسم هو: {bmi}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
  },
});