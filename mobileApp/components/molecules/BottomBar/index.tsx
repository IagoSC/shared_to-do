import { StyleSheet, View } from "react-native"


export function BottomBar(): JSX.Element {
    return (
        <View 
            style={styles.container}
        ></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:"absolute",
        bottom: 0,
        height: 50,
        backgroundColor: "#333"
    }
})