import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert
} from 'react-native';
import { globalStyles } from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BLUE_COLOR,
  CONTAINER_BORDER,
  EXTRA_LARGE_FONT_SIZE,
  LARGE_FONT_SIZE,
  PALATINO_BOLD_FONT,
  TOP_TAB_TEXT_COLOR,
  height,
  width,
} from '../../Styles/global';
import { KEYBOARD_DISMISS_THRESHOLD } from '@gorhom/bottom-sheet';
// import RadioGroup from 'react-native-radio-buttons-group';
import { value } from 'react-native-extended-stylesheet';
import RadioGroup from '../ReuseableComponents/RadioGroup';
import PopularBrandContainer from '../ReuseableComponents/PopularBrandContainer';
import MultipleSelect from '../ReuseableComponents/MultipleSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmType } from '@notifee/react-native';

const MyBottomSheet = ({ toggleModal, models, setParam,callGetData, }) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      type: 'model',
      name: 'Popular Brands',
      models: [
        {
          'brand_name': 'Maruti Suzuki',
          'model': [
            { 'name': 'Swift', 'selected': 'false' },
            { 'name': 'EECO', 'selected': 'false' },
            { 'name': 'Zen estilo', 'selected': 'false' },
            { 'name': 'Ciaz', 'selected': 'false' },
            { 'name': 'swift dizire', 'selected': 'false' },
            { 'name': 'Dizire', 'selected': 'false' },
            { 'name': 'XL6', 'selected': 'false' },
            { 'name': 's-presso', 'selected': 'false' },
            { 'name': 'CELERIO', 'selected': 'false' },
            { 'name': 'A-STAR', 'selected': 'false' },
            { 'name': 'Baleno', 'selected': 'false' },
            { 'name': 'BREZZA', 'selected': 'false' },
            { 'name': 'Grand Vitara', 'selected': 'false' },
            { 'name': 'ALTO ', 'selected': 'false' },
            { 'name': 'IGNIS', 'selected': 'false' },
            { 'name': 'ertiga', 'selected': 'false' },
            { 'name': 'alto k10', 'selected': 'false' },
            { 'name': 'CIAZ', 'selected': 'false' },
            { 'name': 'ALTO 800', 'selected': 'false' },
            { 'name': 'Wagon R', 'selected': 'false' },
            { 'name': 'wagon R Stingray', 'selected': 'false' }
          ]
      },
      {
        'brand_name': 'Hyundai',
        'model': [
          { 'name': 'i10', 'selected': 'false' },
          { 'name': 'GRAND i10', 'selected': 'false' },
          { 'name': 'GRAND i10 NIOS', 'selected': 'false' },
          { 'name': 'VENUE', 'selected': 'false' },
          { 'name': 'I20', 'selected': 'false' },
          { 'name': 'ELITE I20', 'selected': 'false' },
          { 'name': 'i20 N Line', 'selected': 'false' },
          { 'name': 'santro xing', 'selected': 'false' },
          { 'name': 'tucson', 'selected': 'false' },
          { 'name': 'accent', 'selected': 'false' },
          { 'name': 'XCENT', 'selected': 'false' },
          { 'name': 'AURA', 'selected': 'false' },
          { 'name': 'VERNA ', 'selected': 'false' },
          { 'name': 'santa fe', 'selected': 'false' },
          { 'name': 'Creta', 'selected': 'false' },
          { 'name': 'Alcazar', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Mahindra ',
        'model': [
          { 'name': 'Quanto', 'selected': 'false' },
          { 'name': 'verito ', 'selected': 'false' },
          { 'name': 'XYLO', 'selected': 'false' },
          { 'name': 'SCORPIO', 'selected': 'false' },
          { 'name': 'XUV 300', 'selected': 'false' },
          { 'name': 'XUV500', 'selected': 'false' },
          { 'name': 'XUV700', 'selected': 'false' },
          { 'name': 'THAR', 'selected': 'false' },
          { 'name': 'Alturas G4', 'selected': 'false' },
          { 'name': 'KUV 100', 'selected': 'false' },
          { 'name': 'TUV 300', 'selected': 'false' },
          { 'name': 'Marazzo', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'TATA',
        'model': [
          { 'name': 'SAFARI', 'selected': 'false' },
          { 'name': 'NANO', 'selected': 'false' },
          { 'name': 'BOLT', 'selected': 'false' },
          { 'name': 'NEXON', 'selected': 'false' },
          { 'name': 'harrier ', 'selected': 'false' },
          { 'name': 'Tiago', 'selected': 'false' },
          { 'name': 'tigor', 'selected': 'false' },
          { 'name': 'altroz', 'selected': 'false' },
          { 'name': 'PUNCH', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Honda',
        'model': [
          { 'name': 'CITY', 'selected': 'false' },
          { 'name': 'AMAZE', 'selected': 'false' },
          { 'name': 'B RV', 'selected': 'false' },
          { 'name': 'BRIO', 'selected': 'false' },
          { 'name': 'WR-V ', 'selected': 'false' },
          { 'name': 'Mobilio', 'selected': 'false' },
          { 'name': 'jazz', 'selected': 'false' },
          { 'name': 'civic ', 'selected': 'false' },
          { 'name': 'accord', 'selected': 'false' },
          { 'name': 'CR-V', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Ford',
        'model': [
          { 'name': 'Freestyle', 'selected': 'false' },
          { 'name': 'Endeavour', 'selected': 'false' },
          { 'name': 'FIGO             ', 'selected': 'false' },
          { 'name': 'FIGO', 'selected': 'false' },
          { 'name': 'ASPIRE', 'selected': 'false' },
          { 'name': 'ECOSPORTS', 'selected': 'false' },
          { 'name': 'MUSTANG', 'selected': 'false' },
          { 'name': 'Fiesta', 'selected': 'false' },
        ]
      },
      {
        'brand_name': 'MG HECTOR',
        'model': [
          { 'name': 'HECTOR', 'selected': 'false' },
          { 'name': 'HECTOR PLUS', 'selected': 'false' },
          { 'name': 'Astor', 'selected': 'false' },
          { 'name': 'Gloster', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Kia',
        'model': [
          { 'name': 'seltos', 'selected': 'false' },
          { 'name': 'sonet', 'selected': 'false' },
          { 'name': 'Carnival', 'selected': 'false' },
          { 'name': 'carens ', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Toyota',
        'model': [
          { 'name': 'camry', 'selected': 'false' },
          { 'name': 'hilux', 'selected': 'false' },
          { 'name': 'corolla altis', 'selected': 'false' },
          { 'name': 'yaris', 'selected': 'false' },
          { 'name': 'land Cruiser Prado (AT ,P', 'selected': 'false' },
          { 'name': 'land Cruiser Prado(AT,D)', 'selected': 'false' },
          { 'name': 'Land Cruiser(at,d)', 'selected': 'false' },
          { 'name': 'VELLFIRE', 'selected': 'false' },
          { 'name': 'URBAN CRUISER HYRYDER', 'selected': 'false' },
          { 'name': 'glanza', 'selected': 'false' },
          { 'name': 'fortuner', 'selected': 'false' },
          { 'name': 'ETIOS', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Skoda',
        'model': [
          { 'name': 'OCTAVIA', 'selected': 'false' },
          { 'name': 'SUPERB', 'selected': 'false' },
          { 'name': 'rapid ', 'selected': 'false' },
          { 'name': 'SLAVIA', 'selected': 'false' },
          { 'name': 'KODIAQ', 'selected': 'false' },
          { 'name': 'YETI', 'selected': 'false' },
          { 'name': 'KUSHAQ ', 'selected': 'false' },
          { 'name': 'LAURA', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Nissan',
        'model': [
          { 'name': 'SUNNY', 'selected': 'false' },
          { 'name': 'terran', 'selected': 'false' },
          { 'name': 'datsun g', 'selected': 'false' },
          { 'name': 'MICR', 'selected': 'false' },
          { 'name': 'MICRA activ', 'selected': 'false' },
          { 'name': 'teana', 'selected': 'false' },
          { 'name': 'X-TRAI', 'selected': 'false' },
          { 'name': 'EVALIA', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Audi',
        'model': [
          { 'name': 'A4', 'selected': 'false' },
          { 'name': 'A6', 'selected': 'false' },
          { 'name': 'A3', 'selected': 'false' },
          { 'name': 'A7', 'selected': 'false' },
          { 'name': 'A8 ', 'selected': 'false' },
          { 'name': 'Q2', 'selected': 'false' },
          { 'name': 'Q4', 'selected': 'false' },
          { 'name': 'Q6', 'selected': 'false' },
          { 'name': 'Q8', 'selected': 'false' },
          { 'name': 'Q3', 'selected': 'false' },
          { 'name': 'Q3 ', 'selected': 'false' },
          { 'name': 'Q5', 'selected': 'false' },
          { 'name': 'Q7', 'selected': 'false' }
        ]
      },
      {
        'brand_name': 'Chevrolet',
        'model': [
          { 'name': 'BEAT', 'selected': 'false' },
          { 'name': 'optra', 'selected': 'false' },
          { 'name': 'CRUZE', 'selected': 'false' },
          { 'name': 'SPARK', 'selected': 'false' },
          { 'name': 'CAPTIVA', 'selected': 'false' },
          { 'name': 'enjoy', 'selected': 'false' },
          { 'name': 'aveo', 'selected': 'false' },
          { 'name': 'aveo uva', 'selected': 'false' }
        ]
      }
      ],
    },
    {
      type: 'type',
      name: 'Fuel Type',
      key: [
        {
          id: '0',
          label: 'Petrol',
          option: 'dfgh',
          width: 50,
          selected: false,
        },
        {
          id: '1',
          label: 'Diesel',
          option: 'ghj',
          selected: false,
        },
        {
          id: '2',
          label: 'Petrol + CNG',
          option: '',
          selected: false,
        },
      ],
    },
    {
      type: 'transmission',
      name: 'Transmission',
      key: [
        {
          id: '0',
          label: 'Manual',
          option: '',
          selected: false,
        },
        {
          id: '1',
          label: 'Automatic',
          option: '',
          selected: false,
        },
        {
          id: '2',
          label: 'Semi-Automatic',
          option: '',
          selected: false,
        },
      ],
    },
    {
      type: 'km',
      name: 'KM/Driven',
      key: [
        {
          id: '0', // acts as primary key, should be unique and non-empty string
          label: 'Less Than 25,000',
          value: '',
          selected: false,
        },
        {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: '25,000 - 50,000',
          value: '',
          selected: false,
        },
        {
          id: '2', // acts as primary key, should be unique and non-empty string
          label: '50,000 - 75,000',
          value: '',
          selected: false,
        },
        {
          id: '3', // acts as primary key, should be unique and non-empty string
          label: '75,000 - 1,00,000',
          value: '',
          selected: false,
        },
        {
          id: '4', // acts as primary key, should be unique and non-empty string
          label: 'Above 1,00,000',
          value: '',
          selected: false,
        },
      ],
    },
    {
      type: 'regiscity',
      name: 'Registration City',
      key: [
        {
          id: '0', // acts as primary key, should be unique and non-empty string
          label: 'Delhi',
          value: '',
          selected: false,
        },
        {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Haryana',
          value: '',
          selected: false,
        },
        {
          id: '2', // acts as primary key, should be unique and non-empty string
          label: 'Uttar Pradesh',
          value: '',
          selected: false,
        },
      ],
    },
    {
      type: 'year',
      name: 'Year',
      key: [
        {
          id: '0', // acts as primary key, should be unique and non-empty string
          label: '2022',
          value: '',
          selected: false,
        },
        {
          id: '1',
          label: '2021',
          value: 'option2',
          selected: false,
        },
        {
          id: '2', // acts as primary key, should be unique and non-empty string
          label: '2020',
          value: 'option1',
          selected: false,
        },
        {
          id: '3',
          label: '2019',
          value: 'option2',
          selected: false,
        },
        {
          id: '4', // acts as primary key, should be unique and non-empty string
          label: '2018',
          value: '',
          selected: false,
        },
        {
          id: '5',
          label: '2017',
          value: 'option2',
          selected: false,
        },
        {
          id: '6', // acts as primary key, should be unique and non-empty string
          label: '2016',
          value: 'option1',
          selected: false,
        },
        {
          id: '7',
          label: '2015',
          value: 'option2',
          selected: false,
        },
        {
          id: '8', // acts as primary key, should be unique and non-empty string
          label: '2014',
          value: '',
          selected: false,
        },
        {
          id: '9',
          label: '2013',
          value: 'option2',
          selected: false,
        },
      ],
    },
    {
      type: 'owner',
      name: 'Ownership',
      key: [
        {
          id: '0', // acts as primary key, should be unique and non-empty string
          label: '1st Owner',
          value: '',
          selected: false,
        },
        {
          id: '1',
          label: '2nd Owner',
          value: 'option2',
          selected: false,
        },
        {
          id: '2', // acts as primary key, should be unique and non-empty string
          label: '3rd Owner',
          value: 'option1',
          selected: false,
        },
        {
          id: '3',
          label: '4th Owner',
          value: 'option2',
          selected: false,
        },
      ],
    },
  ]);
  const [stockArray, setStockArray] = useState([{
    'brand_name': 'Maruti Suzuki',
    'model': [
      { 'name': 'Swift', 'selected': 'false' },
      { 'name': 'EECO', 'selected': 'false' },
      { 'name': 'Zen estilo', 'selected': 'false' },
      { 'name': 'Ciaz', 'selected': 'false' },
      { 'name': 'swift dizire', 'selected': 'false' },
      { 'name': 'Dizire', 'selected': 'false' },
      { 'name': 'XL6', 'selected': 'false' },
      { 'name': 's-presso', 'selected': 'false' },
      { 'name': 'CELERIO', 'selected': 'false' },
      { 'name': 'A-STAR', 'selected': 'false' },
      { 'name': 'Baleno', 'selected': 'false' },
      { 'name': 'BREZZA', 'selected': 'false' },
      { 'name': 'Grand Vitara', 'selected': 'false' },
      { 'name': 'ALTO ', 'selected': 'false' },
      { 'name': 'IGNIS', 'selected': 'false' },
      { 'name': 'ertiga', 'selected': 'false' },
      { 'name': 'alto k10', 'selected': 'false' },
      { 'name': 'CIAZ', 'selected': 'false' },
      { 'name': 'ALTO 800', 'selected': 'false' },
      { 'name': 'Wagon R', 'selected': 'false' },
      { 'name': 'wagon R Stingray', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Hyundai',
    'model': [
      { 'name': 'i10', 'selected': 'false' },
      { 'name': 'GRAND i10', 'selected': 'false' },
      { 'name': 'GRAND i10 NIOS', 'selected': 'false' },
      { 'name': 'VENUE', 'selected': 'false' },
      { 'name': 'I20', 'selected': 'false' },
      { 'name': 'ELITE I20', 'selected': 'false' },
      { 'name': 'i20 N Line', 'selected': 'false' },
      { 'name': 'santro xing', 'selected': 'false' },
      { 'name': 'tucson', 'selected': 'false' },
      { 'name': 'accent', 'selected': 'false' },
      { 'name': 'XCENT', 'selected': 'false' },
      { 'name': 'AURA', 'selected': 'false' },
      { 'name': 'VERNA ', 'selected': 'false' },
      { 'name': 'santa fe', 'selected': 'false' },
      { 'name': 'Creta', 'selected': 'false' },
      { 'name': 'Alcazar', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Mahindra ',
    'model': [
      { 'name': 'Quanto', 'selected': 'false' },
      { 'name': 'verito ', 'selected': 'false' },
      { 'name': 'XYLO', 'selected': 'false' },
      { 'name': 'SCORPIO', 'selected': 'false' },
      { 'name': 'XUV 300', 'selected': 'false' },
      { 'name': 'XUV500', 'selected': 'false' },
      { 'name': 'XUV700', 'selected': 'false' },
      { 'name': 'THAR', 'selected': 'false' },
      { 'name': 'Alturas G4', 'selected': 'false' },
      { 'name': 'KUV 100', 'selected': 'false' },
      { 'name': 'TUV 300', 'selected': 'false' },
      { 'name': 'Marazzo', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'TATA',
    'model': [
      { 'name': 'SAFARI', 'selected': 'false' },
      { 'name': 'NANO', 'selected': 'false' },
      { 'name': 'BOLT', 'selected': 'false' },
      { 'name': 'NEXON', 'selected': 'false' },
      { 'name': 'harrier ', 'selected': 'false' },
      { 'name': 'Tiago', 'selected': 'false' },
      { 'name': 'tigor', 'selected': 'false' },
      { 'name': 'altroz', 'selected': 'false' },
      { 'name': 'PUNCH', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Honda',
    'model': [
      { 'name': 'CITY', 'selected': 'false' },
      { 'name': 'AMAZE', 'selected': 'false' },
      { 'name': 'B RV', 'selected': 'false' },
      { 'name': 'BRIO', 'selected': 'false' },
      { 'name': 'WR-V ', 'selected': 'false' },
      { 'name': 'Mobilio', 'selected': 'false' },
      { 'name': 'jazz', 'selected': 'false' },
      { 'name': 'civic ', 'selected': 'false' },
      { 'name': 'accord', 'selected': 'false' },
      { 'name': 'CR-V', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Ford',
    'model': [
      { 'name': 'Freestyle', 'selected': 'false' },
      { 'name': 'Endeavour', 'selected': 'false' },
      { 'name': 'FIGO             ', 'selected': 'false' },
      { 'name': 'FIGO', 'selected': 'false' },
      { 'name': 'ASPIRE', 'selected': 'false' },
      { 'name': 'ECOSPORTS', 'selected': 'false' },
      { 'name': 'MUSTANG', 'selected': 'false' },
      { 'name': 'Fiesta', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'MG HECTOR',
    'model': [
      { 'name': 'HECTOR', 'selected': 'false' },
      { 'name': 'HECTOR PLUS', 'selected': 'false' },
      { 'name': 'Astor', 'selected': 'false' },
      { 'name': 'Gloster', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Kia',
    'model': [
      { 'name': 'seltos', 'selected': 'false' },
      { 'name': 'sonet', 'selected': 'false' },
      { 'name': 'Carnival', 'selected': 'false' },
      { 'name': 'carens ', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Toyota',
    'model': [
      { 'name': 'camry', 'selected': 'false' },
      { 'name': 'hilux', 'selected': 'false' },
      { 'name': 'corolla altis', 'selected': 'false' },
      { 'name': 'yaris', 'selected': 'false' },
      { 'name': 'land Cruiser Prado (AT ,P', 'selected': 'false' },
      { 'name': 'land Cruiser Prado(AT,D)', 'selected': 'false' },
      { 'name': 'Land Cruiser(at,d)', 'selected': 'false' },
      { 'name': 'VELLFIRE', 'selected': 'false' },
      { 'name': 'URBAN CRUISER HYRYDER', 'selected': 'false' },
      { 'name': 'glanza', 'selected': 'false' },
      { 'name': 'fortuner', 'selected': 'false' },
      { 'name': 'ETIOS', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Skoda',
    'model': [
      { 'name': 'OCTAVIA', 'selected': 'false' },
      { 'name': 'SUPERB', 'selected': 'false' },
      { 'name': 'rapid ', 'selected': 'false' },
      { 'name': 'SLAVIA', 'selected': 'false' },
      { 'name': 'KODIAQ', 'selected': 'false' },
      { 'name': 'YETI', 'selected': 'false' },
      { 'name': 'KUSHAQ ', 'selected': 'false' },
      { 'name': 'LAURA', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Nissan',
    'model': [
      { 'name': 'SUNNY', 'selected': 'false' },
      { 'name': 'terran', 'selected': 'false' },
      { 'name': 'datsun g', 'selected': 'false' },
      { 'name': 'MICR', 'selected': 'false' },
      { 'name': 'MICRA activ', 'selected': 'false' },
      { 'name': 'teana', 'selected': 'false' },
      { 'name': 'X-TRAI', 'selected': 'false' },
      { 'name': 'EVALIA', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Audi',
    'model': [
      { 'name': 'A4', 'selected': 'false' },
      { 'name': 'A6', 'selected': 'false' },
      { 'name': 'A3', 'selected': 'false' },
      { 'name': 'A7', 'selected': 'false' },
      { 'name': 'A8 ', 'selected': 'false' },
      { 'name': 'Q2', 'selected': 'false' },
      { 'name': 'Q4', 'selected': 'false' },
      { 'name': 'Q6', 'selected': 'false' },
      { 'name': 'Q8', 'selected': 'false' },
      { 'name': 'Q3', 'selected': 'false' },
      { 'name': 'Q3 ', 'selected': 'false' },
      { 'name': 'Q5', 'selected': 'false' },
      { 'name': 'Q7', 'selected': 'false' }
    ]
  },
  {
    'brand_name': 'Chevrolet',
    'model': [
      { 'name': 'BEAT', 'selected': 'false' },
      { 'name': 'optra', 'selected': 'false' },
      { 'name': 'CRUZE', 'selected': 'false' },
      { 'name': 'SPARK', 'selected': 'false' },
      { 'name': 'CAPTIVA', 'selected': 'false' },
      { 'name': 'enjoy', 'selected': 'false' },
      { 'name': 'aveo', 'selected': 'false' },
      { 'name': 'aveo uva', 'selected': 'false' }
    ]
  }
  ],)
  const [searchText, setSearchText] = useState('');
  const [showMessage,setShowMessage] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selected_group, setSelectedGroup] = useState(radioButtons);
  const [isBrandBodels, SetIsBrandModels] = useState(true);
  const [filteredModels, setFilteredModels] = useState(models);
  const [ModelArray, setModelArray] = useState([]);
  const [errortext, setErrortext] = useState('')
  const [paramerter, setParameter] = useState({
    change: '',
    model: [],
    type: '',
    transmission: '',
    km: '',
    regisCity: '',
    year: '',
    owner: '',
    user_id: '',
  });
  const [keyboardOffset, setKeyboardOffset] = useState(0);

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
    setKeyboardOffset(event.endCoordinates.height);
  });

  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardOffset(0);
  });

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);
  

  const filterModels = text => {
    const filtered = selected_group[0].models.filter(brand => {
      const filteredModels = brand.model.filter(model =>
        model.name.toLowerCase().includes(text.toLowerCase()),
      );
      return filteredModels.length > 0;
    });

    let mainArray = [...selected_group];
    // console.log("filtered = > ",filtered)
    if (filtered.length > 0) {
      setErrortext("");
      mainArray[0].models = filtered;
    } else {
      setErrortext("Oops Car not found")
      // console.log("agya")
      mainArray[0].models = stockArray
      // console.log("main array = > ",radioButtons[0].models)
    }

    setSelectedGroup(mainArray);
  };

  const resetFilters = async()=>{
    try{
      const resp = AsyncStorage.removeItem('filters');
      // console.log('resp =>',resp);
      setShowMessage(true);
      setParam({});
      setTimeout(()=>{setShowMessage(false)},3000)
      
    }catch(e){
      console.log("error in reset your filters")
    }
  }
  useEffect(() => {
    let dummy = paramerter;
    selected_group.forEach(item => {
      if (item.type === 'model' && item.models) {
        item.models.forEach(val => {
          val.model.forEach(dat => {
            if (dat.selected == true) {
              dummy.model.push(dat.name);
            }
          })
          const uniqueValues = Array.from(new Set(dummy.model));
          dummy.model = uniqueValues;
        });

      } else if (item.type === 'type' && item.key) {
        const selectedType = item.key.find(type => type.selected);
        if (selectedType) {
          dummy.type = selectedType.label;
        }
      } else if (item.type === 'transmission' && item.key) {
        const selectedTransmission = item.key.find(
          transmission => transmission.selected,
        );
        if (selectedTransmission) {
          dummy.transmission = selectedTransmission.label;
        }
      } else if (item.type === 'km' && item.key) {
        const selectedKm = item.key.find(km => km.selected);
        if (selectedKm) {
          dummy.km = selectedKm.label;
        }
      } else if (item.type === 'regiscity' && item.key) {
        const selectedCity = item.key.find(city => city.selected);
        // console.log("selected city ",selectedCity)
        if (selectedCity) {
          dummy.regisCity = selectedCity.label == "Delhi" ? "DL" : selectedCity.label == "Haryana" ? "Hr":"UP";
        }
      } else if (item.type === 'year' && item.key) {
        const selectedYear = item.key.find(year => year.selected);
        if (selectedYear) {
          dummy.year = selectedYear.label;
        }
      } else if (item.type === 'owner' && item.key) {
        const selectedOwner = item.key.find(owner => owner.selected);
        if (selectedOwner) {
          dummy.owner = selectedOwner.label;
        }
      }
    });
    // console.log("dummy =>", dummy.regisCity)
    setParam(dummy);
  }, [selected_group]);

  const updatedModelArray = newParameter => {
    // console.log("data =>",newParameter[0].models[0].model);
    setSelectedGroup(newParameter);

  };



  React.useEffect(() => {
    filterModels(searchText);
  }, [searchText]);

  return (
    <SafeAreaView
      style={[
        globalStyles.flexBox,
        {
          flex: 1,
          position: 'absolute',
          bottom: 10,
          width: width,
          backgroundColor: 'transparent',
          height: height - (keyboardOffset+10),
        },
      ]}>
      <View
        style={[
          globalStyles.columnContainer,
          { width: '100%', height: '100%', backgroundColor: '#FFFFFF' },
        ]}>
        <TouchableOpacity
          onPress={toggleModal}
          style={[
            {
              width: '100%',
              backgroundColor: TOP_TAB_TEXT_COLOR,
              height: 40,
              paddingHorizontal: 10,
            },
            globalStyles.flexBoxAlign,
            globalStyles.rowContainer,
          ]}
          activeOpacity={0.9}>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons
              size={30}
              name="chevron-down"
              color={'#FFF'}
            />
          </TouchableOpacity>
          <View
            style={[
              globalStyles.rowContainer,
              {
                justifyContent: 'space-between',
                width: '90%',
                paddingHorizontal: 10,
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[globalStyles.text, { fontSize: EXTRA_LARGE_FONT_SIZE }]}>
              Filter
            </Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={[globalStyles.text, { fontWeight: '600' }]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {showMessage && 
          <View style={[{backgroundColor:'green',padding:10},globalStyles.flexBox]}>
            <Text style={{fontWeight:'800',fontSize:16,color:'white'}}>Succesfully reset your filters</Text>
          </View>
        }
        {/* <RadioGroup
            accessibilityLabel='asdfgh'
            radioButtons={radioButtons[0].fuel_type}
            onPress={(e) => { console.log(e); setSelectedId(e) }}
            selectedId={selectedId}
          /> */}
        <View
          style={[globalStyles.filterMainContainer, globalStyles.rowContainer]}>
          <ScrollView style={[globalStyles.filterLeftContainer]}>
            {radioButtons.map((item, ind) => (
              <TouchableOpacity
                style={[
                  globalStyles.filterLeftTextContainer,
                  globalStyles.flexBox,
                  {
                    backgroundColor:
                      ind == selectedId ? BLUE_COLOR : 'transparent',
                  },
                ]}
                onPress={() => {
                  setSelectedId(ind),
                    setSelectedGroup(radioButtons),
                    ind >= 1 ? SetIsBrandModels(false) : SetIsBrandModels(true);
                }}
                key={ind}>
                <Text
                  style={[
                    globalStyles.filterLeftText,
                    { color: selectedId == ind ? '#fff' : BLUE_COLOR },
                  ]}
                  key={ind}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            nestedScrollEnabled={true}
            style={[globalStyles.filterRightContainer]}>
            <View
              style={[
                { width: '100%', padding: 10, backgroundColor: 'transparent' },
                globalStyles.flexBoxAlign,
              ]}>
              {isBrandBodels && (
                <View style={[{ width: '100%', marginBottom: 100 }]}>
                  <View
                    style={[
                      {
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingVertical: 10,
                        overflow: 'hidden',
                      },
                      globalStyles.flexBox,
                    ]}>
                    <TextInput
                      style={[styles.textInput]}
                      placeholder="Search"
                      defaultValue={searchText}
                      onChangeText={text => setSearchText(text)}
                    />
                  </View>
                  {errortext != "" ? <Text style={{ fontWeight: '600', padding: 10 }}>{errortext}</Text> : <></>}
                  {selected_group[0].models.map((item, i) => (
                    <MultipleSelect
                      mainIndex={i}
                      allData={selected_group}
                      setUpdatedModelArray={updatedModelArray}
                      data={selected_group}
                      key={i}
                    />
                  ))}
                </View>
              )}
              <RadioGroup
                radioButtons={selected_group}
                index={selectedId}
                onChange={updatedData => {
                  setSelectedGroup(updatedData);
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ position: 'absolute', backgroundColor: 'transparent', width: width, height: 60, bottom: 0 }}>
          <TouchableOpacity activeOpacity={0.9} style={[globalStyles.flexBox]} onPress={callGetData}>
            <View
              style={[
                {
                  width: '80%',
                  height: 40,
                  backgroundColor: BLUE_COLOR,
                  borderBottomLeftRadius: CONTAINER_BORDER,
                  borderTopRightRadius: CONTAINER_BORDER,
                  marginTop: 10,
                },
                globalStyles.flexBox,
              ]}>
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: PALATINO_BOLD_FONT,
                  fontSize: LARGE_FONT_SIZE,
                  fontWeight: '700',
                }}>
                Apply Filters
              </Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyBottomSheet;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 10,
  },
  textInput: {
    height: 40,
    width: '95%',
    // padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    // marginBottom: keyboardOffset 
    //   paddingLeft: 40
  },
});
