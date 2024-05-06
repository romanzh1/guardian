// TODO: ЭТО КОПИПАСТА С ФОРМ, ТРЕБУЕТСЯ ПЕРЕРАБОТАТЬ

const primary = '#5D67E1';
const secondary = '#A6B4BF';
const white = '#FFFFFF';
const black = '#000000';
const secondaryText = '#33384C';

const gray = '#E1EAEF';
const darkGray = '#798E9F';
const secondaryBackground = '#F8F9FD';
const errorInput = '#F8002D';

const paletteInfo = {
  primary: {
    main: primary,
    background: white,
  },
  secondary: {
    main: secondary,
  },
  scrollbar: {
    track: '#EFEAF1',
    thumb: '#B5B5B5',
    corner: '#EFEAF1',
  },
  createIssueHeader: {
    text: secondaryText,
    background: '#5D67E114',
  },
  select: {
    main: secondary,
    hover: '#556877',
    active: primary,
    error: '#F8002D',
    label: secondaryText,
    disabledText: '#556877',
    disabledBg: '#F7F7F7',
  },
  input: {
    main: secondary,
    hover: '#556877',
    active: primary,
    error: '#F8002D',
    label: secondaryText,
    disabledText: '#556877',
    disabledBg: '#F7F7F7',
    background: white,
    placeholder: '#a6a6a6',
  },
  issueList: {
    background: '#5D67E11A',
    textTitle: '#0172DB',
    border: secondary,
  },
  issuePage: {
    headerText: secondaryText,
    headerBackground: white,
    sidebarBackground: secondaryBackground,
  },
  authorization: {
    background: '#5d67e112',
  },
  issueStatus: {
    info: {
      text: white,
      border: '#3AA0FF',
    },
    warning: {
      text: white,
      border: '#FFB058',
    },
    success: {
      text: white,
      border: '#55C173',
    },
    error: {
      text: white,
      border: '#F75067',
    },
  },
  issueTransition: {
    info: {
      label: '#3AA0FF',
      background: '#f2f3fd',
    },
    warning: {
      label: '#FFB058',
      background: '#f2f3fd',
    },
    success: {
      label: '#55C173',
      background: '#f2f3fd',
    },
    error: {
      label: '#F75067',
      background: '#f2f3fd',
    },
  },
  markdownEditor: {
    main: secondary,
    hover: '#556877',
    active: primary,
  },
  code: {
    border: '#798E9F',
    background: '#E1EAEF',
  },
  fieldItem: {
    background: '#EFF0FC',
  },
  colorRadio: {
    border: gray,
    checkedBorder: darkGray,
  },
  menuItem: {
    hover: '#EFF0FC',
    icon: secondary,
  },
  tabs: {
    background: secondaryBackground,
    indicator: '#635ee7',
  },
  table: {
    headerBackground: '#f2f3fc',
  },
  tab: {
    icon: secondary,
    selectedIcon: primary,
    border: '#F2F3FD',
  },
  adminSidebar: {
    border: '#f0f3f4',
    background: secondaryBackground,
  },
  customFieldCard: {
    border: '#E1E6EA',
  },
  modal: {
    titleBackground: secondaryBackground,
  },
  listItem: {
    hoverBackground: '#f7f7fd',
    border: '#F0F3F4',
    activeBorder: '#c1c1c1',
  },
  expandableBlock: {
    background: '#F8F9FD',
    button: '#5D67E11A',
    icon: secondary,
    hover: '#5D67E123',
  },
  chip: {
    background: '#EFF0FC',
    deleteIcon: '#7474B4',
  },
  schema: {
    header: {
      background: '#5d67e11a',
    },
  },
  profile: {
    status: {
      background: '#C2FEDA',
    },
    delimiter: {
      color: '#F0F2F4',
    },
  },
  richFilter: {
    border: '1px solid #ccc',
    chip: {
      text: {
        hover: '#5D67E1',
      },
    },
    calendar: {
      selectButton: '#ECEDFD',
      main: '#AF52DE',
    },
  },
  alerts: {
    success: { background: '#E1F8E9', icon: '#6BDD91', text: secondaryText },
    error: { background: '#FFEBEE', icon: '#FF4465', text: secondaryText },
    warning: { background: '', icon: '', text: secondaryText },
    info: { background: '#DBEEFF', icon: '#4BA8FE', text: secondaryText },
    default: { background: primary, icon: white, text: white },
  },
  statusColor: {
    newStatus: '#3AA0FF',
    development: '#9501DB',
    preProd: '#00B1B1',
    production: '#2FCF66',
    closing: '#F8A038',
    archived: '#334B5E',
    unknown: '#5E5E5E',
  },
  filledInput: {
    main: secondary,
    active: primary,
    background: '#F7F7FD',
    hoverBg: '#EBEBFA',
    focusedBg: '#EBEBFA',
    focusedBorder: '',
    placeholder: darkGray,
    disabled: '#E8E6F8',
    text: black,
    error: errorInput,
  },
  parentsSelectColors: {
    background: '#F7F7FD',
    hoverBg: '#EBEBFA',
    focusedBg: '#EBEBFA',
    border: '#a7b4c0',
    focusedBorder: '#7881e7',
    focusedLabel: '#5d68e1',
    label: '#5e5e64',
    placeholder: darkGray,
    helpText: '#d32f2f',
    disabled: '#E8E6F8',
    text: black,
    arrow: '#717174',
  },
  sliderColor: {
    full: '#D20026',
    fullBackground: '#FF8FA3',
    fullShadow: '-200px  0 0 200px #d20026',
    middle: '#d2a100',
    middleBackground: '#ffe98f',
    middleShadow: '-200px  0 0 200px #d2a800',
    normal: '#29B157',
    normalBackground: '#A6EBBD',
    normalShadow: '-200px  0 0 200px #29b157',
  },
  configStatusColor: {
    newColor: '#EDDBFF',
    newTextColor: '#9501DB',
    exploitation: '#DBEEFF',
    exploitationTextColor: '#0172DB',
    employee: '#EB00C6',
    employeeTextColor: '#FFDEFA',
    movement: '#F0F0F0',
    movementTextColor: '#434343',
    repair: '#E4F7F7',
    repairTextColor: '#00B1B1',
    warehouse: '#D0FFE0',
    warehouseTextColor: '#00B63F',
    disposed: '#FFEECC',
    disposedTextColor: '#FE8D07',
    error: '#FFEBEE',
    errorTextColor: '#D20026',
    unknown: '#5E5E5E',
    unknownTextColor: '#F4F4F4',
    broken: '#f6e29a',
    brokenTextColor: '#a67e03',
  },
};

export const palette = {
  light: {
    palette: paletteInfo,
  },
  dark: {
    palette: {
      ...paletteInfo,
    },
  },
};
