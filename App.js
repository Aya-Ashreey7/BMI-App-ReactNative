import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { z } from 'zod';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({ height: '', weight: '' });

  const bmiSchema = z.object({
    height: z.string().nonempty('Height is required').refine(
      val => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      'Height must be a number > 0'
    ),
    weight: z.string().nonempty('Weight is required').refine(
      val => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      'Weight must be a number > 0'
    ),
  });

  const getStatus = (val) => {
    if (val < 16) return 'Severe Thinness';
    if (val < 17) return 'Moderate Thinness';
    if (val < 18.5) return 'Mild Thinness';
    if (val < 25) return 'Normal';
    if (val < 30) return 'Overweight';
    if (val < 35) return 'Obese Class I';
    if (val < 40) return 'Obese Class II';
    return 'Obese Class III';
  };


  const calculateBMI = () => {
    setErrors({ height: '', weight: '' });

    const result = bmiSchema.safeParse({ height, weight });

    if (!result.success) {
      const newErrors = { height: '', weight: '' };
      result.error.errors.forEach(err => {
        const field = err.path[0];
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiValue = w / (h * h);

    setBmi(bmiValue.toFixed(2));
    setStatus(getStatus(bmiValue));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>BMI Calculator</Text>

            <TextInput
              keyboardType='numeric'
              value={height}
              onChangeText={setHeight}
              style={styles.input}
              placeholder="Enter Your Height (cm)"
            />
            {errors.height ? <Text style={styles.error}>{errors.height}</Text> : null}

            <TextInput
              keyboardType='numeric'
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              placeholder="Enter Your Weight (kg)"
            />
            {errors.weight ? <Text style={styles.error}>{errors.weight}</Text> : null}

            <View style={styles.btnContainer}>
              <Button color="green" title="Calc BMI" onPress={calculateBMI} />

              {bmi && (
                <>
                  <Text style={styles.result}>Your BMI: {bmi}</Text>
                  <Text style={styles.result}>Status: {status}</Text>
                </>
              )}
            </View>
          </View>



          <StatusBar style="auto" />
        </View>
      </SafeAreaView>

    </SafeAreaProvider>


  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 800,
  },
  formContainer: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderRadius: 2,
    padding: 10,
    marginBottom: 5,
    width: '100%',
    maxWidth: 400,
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 2,
    width: '100%',
    maxWidth: 200,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: 400,
    textAlign: 'center',
    alignSelf: 'center',    
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

});
