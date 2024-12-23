import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, PlusCircle, User2 } from 'lucide-react';
import { AddTransactionModal } from './AddTransactionModal';

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

type TransactionListProps = {
  transactions: Transaction[];
  onRefresh: () => void;
};

export function TransactionList({ transactions, onRefresh }: TransactionListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatTransactionDescription = (transaction: Transaction) => {
    const type = transaction.type === 'income' ? 'Tahsilat' : 'Ödeme';
    const description = transaction.description ? ` - ${transaction.description}` : '';
    const customer = transaction.customer ? ` - ${transaction.customer.name}` : '';
    return `${type}${description}${customer}`;
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Gelir/Gider</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Yeni İşlem
            </button>
            <button
              onClick={onRefresh}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Yenile
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
                    ) : (
                      <ArrowDownCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {formatTransactionDescription(transaction)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {transaction.customer && (
                            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                              <User2 className="h-3 w-3 text-gray-500" />
                              <span className="text-xs font-medium text-gray-600">
                                {transaction.type === 'income' ? 'Ödeyen:' : 'Alıcı:'} {transaction.customer.name}
                              </span>
                            </div>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onRefresh}
      />
    </>
  );
}