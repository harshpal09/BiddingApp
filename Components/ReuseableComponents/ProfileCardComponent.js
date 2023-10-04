import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import globalStyles, { LARGE_FONT_SIZE } from '../../Styles/global';
import {DataTable} from 'react-native-paper';
import RenderIf from '../ExtraScreens/RenderIf';
import TabRoutes from '../Navigations/TabRoutes';

export default function ProfileCardComponent({data, isProfile, headerTitle}) {
  return (
    <SafeAreaView
      style={[globalStyles.mainContainer, globalStyles.flexBoxAlign,{marginVertical:10}]}>
      <DataTable style={globalStyles.cardTable}>
        {RenderIf(isProfile != null)(
          <DataTable.Row style={[globalStyles.cardProfileHeader]}>
            <View>
              <View style={[globalStyles.rowContainer]}>
                <View
                  style={[
                    globalStyles.flexBox,
                    globalStyles.profileHeaderImageContainer,
                  ]}>
                  <Image
                    style={[globalStyles.profileHeaderImage]}
                    source={require('../../Assets/Images/avatar_img.jpeg')}
                  />
                </View>
                <View
                  style={[
                    globalStyles.columnContainer,
                    globalStyles.flexBox,
                    globalStyles.profileHeaderTextConatainer,
                  ]}>
                  <View>
                    <Text
                      style={[
                        {
                          fontSize: LARGE_FONT_SIZE,
                          letterSpacing: 1,
                          fontWeight: '400',
                          color: 'white',
                        },
                      ]}>
                      Hello
                    </Text>
                    <Text style={[globalStyles.profileHeaderText]}>{isProfile != null ? isProfile.name :""}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[globalStyles.profileHeaderText]}>Dealer Code : {isProfile != null ?isProfile.dealer_code:""}</Text>
              </View>
            </View>
          </DataTable.Row>
        )}
        {/* {RenderIf(headerTitle != '')(
          <DataTable.Row style={[globalStyles.cardHeaderRowStyle]}>
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.cardHeadingText}>{headerTitle}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>,
        )} */}
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'grey'},
            ]}
            >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>E-Mail</Text>
                <Text style={globalStyles.profileIcons}>{data.email}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'grey'},
            ]}
           >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>Contact</Text>
                <Text style={globalStyles.profileIcons}>{data.contact}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'grey'},
            ]}
            >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>Alternate Contact</Text>
                <Text style={globalStyles.profileIcons}>{data.aleternate_mobile}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'grey'},
            ]}
           >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>Date of Birth</Text>
                <Text style={globalStyles.profileIcons}>{data.dob}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'grey'},
            ]}
            >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>PAN</Text>
                <Text style={globalStyles.profileIcons}>{data.pancard}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={[
              globalStyles.cardRowStyles,
              {borderBottomColor:'white'},
            ]}
            >
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.profileHeadingText}>Adhaar Card</Text>
                <Text style={globalStyles.profileIcons}>{data.adharcard}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
      </DataTable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
