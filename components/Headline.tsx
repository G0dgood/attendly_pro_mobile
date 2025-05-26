import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../css/colorsIndex";
import { Bell } from "@/assets/svg/Bell";
import { RootStackParamList } from "@/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Skeleton } from "@rneui/base";

// Define type for the Home component props
type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  user: string | any
  profileIsLoading: false | any
};

const Headline: React.FC<HomeProps> = ({ navigation, user, profileIsLoading }) => {
  const [load, setLoad] = useState(false);
  const profileName = user?.data?.user?.name;
  const firstLetter = profileName?.trim()[0];
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Function to determine the time-based greeting
  const getGreeting = () => {
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Night';
    }
  };

  const handleNotification = () => {
    navigation.navigate('Notifications')
  };
  const handleprofile = () => {
    setLoad(true)
    navigation.navigate('Profile')
  };



  return (
    <View style={styles.dashboard_titel_container}>
      <View style={styles.dashboard_profile_container}>
        {(load ? "" : profileIsLoading) ? <Skeleton circle width={40} height={40} /> :
          <TouchableOpacity style={styles.dashboard_profile} onPress={handleprofile}>
            <Text style={styles.dashboard_profile_text_one}>{firstLetter}</Text>
          </TouchableOpacity>}
        <View style={(load ? "" : profileIsLoading) && styles.profileText}>
          {(load ? "" : profileIsLoading) ? <Skeleton width={80} height={15} /> :
            <Text style={styles.dashboard_profile_text}>{profileName}</Text>}
          {(load ? "" : profileIsLoading) ? <Skeleton width={150} height={15} /> :
            <Text style={styles.dashboard_profile_text_one}> {getGreeting()}</Text>}
        </View>
      </View>
      <View style={styles.dashboard_calender_container_main}>
        <TouchableOpacity style={styles.dashboard_calender_container} onPress={handleNotification}>
          <Bell />
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default Headline;

const styles = StyleSheet.create({
  profileText: {
    gap: 2
  },

  dashboard_profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: colors.smail_text_color,

  },

  dashboard_profile_text: {
    color: colors.gray500,
    fontFamily: "Inter",
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  dashboard_calender_container_main: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dashboard_profile_text_one: {
    color: colors.gray900,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },


  dashboard_calender_container: {
    width: 24,
  },

  dashboard_profile_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  dashboard_titel_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20,
  },

});
