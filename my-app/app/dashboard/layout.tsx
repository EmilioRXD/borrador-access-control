import { PropsWithChildren } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import 'boxicons/css/boxicons.min.css';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
    {children}
    </>
  );
}
