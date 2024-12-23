import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users } from 'lucide-react';

type Transaction = {
  type: 'income' | 'expense';
  amount: number;
  description: string | null;
  date: string;
  customer: {
    name: string;
  } | null;
};

type DashboardStatsProps = {
  transactions: Transaction[];
  customerCount: number;
};

export function DashboardStats({ transactions, customerCount }: DashboardStatsProps) {
  const calculateStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Toplam Gelir</p>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(stats.totalIncome)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Toplam Gider</p>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(stats.totalExpense)}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Net Bakiye</p>
            <p className={`text-xl font-semibold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(stats.balance)}
            </p>
          </div>
          <div className={`${stats.balance >= 0 ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
            <DollarSign className={`h-6 w-6 ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Toplam Müşteri</p>
            <p className="text-xl font-semibold text-blue-600">{customerCount}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}