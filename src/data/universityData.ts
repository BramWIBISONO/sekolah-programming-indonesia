export interface University {
  name: string;
  shortName: string;
  logoAssetKey: string;
}

export const UNIVERSITIES_DATA: University[] = [
  { name: 'University of Malaya', shortName: 'UM', logoAssetKey: 'UNIVERSITY_MALAYA' },
  { name: 'National University of Taiwan', shortName: 'NTU', logoAssetKey: 'NATIONAL_UNIVERSITY_TAIWAN' },
  { name: 'Wuhan University', shortName: 'WHU', logoAssetKey: 'WUHAN_UNIVERSITY' },
  { name: 'The Hong Kong Polytechnic University', shortName: 'PolyU', logoAssetKey: 'HONG_KONG_POLYTECHNIC' },
  { name: 'BINUS University', shortName: 'BINUS', logoAssetKey: 'BINUS_UNIVERSITY' },
  { name: 'UBM', shortName: 'UBM', logoAssetKey: 'UBM' },
  { name: 'Zhejiang University', shortName: 'ZJU', logoAssetKey: 'ZHEJIANG_UNIVERSITY' },
  { name: 'Zhejiang University of Science and Technology', shortName: 'ZUST', logoAssetKey: 'ZUST' },
  { name: 'Singapore University of Technology and Design', shortName: 'SUTD', logoAssetKey: 'SUTD' },
  { name: 'RMIT University', shortName: 'RMIT', logoAssetKey: 'RMIT' },
];
