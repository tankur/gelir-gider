import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string | null;
  date: string;
  customer: {
    name: string;
  } | null;
};

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Son İşlemler</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-6 w-6 text-red-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.description || (transaction.type === 'income' ? 'Gelir' : 'Gider')}
                  </p>
                  {transaction.customer && (
                    <p className="text-sm text-gray-500">
                      Müşteri: {transaction.customer.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}