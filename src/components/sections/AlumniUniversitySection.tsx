import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { asset } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';

const ALUMNI_UNIVERSITIES = [
  { name: 'University of Malaya', url: 'https://www.um.edu.my/', asset: asset('assets/alumni/universities/university-of-malaya.png') },
  { name: 'National University of Taiwan', url: 'https://www.ntu.edu.tw/', asset: asset('assets/alumni/universities/national-university-of-taiwan.png') },
  { name: 'Wuhan University', url: 'https://en.whu.edu.cn/', asset: asset('assets/alumni/universities/wuhan-university.png') },
  { name: 'The Hong Kong Polytechnic University', url: 'https://www.polyu.edu.hk/', asset: asset('assets/alumni/universities/hong-kong-polytechnic.png') },
  { name: 'BINUS University', url: 'https://binus.ac.id/', asset: asset('assets/alumni/universities/binus-university.png') },
  { name: 'Universitas Bunda Mulia', url: 'https://www.ubm.ac.id/', asset: asset('assets/alumni/universities/universitas-bunda-mulia.png') },
  { name: 'Zhejiang University', url: 'https://www.zju.edu.cn/english/', asset: asset('assets/alumni/universities/zhejiang-university.png') },
  { name: 'Zhejiang University of Science and Technology', url: 'https://www.zust.edu.cn/', asset: asset('assets/alumni/universities/zust.png') },
  { name: 'Singapore University of Technology and Design', url: 'https://www.sutd.edu.sg/', asset: asset('assets/alumni/universities/sutd.png') },
  { name: 'RMIT University', url: 'https://www.rmit.edu.au/', asset: asset('assets/alumni/universities/rmit.png') },
  { name: 'Sampoerna Academy', url: 'https://www.sampoernauniversity.ac.id//', asset: asset('assets/alumni/universities/Logo_USBI.webp') },
  { name: 'National Yang Ming Chiao Tung University', url: 'https://www.nycu.edu.tw/', asset: asset('assets/alumni/universities/national-yang-ming-chiao-tung-university.png') },
  { name: 'Monash University', url: 'https://www.monash.edu/', asset: asset('assets/alumni/universities/monash-university.png') },
  { name: 'Anhui University', url: 'https://www.ahu.edu.cn/', asset: asset('assets/alumni/universities/anhui-university.png') }
];

export const AlumniUniversitySection: React.FC = () => {
  // Hidden until alumni admission records are officially verified by the SPI academic team.
  return null;
};
