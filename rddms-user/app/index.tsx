import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";

export default function Index() {
  const router = useRouter();
  const { userToken, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      if (userToken) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [userToken, loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E3A8A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});