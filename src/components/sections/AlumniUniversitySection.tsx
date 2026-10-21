import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { asset } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';

const ALUMNI_UNIVERSITIES = [
  { name: 'University of Malaya', url: 'https://www.um.edu.my/', asset: asset('assets/alumni/universities/university-of-malaya.webp') },
  { name: 'National University of Taiwan', url: 'https://www.ntu.edu.tw/', asset: asset('assets/alumni/universities/national-university-of-taiwan.webp') },
  { name: 'Wuhan University', url: 'https://en.whu.edu.cn/', asset: asset('assets/alumni/universities/wuhan-university.webp') },
  { name: 'The Hong Kong Polytechnic University', url: 'https://www.polyu.edu.hk/', asset: asset('assets/alumni/universities/hong-kong-polytechnic.webp') },
  { name: 'BINUS University', url: 'https://binus.ac.id/', asset: asset('assets/alumni/universities/binus-university.webp') },
  { name: 'Universitas Bunda Mulia', url: 'https://www.ubm.ac.id/', asset: asset('assets/alumni/universities/universitas-bunda-mulia.webp') },
  { name: 'Zhejiang University', url: 'https://www.zju.edu.cn/english/', asset: asset('assets/alumni/universities/zhejiang-university.webp') },
  { name: 'Zhejiang University of Science and Technology', url: 'https://www.zust.edu.cn/', asset: asset('assets/alumni/universities/zust.webp') },
  { name: 'Singapore University of Technology and Design', url: 'https://www.sutd.edu.sg/', asset: asset('assets/alumni/universities/sutd.webp') },
  { name: 'RMIT University', url: 'https://www.rmit.edu.au/', asset: asset('assets/alumni/universities/rmit.webp') },
  { name: 'Sampoerna Academy', url: 'https://www.sampoernauniversity.ac.id//', asset: asset('assets/alumni/universities/Logo_USBI.webp') },
  { name: 'National Yang Ming Chiao Tung University', url: 'https://www.nycu.edu.tw/', asset: asset('assets/alumni/universities/national-yang-ming-chiao-tung-university.webp') },
  { name: 'Monash University', url: 'https://www.monash.edu/', asset: asset('assets/alumni/universities/monash-university.webp') },
  { name: 'Anhui University', url: 'https://www.ahu.edu.cn/', asset: asset('assets/alumni/universities/anhui-university.webp') }
];

export const AlumniUniversitySection: React.FC = () => {
  // Hidden until alumni admission records are officially verified by the SPI academic team.
  return null;
};
