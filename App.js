import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import Search from './components/Search';
import Listing from './components/Listing';

import token from './api/token'
import search from './api/search'


const PAGE = 20;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      offset: 0,
      isFetching: false,
      query: 'metallica',
      token: null
    };
  }

async refreshToken(){
  const newToken = await token();
  this.setState({
    token: newToken
  })
  console.warn(this.state.token);
}

 async loadNextPage() {
    if (this.state.isFetching) {
      console.log('already fetching');
      return;
    }

    this.setState({ isFetching: true });

    const newItems = await search({
      offset: this.state.offset,
      limit: PAGE,
      q: this.state.query,
      token: this.state.token,
    });

    console.log(newItems);

    this.setState({
      isFetching: false,
      offset: this.state.offset + PAGE,
      items: [
        ...this.state.items,
        ...newItems,
      ],
    });
  }


  async componentDidMount() {
    await this.refreshToken();
    await this.loadNextPage();
  }


 handleSearchChange(text) {
    this.setState({
      query: text,
      items: [],
      offset: 0,
    }, () => {
      this.loadNextPage();
    });
  }

  handleEndReached() {
    this.loadNextPage();
  }



  render() {
    const { items, isFetching } = this.state;

    return (
      <View style={styles.container}>
       <Text style={styles.titleText} >Welcome at ISOM 215!</Text>
               <Search
          onChange={
            text => this.handleSearchChange(text)
          }
        />
        {
          (isFetching && items.length === 0)
            ? <ActivityIndicator />
            : <Listing
                items={items}
                onEndReached={
                  () => this.handleEndReached()
                }
              />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 50,
  },
    titleText: {
    fontSize: '24px',
    textAlign: 'center',
  }
});
