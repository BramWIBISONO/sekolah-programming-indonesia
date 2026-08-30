export interface University {
  name: string;
  shortName: string;
  logoAssetKey: string;
  url: string;
}

export const UNIVERSITIES_DATA: University[] = [
  { 
    name: 'University of Malaya', 
    shortName: 'UM', 
    logoAssetKey: 'UNIVERSITY_MALAYA',
    url: 'https://www.um.edu.my/'
  },
  { 
    name: 'National University of Taiwan', 
    shortName: 'NTU', 
    logoAssetKey: 'NATIONAL_UNIVERSITY_TAIWAN',
    url: 'https://www.ntu.edu.tw/'
  },
  { 
    name: 'Wuhan University', 
    shortName: 'WHU', 
    logoAssetKey: 'WUHAN_UNIVERSITY',
    url: 'https://en.whu.edu.cn/'
  },
  { 
    name: 'The Hong Kong Polytechnic University', 
    shortName: 'PolyU', 
    logoAssetKey: 'HONG_KONG_POLYTECHNIC',
    url: 'https://www.polyu.edu.hk/'
  },
  { 
    name: 'BINUS University', 
    shortName: 'BINUS', 
    logoAssetKey: 'BINUS_UNIVERSITY',
    url: 'https://binus.ac.id/'
  },
  { 
    name: 'Universitas Bunda Mulia', 
    shortName: 'UBM', 
    logoAssetKey: 'UBM',
    url: 'https://www.ubm.ac.id/'
  },
  { 
    name: 'Zhejiang University', 
    shortName: 'ZJU', 
    logoAssetKey: 'ZHEJIANG_UNIVERSITY',
    url: 'https://www.zju.edu.cn/english/'
  },
  { 
    name: 'Zhejiang University of Science and Technology', 
    shortName: 'ZUST', 
    logoAssetKey: 'ZUST',
    url: 'https://www.zust.edu.cn/'
  },
  { 
    name: 'Singapore University of Technology and Design', 
    shortName: 'SUTD', 
    logoAssetKey: 'SUTD',
    url: 'https://www.sutd.edu.sg/'
  },
  { 
    name: 'RMIT University', 
    shortName: 'RMIT', 
    logoAssetKey: 'RMIT',
    url: 'https://www.rmit.edu.au/'
  },
];
