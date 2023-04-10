import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const AutoHeightTextInput = (props) => {
  const [height, setHeight] = useState(0);
  const [onFocus, setOnFocus] = useState(false)

  const handleChangeText = (text) => {
    props.onChangeText && props.onChangeText(text);
    setHeight(Math.max(35, Math.ceil(text.length / 30) * 20));
  };

  return (
    <TextInput
      {...props}
      placeholder={props.placeholder}
      multiline={true}
      style={[styles.input, { height: Math.min(height, 350), borderColor: onFocus ? '#FFA925' : '#f5f5f5',
    }]}
    onFocus={() => {
      setOnFocus(true);
    }}x
    onBlur={() => {
      setOnFocus(false);
    }}
      onContentSizeChange={(event) =>
        setHeight(Math.max(props.heightDefault, Math.ceil(event.nativeEvent.contentSize.height / 20) * 20))
      }
      onChangeText={handleChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    marginVertical: 10,
    fontSize: 14,
    borderRadius: 10,
  },
});

export default AutoHeightTextInput;
