import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
import Dashboard from '@/pages/Dashboard'
import Customers from '@/pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import CustomerFormPage from './pages/CustomerFormPage'
import Quotations from './pages/Quotations'
import CreateQuotation from './pages/CreateQuotation'
import QuotationDetail from './pages/QuotationDetail'
import SiteInvestmentForm from './pages/SiteInvestmentForm'
import SalesPipeline from './pages/SalesPipeline'

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-[240px]">
          {/* Top Navigation */}
          <TopNav />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto mt-[64px]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
               <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/customers/new" element={<CustomerFormPage />} />
              <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
              
              {/* Placeholder routes - will be created later */}
              <Route path="/quotations" element={<Quotations/>} />
              <Route path="/quotations/new" element={<CreateQuotation/>} />
              <Route path="/quotations/:id" element={<QuotationDetail/>} />
              <Route path="/quotations/:id/si" element={<SiteInvestmentForm/>} />
              <Route path="/sales/pipeline" element={<SalesPipeline/>} />
              
              <Route path="/orders" element={<div>Order Management Page</div>} />
              <Route path="/finance" element={<div>Finance Page</div>} />
              <Route path="/deployment" element={<div>Deployment Page</div>} />
              <Route path="/reports" element={<div>Reports Page</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App