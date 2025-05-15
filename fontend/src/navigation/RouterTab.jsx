import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../pages/HomeScreen";
import TaskScreen from "../pages/TaskSceen";
import WarningScreen from "../pages/WarningScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Chi nhánh":
              iconName = "office-building";
              break;
            case "Chức năng":
              iconName = "tools";
              break;
            case "Cảnh báo":
              iconName = "alert";
              break;
            default:
              iconName = "circle";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#007AFF",
        tabBarStyle: {
          backgroundColor: "#fefefe",
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Chi nhánh" component={HomeScreen} />
      <Tab.Screen name="Chức năng" component={TaskScreen} />
      <Tab.Screen name="Cảnh báo" component={WarningScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;