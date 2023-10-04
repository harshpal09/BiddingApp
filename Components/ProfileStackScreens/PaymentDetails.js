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

export default function PaymentDetails({route}) {
  const {data} = route.params;

  return (
      <SafeAreaView
        style={[globalStyles.mainContainer, globalStyles.flexBoxAlign, { marginVertical: 10 }]}>
        <DataTable style={globalStyles.cardTable}>

 
          <DataTable.Row style={[globalStyles.cardHeaderRowStyle]}>
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.9}
                style={globalStyles.profileHeadings}>
                <Text style={globalStyles.cardHeadingText}>Payment Details</Text>
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
                <Text style={globalStyles.profileHeadingText}>Account Number</Text>
                <Text style={globalStyles.profileIcons}>{data.account_no}</Text>
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
                <Text style={globalStyles.profileHeadingText}>Bank Name</Text>
                <Text style={globalStyles.profileIcons}>{data.bank_name}</Text>
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
                <Text style={globalStyles.profileHeadingText}>IFSC code</Text>
                <Text style={globalStyles.profileIcons}>{data.ifsc_code}</Text>
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
                <Text style={globalStyles.profileHeadingText}>Bank Branch Address</Text>
                <Text style={globalStyles.profileIcons}>{data.bank_branch_address}</Text>
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
                <Text style={globalStyles.profileHeadingText}>Dealership Type</Text>
                <Text style={globalStyles.profileIcons}>{data.dealership_type}</Text>
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
                <Text style={globalStyles.profileHeadingText}>Name of Account</Text>
                <Text style={globalStyles.profileIcons}>{data.nature_of_account}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})