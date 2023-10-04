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

export default function Address({route}) {
  const {data} = route.params;  return (
    <SafeAreaView
    style={[globalStyles.mainContainer, globalStyles.flexBoxAlign, { marginVertical: 10 }]}>
    <DataTable style={globalStyles.cardTable}>


      <DataTable.Row style={[globalStyles.cardHeaderRowStyle]}>
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.cardHeadingText}>Address</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Address</Text>
            <Text style={globalStyles.profileIcons}>{data.permanent_address}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>PIN code</Text>
            <Text style={globalStyles.profileIcons}>{data.permanent_pincode}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Persent Address</Text>
            <Text style={globalStyles.profileIcons}>{data.present_address}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Present PIN </Text>
            <Text style={globalStyles.profileIcons}>{data.present_pincode}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Dealer Address</Text>
            <Text style={globalStyles.profileIcons}>{data.dealership_address}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Dealer City</Text>
            <Text style={globalStyles.profileIcons}>{data.dealership_city}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'grey' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Dealer State</Text>
            <Text style={globalStyles.profileIcons}>{data.dealership_state}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row
        style={[
          globalStyles.cardRowStyles,
          { borderBottomColor: 'white' },
        ]}
      >
        <DataTable.Cell>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}>
            <Text style={globalStyles.profileHeadingText}>Dealer PIN code</Text>
            <Text style={globalStyles.profileIcons}>{data.dealership_pincode}</Text>
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
</SafeAreaView>
  )
}