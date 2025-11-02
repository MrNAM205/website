import React, { useState, useEffect } from 'react';

interface CreditDispute {
  disputeId: string;
  creditor: string;
  date: string;
  status: 'pending' | 'resolved' | 'dismissed';
  reason: string;
}

export const CreditDisputeDashboard: React.FC = () => {
  const [disputes, setDisputes] = useState<CreditDispute[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockDisputes: CreditDispute[] = [
      { disputeId: 'CD-001', creditor: 'Equifax', date: '2025-10-28', status: 'pending', reason: 'Incorrect information' },
      { disputeId: 'CD-002', creditor: 'Experian', date: '2025-10-25', status: 'resolved', reason: 'Fraudulent charge' },
      { disputeId: 'CD-003', creditor: 'TransUnion', date: '2025-10-22', status: 'dismissed', reason: 'Lack of evidence' },
    ];
    setDisputes(mockDisputes);
  }, []);

  const getStatusColor = (status: CreditDispute['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'resolved':
        return 'bg-green-200 text-green-800';
      case 'dismissed':
        return 'bg-red-200 text-red-800';
    }
  };

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">💳 Credit Dispute Dashboard</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">Track and manage all your credit disputes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-cockpit-panel p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Disputes Over Time</h3>
          <div className="flex items-center justify-center h-48 bg-cockpit-dark rounded">
            <p className="text-cockpit-text-secondary">[Chart Placeholder]</p>
          </div>
        </div>
        <div className="bg-cockpit-panel p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Dispute Status</h3>
          <div className="flex items-center justify-center h-48 bg-cockpit-dark rounded">
            <p className="text-cockpit-text-secondary">[Pie Chart Placeholder]</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Credit Disputes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-cockpit-panel rounded">
            <thead>
              <tr className="border-b border-cockpit-accent">
                <th className="text-left p-3">Dispute ID</th>
                <th className="text-left p-3">Creditor</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute) => (
                <tr key={dispute.disputeId} className="border-b border-cockpit-dark hover:bg-cockpit-accent">
                  <td className="p-3">{dispute.disputeId}</td>
                  <td className="p-3">{dispute.creditor}</td>
                  <td className="p-3">{new Date(dispute.date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(dispute.status)}`}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="p-3">{dispute.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {disputes.length === 0 && (
          <div className="flex items-center justify-center h-48 bg-cockpit-panel p-4 rounded mt-4">
            <p className="text-cockpit-text-secondary">No credit disputes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
