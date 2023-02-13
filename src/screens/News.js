import React,{useState} from "react";
import { Text, Pressable, View, SafeAreaView ,StyleSheet,FlatList} from "react-native";
import Article from "../components/Article";
import SwingCapital from '../components/SwingCapital'
function News() {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    // fetch(`${baseUrl}/home`)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     setData(response);
    //     setTimeout(() => {
    //       setIsRefreshing(false);
    //     }, 500);
    //   }).catch((error) => {
    //     console.error(error);
    //     setIsRefreshing(false);
    //   });
  };
  return (
    <SafeAreaView className="w-full h-full">
      <View style={styles.topBar}>
        <SwingCapital text="News" />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Article data={item} />}
        keyExtractor={(item) => item.name}
        style={styles.coinList}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 2 }}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

export default News;
const styles = StyleSheet.create({
  topBar: {
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 6,
    padding: 15,
    paddingTop: 19,
    backgroundColor: "#ffc72c",
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  
});
