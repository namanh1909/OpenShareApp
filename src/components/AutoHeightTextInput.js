import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const AutoHeightTextInput = (props) => {
  const [height, setHeight] = useState(50);
  const [onFocus, setOnFocus] = useState(false);

  const handleChangeText = (text) => {
    props.onChangeText && props.onChangeText(text);
    setHeight(Math.max(50, Math.ceil(text.length / 30) * 20));
  };

  return (
    <TextInput
      {...props}
      placeholder={props.placeholder}
      multiline={true}
      style={[
        styles.input,
        {
          height: props.height,
          borderColor: onFocus ? "#FFA925" : "gray",
          ...props.style,
        },
      ]}
      onFocus={() => {
        setOnFocus(true);
      }}
      value={props.value}
      onBlur={() => {
        setOnFocus(false);
      }}
      onContentSizeChange={(event) =>
        setHeight(
          Math.max(
            props.heightDefault,
            Math.ceil(event.nativeEvent.contentSize.height / 20) * 20
          )
        )
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
    minWidth: 300
  },
});

export default AutoHeightTextInput;
