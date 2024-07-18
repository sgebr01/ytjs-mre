import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logContainer: {
    position: "absolute",
    bottom: "1.5%",
    borderRadius: 10,
    height: "80%",
    backgroundColor: "#F0F0F0",
    borderColor: "black",
    borderWidth: 1,
    padding: 25,
  },
  duration: {
    position: "absolute",
    color: "white",
    bottom: 7.5,
    right: 7.5,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 7.5,
    paddingVertical: 3.5,
    borderRadius: 5,
  },
  secondaryButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 17.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17.5,
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 12.5,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 12.5,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    gap: 5,
    alignItems: "center",
  },
});

export default styles;
