// const apiPrefix = 'https://accounts.spotify.com/api';
// const base64credentials = 'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';

// export default async () => {
//   console.log('token begin');
//   const res = await fetch(`${apiPrefix}/token`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${base64credentials}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: 'grant_type=client_credentials',
//   });
//   const json = await res.json();
//   const newToken = json.access_token;
//   console.warn('token is', newToken);
//   return newToken;
// }

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    return fetch('https://accounts.spotify.com/api/token',{
      method: 'POST',
      headers: {
        Authorization: 'Basic AQDWo-8o1W6jSYmFBGn-C3BAQ6U-XLepjRk22quQ3t4F4sqZHnYe6z7w9RGitSLUqe_nh-dZqSB7zWQo0JPHj7UWZaaweVSMZKjH0y_M9Q6nvRSbdzshZuWf9X0HjJnbu-ANAN3GofR-5vp_2wVoFcOfwawh2dnADbG2y61g8MyLxApqeJAT_EyXw_a8fIBNLfuLfrrm9KrzCg0l3uH7gJOHwXkRW0k37hutiJHzKNFe8qvV',
        body: {
          grant_type: 'authorization_code',
          code: '/authorize endpoint',
          redirect_uri: 'http://music.spotify.com',
        }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson)

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
