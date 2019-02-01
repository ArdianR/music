                            <FlatList
                                horizontal={true}
                                data={this.state.categories}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                            {
                                                item.icons.map((icons) => {
                                                    console.warn(icons.url)
                                                    <TouchableOpacity>
                                                        <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{}}>
                                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}></Text>
                                                        </ImageBackground>
                                                    </TouchableOpacity>
                                                })
                                            }
                                            
                                        <TouchableOpacity>
                                            <Image style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} source={{}}/>
                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{}}>
                                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}></Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />




        // console.log(json.categories);
        var data = json.categories.items.map(function(item) {
            // console.log(item)
            item.icons.map(function(icons) {
                console.log(icons.url)
            });
        });



                                    json.categories.items.map(function(items) {
                                        <TouchableOpacity>
                                            {
                                                items.icons.map(function(icons) {
                                                    <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{}}>
                                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{items.name}</Text>
                                                    </ImageBackground>
                                                })
                                            }
                                        </TouchableOpacity>
                                        
                                    })



                                                                    <View style={{flexWrap: 'wrap'}}>
                                        {
                                            item.items.map(items => (
                                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.items.name}</Text>
                                            ))
                                        }
                                        {
                                            item.items.map(function(items) {
                                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.items.name}</Text>
                                            })
                                        }
                                        {this.WholeNews()}
                                    </View>


                                                                        <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity>
                                            <Image style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} source={{uri: item.icons[0].url}}/>
                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                        </TouchableOpacity>
                                            <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{uri: item.icons[0].url}}>
                                                <TouchableOpacity>
                                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                    </View>



                            <FlatList
                                horizontal={true}
                                data={this.state.categories}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity>
                                            <Image style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} source={{uri: item.icons[0].url}}/>
                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                        </TouchableOpacity>
                                            <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{uri: item.icons[0].url}}>
                                                <TouchableOpacity>
                                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />



                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>New Release</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.releases}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        <TouchableOpacity>
                                            <ImageBackground style={{ height: this.state.height / 3.5, width: this.state.width / 1.25, marginLeft: 20, alignItems: 'center', justifyContent: 'center'}} imageStyle={{ borderRadius: 15 }} source={{uri: item.images[0].url}}>
                                                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: '900', color: 'white'}}>{item.artists[0].name}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, paddingTop: 25}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>Categories</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.categories}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        {
                                            item.icons.map(icons => (
                                                <TouchableOpacity key={icons.url}>
                                                    <ImageBackground  style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} imageStyle={{ borderRadius: 15 }} source={{uri: icons.url}}>
                                                        <Text style={{ fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name.substr(0, 10)}</Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, paddingTop: 25}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>Featured</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.featured}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        {
                                            item.images.map(images => (
                                                <TouchableOpacity key={images.url}>
                                                    <ImageBackground  style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} imageStyle={{ borderRadius: 15 }} source={{uri: images.url}}>
                                                        <Text style={{ fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name.substr(0, 10)}</Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, paddingTop: 25}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>Recommendations</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10, color: 'white'}}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={this.state.recommendations}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        {
                                            item.album.images.map(images => (
                                                <TouchableOpacity key={images.url}>
                                                    <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} imageStyle={{ borderRadius: 15 }} source={{uri: images.url}}>
                                                        <Text style={{ fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name.substr(0, 10)}</Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))   
                                        }  
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />





                            <FlatList
                                horizontal={true}
                                data={this.state.recommendations}
                                renderItem={({item}) => 
                                    <View style={{flexWrap: 'wrap'}}>
                                        {
                                            item.album.images.map(images => (
                                                <TouchableOpacity key={images.url}>
                                                    <ImageBackground style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} imageStyle={{ borderRadius: 15 }} source={{uri: images.url}}>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))   
                                        }
                                        {
                                            item.album.images.map((images) => {
                                                return (
                                                    <Image style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} key={[images][0].url}  source={{ url: [images][0].url }}/>
                                                )
                                            })
                                        }
                                                        
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />



                            
                                dataItem={item.images}
                                dataKey={images.url}
                                dataImageBackground={images.url}
                                dataTextName={item.name.substr(0, 10)}
                                dataKeyExtractor={item.id}      



            {
                item.images.map(images => (
                    <TouchableOpacity key={images.url}>
                        <ImageBackground  style={{ height: 100, width: 100, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'center' }} imageStyle={{ borderRadius: 15 }} source={{uri: images.url}}>
                            <Text style={{ fontSize: 16, fontWeight: '900', color: 'white'}}>{item.name.substr(0, 10)}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                ))
            }