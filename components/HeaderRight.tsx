import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Platform } from "react-native";
import { colors } from "@/css/colorsIndex";

// Define type for the Header component props
type HeaderProps = {
  text: string; // Expecting a string for the header text
  headerMove: () => void; // Function type for the header action
};

const Header: React.FC<HeaderProps> = ({ text, headerMove }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={headerMove} style={styles.backButton}>
        <Text style={styles.title}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    paddingTop: Platform.OS === "ios" ? 62 : 20,
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
