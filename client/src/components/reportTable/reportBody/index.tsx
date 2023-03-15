import React, { useState, useEffect } from 'react';
import ReportCountClient from '../reportCountClient';
import ReportDebt from '../reportDebt';
import ReportMinDebt from '../reportMinDebt';

interface IProps {
  type: number;
}

export default function ReportBody({ type }: IProps) {
  switch (type) {
    case 1:
      return <ReportDebt id={type} />;
      break;
    case 2:
      return <ReportCountClient id={type} />;
      break;
    case 3:
      return <ReportMinDebt id={type} />;
      break;
    default:
      return <>Не верный номер отчета</>;
  }
}
