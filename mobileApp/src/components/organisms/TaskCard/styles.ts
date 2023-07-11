import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      marginTop: 12,
      height: 120,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10, 
      paddingHorizontal: 24,
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 1,
    },
    textSection: {
      flex: 4,
      margin: 10,
      marginLeft:20
    },
    actionsSection: {
      flex: 1,
      alignItems: "flex-end"
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
    },
    description: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });
  