import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Platform } from "react-native";
import { RootStackParamList } from "@/types";
import { Back } from "@/assets/svg/Back";
import { colors } from "@/css/colorsIndex";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Define type for the Header component props
type HeaderProps = {
  text: string | any;
};

const Header: React.FC<HeaderProps> = ({ text }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
        <Back />
        <Text style={styles.title}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: Platform.OS === "ios" ? 20 : 20,
    paddingBottom: Platform.OS === "ios" ? 5 : 5,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray200, // Mimic shadow/border on default headers
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "400", // Matches the React Navigation header font weight
    color: colors.black,
  },
});
