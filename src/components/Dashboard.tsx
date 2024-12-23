import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, DollarSign, LogOut } from 'lucide-react';
import { CustomerList } from './CustomerList';
import { TransactionList } from './TransactionList';
import { DashboardStats } from './DashboardStats';
import { RecentTransactions } from './RecentTransactions';

export function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const loadData = async () => {
    const { data: customersData } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    
    const { data: transactionsData } = await supabase
      .from('transactions')
      .select('*, customers(*)')
      .order('date', { ascending: false });

    if (customersData) setCustomers(customersData);
    if (transactionsData) setTransactions(transactionsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`${
                    activeTab === 'customers'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Müşteriler
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`${
                    activeTab === 'transactions'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Gelir/Gider
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <DashboardStats 
                  transactions={transactions}
                  customerCount={customers.length}
                />
                <RecentTransactions transactions={transactions} />
              </div>
            )}
            {activeTab === 'customers' && (
              <CustomerList customers={customers} onRefresh={loadData} />
            )}
            {activeTab === 'transactions' && (
              <TransactionList transactions={transactions} onRefresh={loadData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}