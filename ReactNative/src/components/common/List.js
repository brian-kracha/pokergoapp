import React, {Component} from "react"
import {View, Text, FlatList,  ActivityIndicator } from 'react-native'
import {List,ListItem, SearchBar} from 'react-native-elements'
class FlatListTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading :false,
      data:[],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      selectedIndex: 2
    }
     this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
  this.setState({selectedIndex})
}
    componentWillMount(){
      this.makeRemoteRequest()
    }

    makeRemoteRequest = async() => {
      const { page,seed } = this.state;
      const res = await fetch(`https://randomuser.me/api/?page=${page}&results=20&seed=${seed}`)
      const data = await res.json()
      console.log(data);
      this.setState({loading:true, data:data.results}, ()=>console.log(this.state))
    }
    handleRefresh = async() => {
   this.setState(
     {
       page: 1,
       seed: this.state.seed + 1,
       refreshing: true
     },
     () => {
       this.makeRemoteRequest();
     }
   );
 };
 handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
 renderHeader = () => {
   return <SearchBar placeholder="Type Here..." lightTheme round />;
 };

 renderFooter = () => {
   if (!this.state.loading) return null;

   return (
     <View
       style={{
         paddingVertical: 20,
         borderTopWidth: 1,
         borderColor: "#982D38"
       }}
     >
       <ActivityIndicator animating size="large" />
     </View>
   );
 };
    render(){

      return(
        <List>
          <FlatList
            data={this.state.data}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            renderItem ={({ item })=> {
              return (
                <ListItem
                roundAvatar
                title= {`${ item.name.first } ${ item.name.last }`}
                subtitle ={item.email}
                avatar={{ uri:item.picture.thumbnail }}
                />
              )
            }}
             keyExtractor={item => item.email}
             ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}

          />
        </List>

      )
    }

}
export default FlatListTable
