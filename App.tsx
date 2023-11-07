import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup'; //form validation
import {Formik} from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 Characters')
    .max(16, 'Should be max of 16 Characters')
    .required('Length is Required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerate, setIsPassGenerate] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let charecterList = '';
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChar = '0123456789';
    const specialChar = '!@#$%^&*()_+';

    if (upperCase) {
      charecterList += upperCaseChar;
    }
    if (lowerCase) {
      charecterList += lowerCaseChar;
    }
    if (numbers) {
      charecterList += digitsChar;
    }
    if (symbols) {
      charecterList += specialChar;
    }

    const passwordResult = createPassword(charecterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerate(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerate(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <View
            style={{
              marginTop: 10,
              backgroundColor: '#cfc4f5',
              padding: 14,
              elevation: 4,
              shadowColor: 'black',
              borderRadius: 8,
            }}>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                generatePassword(+values.passwordLength);
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="blue"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>
                      Include Uppercase letters
                    </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#a7b849"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#b86af7"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="red"
                    />
                  </View>
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <Text style={styles.primaryBtnTxt}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPassword();
                      }}>
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
        {isPassGenerate ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Password:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  subTitle: {
    color: 'blue',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    color: 'black',
  },
  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    elevation: 5,
    width: 130,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#8c75fa',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    elevation: 5,
    width: 130,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#8c75fa',
  },
  secondaryBtnTxt: {
    fontWeight: '500',
    textAlign: 'center',
    padding: 6,
    color: 'white',
  },
  card: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#cfc4f5',
    elevation: 5,
    marginBottom: 100,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});

export default App;
