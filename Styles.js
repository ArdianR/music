import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    bodyImageLarge: {
        height: 175,
        width: 350,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyImageSmall: {
        height: 100,
        width: 100,
        marginLeft: 20,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bodyTitleSmall: {
        fontSize: 16,
        fontWeight: '900',
        color: 'white'
    },
    bodyTitleLarge: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '900',
        color: 'white'
    },
    browseContainer: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        backgroundColor: 'black'
    },
    browseLeftText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'left',
        color: 'white'
    }

})

export default styles;