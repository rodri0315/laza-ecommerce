import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Formik, useFormik, useFormikContext } from 'formik';
import BackButton from '../../components/BackButton';
import colors from '../../config/colors';
import { Input } from '@rneui/base';
import { Slider } from '@rneui/themed';

export default function AddReview() {

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Add Review</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        {/* form name, how was your experience? star rating slider */}
      </View>
      {/* <View style={styles.formContainer}> */}
      <Formik
        initialValues={{ name: '', text: '', email: 'jorge@headway.io', rating: value }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            // const { data, error } = await supabaseClient.auth.signInWithPassword({
            //   email: values.email,
            //   password: values.password
            // })
            // if (error) throw error

            // handleSignIn(data.session)
          } catch (err) {
            throw err;
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
            <View style={{}}>
              <View style={styles.formContainer}>
                <View style={styles.inputsContainer}>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    label="Name"
                    value={values.name}
                    placeholder="Type your name"
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    label="How was your experience?"
                    value={values.text}
                    placeholder="Describe your experience?"
                    textAlignVertical='top'
                    inputContainerStyle={[styles.input, styles.reviewInput]}
                    labelStyle={styles.label}
                    multiline={true}
                    inputStyle={{ height: 180 }}
                  />
                  <View>
                    <Text>Star</Text>
                    <View style={styles.sliderContainer}>
                      <Text>0.0</Text>
                      <Slider
                        value={value}
                        onValueChange={setValue}
                        maximumValue={5}
                        minimumValue={0}
                        step={.5}
                        allowTouchTrack
                        trackStyle={{
                          height: 5,
                          backgroundColor: colors.orange,
                          borderColor: colors.orange,
                          borderRadius: 5,
                          borderBottomColor: colors.orange,
                        }}
                        thumbStyle={{
                          height: 20, width: 20,
                          backgroundColor: colors.primary,
                        }}
                        thumbTintColor={colors.google}
                        style={{ width: 300, height: 40 }}
                      />
                      <Text>5.0</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* submit button */}
            <TouchableOpacity style={styles.addReviewButton}>
              <Text style={styles.addReviewButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  reviewsCount: {
    fontSize: 15,
    fontWeight: '500',
  },
  reviewsRating: {
    // justifyContent: 'flex-start',
    // textAlign: 'left',
    // alignContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start',  
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  addReviewButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    padding: 40,
    alignItems: 'center',
  },
  addReviewButtonText: {
    color: colors.white,
    paddingVertical: 15,
    fontSize: 17,
    fontWeight: '500',
  },
  reviewListContainer: {
    marginTop: 10,
  },
  reviewInput: {
    // height: 180,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  formContainer: {
    marginTop: 20,
    flexGrow: 1,
  },
  input: {
    padding: 10,
    backgroundColor: colors.grey5,
    borderBottomWidth: 0,
    borderEndColor: 'transparent',
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputsContainer: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
    color: colors.black,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
