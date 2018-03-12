import React, {Component} from "react"
import {View, Text, FlatList } from 'react-native'
import {List,ListItem} from 'react-native-elements'
class FlatListTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading :false,
      data:[],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
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

          />
        </List>
      )
    }

}
export default FlatListTable
