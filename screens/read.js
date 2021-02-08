import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, FlatList, KeyboardAvoidingView} from 'react-native';
import styles from '../styles.js';
import AppHeader from '../components/AppHeader';
import uri from '../images/uri';
import db from '../config';
import Animation from '../components/Animation';

export default class ReadingScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      search:'',
      allStories:[],
      dataSource:[],
      lastVisibleStory:null
    }
  }

  allS = [];

  getStories = async ()=>{
    var list = [];
    db.collection("Stories").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.id, " => ", doc.data());
        list[list.length] = [doc.id, " => ", doc.data()];
        //console.log(list,1);
    });
    //console.log(list);
    });
    this.allS = list;
    this.setState({
      allStories : list,
      dataSource : list
    });
  }

  searchFilterFunction = async ()=>{
    var stories = this.state.allStories;
    //var list = [];
    for(var i = 0;i<stories.length;i++){
      var text = stories[i][0].toUpperCase();
      var author = stories[i][2].Author.toUpperCase();
      if(text === this.state.search.toUpperCase()){
        this.state.dataSource[this.state.dataSource.length] = stories[i]
      }else if(author === this.state.search.toUpperCase()){
        this.state.dataSource[this.state.dataSource.length] = stories[i]
      }else if(this.state.search === null  || this.state.search === ''){
        this.state.dataSource = stories;
      }
    }

    if(this.state.dataSource === ''){
      alert("Story or Author not found");
    }

    var ans  = this.state.dataSource;
    //console.log(ans);
    var ans2 = ans[ans.length-1];
    this.state.lastVisibleStory = ans2;
    //console.log(this.state.lastVisibleStory,1);
  }


  componentDidMount = ()=>{
    this.getStories();
    //console.log(allS);
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container, {width:'80%', marginLeft:'10%'}}>
        <AppHeader />
        <View style = {{marginLeft:30}}>
        <TextInput 
          style = {styles.bar}
          placeholder = 'Title Or Author of the story'
          value = {this.state.search}
          editable
          textAlignVertical = 'top'
          onChangeText = {text=> this.setState({
                search:text,
                dataSource:''
          })}
        />
        <TouchableOpacity
          style = {styles.button}
          onPress={()=>{this.searchFilterFunction()}}
        >
          <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <FlatList 
          data={this.state.dataSource}
          extraData = {this.state.search}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 3, height:50, width:350, borderBottomColor:'#38726C', marginTop:5}}>
              <Text>{"Title: " + item[0]}</Text>
              <Text>{"Author: " + item[2].Author}</Text>
            </View>
          )}
          keyExtractor={(index) => index.toString()}
          onEndReached ={this.getStories}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          onEndReachedThreshold={1}
        />
        <Animation />
        <Text style = {styles.text}>NO MORE STORIES TO READ</Text>
        <Text style = {styles.comment}>Press search to see all the Stories</Text>
        </View>
      </View>
    );
  }
}

//<Image source={require("../images/read1.jpg")} style = {styles.img} />