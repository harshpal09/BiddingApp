import EStyleSheet from 'react-native-extended-stylesheet';
import {StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export const {width, height} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 16; //

import React from 'react';

export function NotchHeight() {
  const inset = useSafeAreaInsets();

  return inset.top;
}

// Commonlly used variables
export const BACKGROUD_BLUE_COLOR = '#f0f2f5';
export const RP_S = '\u20B9' + ' ';
export const TOP_TAB_COLOR = '#FFF';
export const TOP_TAB_TEXT_COLOR = '#000';
export const ORANGE_COLOR = '#000';
export const BLUE_COLOR = '#32507a';
export const CONTAINER_BORDER = 2;
export const LIGHT_BLUE = '#ceddf5';
export const INACTIVE_TINT_COLOR = '#6d6d6d';
export const PALATINO_FONT = 'normal';
export const PALATINO_BOLD_FONT = '';
export const PALATINO_BOLD_ITALIC_FONT = 'Palatino-BoldItalic';
export const PALATINO_ITALIC_FONT = 'Palatino-Italic';
export const PALATINO_ROMAN_FONT = 'Palatino-Roman';
export const VERY_SMALL_FONT_SIZE = 10;
export const SMALL_FONT_SIZE = 12;
export const MEDIUM_FONT_SIZE = 14;
export const LARGE_FONT_SIZE = 16;
export const EXTRA_LARGE_FONT_SIZE = 18;
export const XXL_FONT_SIZE = 20;

// Responsive ghlobal styles
const responsiveStyles = EStyleSheet.create({
  container: {
    width: '50%',
    height: '30%',
    '@media (min-width: 768)': {
      width: '30%',
    },
  },
});

// Normal globalStyles.js

const globalStyles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  searchButton: {},

  flexBox: {
    // flex:1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexBoxAlign: {
    // flex:1,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  flexBoxJustify: {
    // flex:1,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  mainContainer: {
    // flex:1,
    display: 'flex',
    // elevation:19,
    backgroundColor: BACKGROUD_BLUE_COLOR,
    // padding:10,
    width: '100%',

    // height: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  block: {
    width: 'auto',
    backgroundColor: 'green',
  },
  scrollViewContainer: {
    width: '100%',
    padding: 10,
    paddingBottom: 100,
    // backgroundColor:'green'
  },
  contentContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    //  height:300,
    marginVertical: 10,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'lightgrey',

    shadowColor: '#000', // Shadow color
    shadshowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity (0 to 1)
    shadowRadius: 4, //
  },
  shadow: {
    shadowColor: '#000', // Shadow color
    shadshowOffset: {width: 0, height: -20}, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity (0 to 1)
    shadowRadius: 8, //
  },
  image: {
    // flex: 1,
    width: '100%',
    height: 200,
    // aspectRatio: 2.34,
    borderTopLeftRadius: CONTAINER_BORDER,
    borderTopRightRadius: CONTAINER_BORDER,
    // backgroundColor: 'rgba(0, 0, 0, 0.09)'
  },
  contentChildContainer: {
    // backgroundColor:'grey',
    padding: 10,
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    bottom: 0,
    padding: 5,
    width: '100%',
  },
  valuationPriceContainer: {
    marginVertical: 5,
  },
  blueText: {
    color: BLUE_COLOR,
    fontWeight: '600',
    fontSize: SMALL_FONT_SIZE,
    fontFamily: PALATINO_BOLD_FONT,
  },
  greenTextContainer: {
    padding: 5,
  },
  fragments: {
    margin: 10,
    // borderBottomColor:'blue',
    // borderBottomWidth:3,
    width: 85,
    height: 40,
  },
  fragmentText: {
    // color:'blue',
    fontWeight: '600',
    fontSize: LARGE_FONT_SIZE,
  },
  greenText: {
    color: 'red',

    fontWeight: '700',
    fontSize: MEDIUM_FONT_SIZE,
  },
  wrapContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    width: '100%',
    marginVertical: 5,
    // backgroundColor:'yellow'
  },
  bidContainer: {
    width: '35%',
    // padding:10,,
    marginHorizontal: 10,
    // backgroundColor: '#c9c9c9',
    // height: 50,
    borderBottomLeftRadius: CONTAINER_BORDER,
  },
  highestBidContainer: {
    transform: [{skewX: '160deg'}, {perspective: 100}],
    width: 200,
    backgroundColor: BLUE_COLOR,
    height: 50,
    borderBottomRightRadius: CONTAINER_BORDER,
    marginLeft: 15,
  },
  dataTable_2: {
    display: 'flex',
    marginVertical: 2,
    width: '100%',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: LARGE_FONT_SIZE,
  },

  cardTable: {
    backgroundColor: '#FFF',
    // padding:20,
    marginVertical: 2,
    width: '95%',
    borderRadius: 15,
  },

  rowStylesBottom: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
  rowStyles: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    width: '100%',
    // backgroundColor:'red'
  },
  cardRowStyles: {
    borderBottomColor: 'lightgrey',
    // borderBottomWidth: 0.5,
  },
  cardHeaderRowStyle: {
    height: 50,
    backgroundColor: BLUE_COLOR,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  profileHeadings: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width:width-50,
    width: '100%',
    paddingHorizontal: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    // backgroundColor:'blue',
  },
  profileHeadingText: {
    textAlignVertical: 'center',
    marginLeft: 0,
    color: '#6D6D6D',
    // width:DeviceInfo.isTablet()?Dimensions.get('screen').width/2.4: Dimensions.get('screen').width/2.8,
    fontFamily: 'Baskervville-Regular',
    fontSize: LARGE_FONT_SIZE,
    // backgroundColor:'red'
  },
  cardHeadingText: {
    textAlignVertical: 'center',
    marginLeft: -2,
    color: '#FFFFFF',
    fontSize: EXTRA_LARGE_FONT_SIZE,
    fontWeight: '600',
  },
  profileIcon: {
    // paddingLeft:DeviceInfo.isTablet()?Dimensions.get('screen').width/2.4: Dimensions.get('screen').width/2.8,
    // backgroundColor: 'blue'
    // alignContent:'flex-end'
    color: 'black',
  },
  profileHeader: {
    backgroundColor: BLUE_COLOR,
    width: '100%',
    padding: 10,
    height: 110,
  },
  cardProfileHeader: {
    backgroundColor: BLUE_COLOR,
    width: '100%',
    padding: 10,
    height: 130,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  profileHeaderText: {
    fontSize: EXTRA_LARGE_FONT_SIZE,
    letterSpacing: 1,
    fontWeight: '600',
    color: 'white',
  },
  profileHeaderImageContainer: {
    width: 90,
    height: 90,
    // backgroundColor: 'grey'
  },
  profileHeaderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileHeaderTextConatainer: {
    // backgroundColor:'green',
    height: 90,
    padding: 5,
  },
  belt: {
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    paddingVertical: 5,
    // maxHeight:60,
  },
  beltItem: {
    padding: 2,
  },
  beltItemIcon: {
    margin: 2,
    color: BLUE_COLOR,
  },
  beltItemText: {
    margin: 2,
    fontSize: SMALL_FONT_SIZE,
    color: BLUE_COLOR,
    fontWeight: '600',
    fontFamily: PALATINO_BOLD_FONT,
  },
  childDetailContainer: {
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    height: 40,
    borderRadius: 10,
  },
  horizontalStackNavigationContainer: {
    width: width,
    height: 50,
    backgroundColor: '#FFF',
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 4,
  },
  horizontalScrollView: {
    width: width,
    height: 50,
    backgroundColor: '#FFF',
  },
  horizontalStackNavigation: {
    borderColor: ORANGE_COLOR,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    // width: ,
    borderWidth: 1.5,
  },
  horizontalStackNavigationText: {
    fontSize: SMALL_FONT_SIZE,
    fontWeight: '600',
    color: ORANGE_COLOR,
  },
  key: {
    width: '70%',
    fontSize: MEDIUM_FONT_SIZE,
    // backgroundColor:'white',
    fontWeight: '400',
    // padding:10
  },
  value: {
    // width:'40%',
    // backgroundColor:'grey',
    fontSize: MEDIUM_FONT_SIZE,
    fontWeight: '700',
  },
  container: {
    width: '100%',
    borderColor: '#ccc',
    // margin: 10,
    // marginTop: -5,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
  },
  header: {
    // padding: 10,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 5,
    width: '100%',
    // height: 300,

    // backgroundColor: '#fff',
  },
  galleryContainer: {
    flex: 1,
    padding: 16,
  },
  galleryItemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  galleryItemImage: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
  },
  galleryItemTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  galleryColumnWrapper: {
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginTop: 10,
    height: 40,
    backgroundColor: BLUE_COLOR, // Use BLUE_COLOR for button background
    borderRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: LARGE_FONT_SIZE,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  filterLeftContainer: {
    // backgroundColor: 'green',
    width: '40%',
    height: '100%',
    borderRightColor:BLUE_COLOR,
    borderRightWidth:1
  },
  filterRightContainer: {
    // backgroundColor: 'grey',
    width: '60%',
    height: '100%',
  },
  filterMainContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    // padding: 10,
    paddingBottom: 50,
  },
  filterLeftTextContainer: {
    padding: 5,
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor:BLUE_COLOR
  },
  filterLeftText:{
    width:'90%',
    fontWeight:'900',
    color:BLUE_COLOR
  }
});

export default globalStyles;
