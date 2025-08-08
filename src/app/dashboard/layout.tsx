import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

type DashboardType = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardType) {
  return (
    <ProtectedRoute>
      <Header />
      <main className='max-w-6xl mx-auto mt-10 px-4'>{children}</main>
    </ProtectedRoute>
  );
}
