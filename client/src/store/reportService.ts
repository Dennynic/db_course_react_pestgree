import { $host } from './lib';
import { Payment } from '../models';

const getReport = async ({ id, data }: { id: number; data?: any }) => {
  console.log('Data in service', data);
  const response = await $host.get<any>(`/report/${id}`, { params: data });

  return response.data[0];
};

const ReportService = {
  getReport,
};

export default ReportService;
