import React from 'react';
import s from './style.module.css';

const paths = {
  external: <path d="M6 18 18 6M6 6h12v12"/>,
  down: <path d="M12 4v16m-6-6 6 6 6-6"/>,
  up: <path d="M12 20V4m-6 6 6-6 6 6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  address: <><circle cx="12" cy="12" r="6"/><path d="M12 2v5m0 10v5M2 12h5m10 0h5"/></>,
  score: <><path d="M4 18a9 9 0 1 1 16 0M12 12l5-5"/><circle cx="12" cy="12" r="1"/></>,
  flag: <path d="M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>,
  access: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 21h8m-4-5v5m-5-11h10"/></>,
  warning: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v.1"/></>,
  connection: <><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="m8 11 8-5m-8 7 8 5"/></>,
};

export default function Icon({name, className = ''}) {
  return <svg className={`${s.icon} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
