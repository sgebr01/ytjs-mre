import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import innertube from "./Innertube";
// import { Log, Platform } from "./youtubei.js/dist/src/platform/lib.js";
import { Log, Platform } from "./youtubei.js/bundle/react-native";

const App = () => {
  LogBox.ignoreLogs(["Require cycle:"]);
  const [yt, setYT] = useState(null);
  const [info, setInfo] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [logArray, setLogArray] = useState([]);
  const dimensions = Dimensions.get("screen");

  const load = () => {
    innertube
      .create({
        generate_session_locally: true,
        retrieve_player: false,
        fetch: async (input, init) => {
          let url;
          if (input instanceof URL) {
            url = input.toString();
          } else {
            url = input.url;
          }

          const start = performance.now();
          console.log("Started the Request to", url);
          console.log("Request Details", input, init)
          const response = await Platform.shim.fetch(input, init);
          const end = performance.now();

          const clone = response.clone();
          const responseText = await clone.text();
          console.log("Input:", JSON.stringify(input));

          let log = `${(end - start).toFixed(1)}ms | ${input.method} | ${url}`;
          setLogArray((prevArray) => [
            ...prevArray,
            { info: log, response: responseText },
          ]);

          return response;
        },
      })
      .then((yt) => {
        setYT(yt);
        yt.getBasicInfo("A5w-dEgIU1M").then((newInfo) => {
          setInfo(newInfo);
        });
      });
  };

  const refresh = () => {
    setLogArray((prevArray) => [
      ...prevArray, { info: "REFRESHED", response: "" },
    ]);
    setYT(null);
    setInfo(null);

    load();
  };

  useEffect(() => {
    if (yt === null && info === null) {
      Log.setLevel(
        Log.Level.INFO,
        Log.Level.WARNING,
        Log.Level.DEBUG,
        Log.Level.ERROR
      );

      load();
    }
  }, []);

  return (
    <View style={[styles.container, { padding: StatusBar.currentHeight }]}>
      {info ? (
        <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
          <View>
            <Image
              source={{ uri: info.basic_info.thumbnail[0].url }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.duration}>
              {formatTime(info?.basic_info?.duration)}
            </Text>
          </View>

          <View>
            <Text style={styles.title}>{info?.basic_info?.title}</Text>
            <Text style={styles.subtitle}>
              {info?.basic_info.author} •{" "}
              {formatNumber(info?.basic_info?.view_count, 2)} Views
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator style={{ transform: [{ scale: 2 }] }} />
        </View>
      )}

      <TouchableOpacity style={styles.secondaryButton} onPress={refresh}>
        <Text style={styles.secondaryButtonText}>Refresh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowLogs(true);
        }}
      >
        <Text style={styles.buttonText}>View Request Logs</Text>
      </TouchableOpacity>

      {showLogs ? (
        <View style={[styles.logContainer, { width: dimensions.width * 0.9 }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Logs</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                setShowLogs(false);
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
              >
                Close Logs
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.secondaryButton, {borderColor: "black", borderWidth: 1, marginTop: 10}]} onPress={refresh}>
            <Text style={styles.secondaryButtonText}>Refresh</Text>
          </TouchableOpacity>

          <FlatList
            data={logArray}
            style={{ marginTop: 10 }}
            renderItem={(data) => {
              return (
                <View style={{ paddingVertical: 10 }}>
                  <Text>{data.item.info}</Text>
                  {/* <Text numberOfLines={40}>{data.item.response}</Text> */}
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

function formatTime(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.round(duration % 60);

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else {
    return `0:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

function formatNumber(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

export default App;

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
