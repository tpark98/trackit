import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 150,
    },
    icon: {
        width: 100,
        height: 100,
        backgroundColor: "black",
        marginBottom: 10,
        resizeMode: "contain",
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: "#612c73",
        marginBottom: 40,
    },
    input: {
        width: "100%",
        backgroundColor: "#ecebea",
        padding: 14,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        color: "#333",
    },
    hint: {
        fontSize: 12,
        color: "#555",
        marginBottom: 30,
        width: "100%",
    },
    button: {
        backgroundColor: "#612c73",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 6,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    errorText: {
        color: "red",
        marginBottom: 15,
        fontSize: 16,
        textAlign: "center",
      },
      
});
