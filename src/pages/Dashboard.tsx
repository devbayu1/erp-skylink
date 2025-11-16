import { MetricCards } from '@/components/dashboard/MetricCards'
import { SalesPipeline } from '@/components/dashboard/SalesPipeline'
import { OutstandingInvoices } from '@/components/dashboard/OutstandingInvoices'
import { PendingApprovals } from '@/components/dashboard/PendingApprovals'
import { DeploymentProgress } from '@/components/dashboard/DeploymentProgress'
import { CriticalAlerts } from '@/components/dashboard/CriticalAlerts'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesPipeline />
        <OutstandingInvoices />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingApprovals />
        <DeploymentProgress />
      </div>

      {/* Full Width Alert Panel */}
      <CriticalAlerts />
    </div>
  )
}