import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const FallBack = () => {
  return (
    <View style={tw`items-center justify-center h-100`}>
      <Image source={require("../assets/todo3.png")} />
      <Text style={tw`mt-7 text-lg`}>Start Adding Your Task </Text>
    </View>
  );
};

export default FallBack;
