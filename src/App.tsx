import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerFormPage from "./pages/CustomerFormPage";
import Quotations from "./pages/Quotations";
import CreateQuotation from "./pages/CreateQuotation";
import QuotationDetail from "./pages/QuotationDetail";
import SiteInvestmentForm from "./pages/SiteInvestmentForm";
import SalesPipeline from "./pages/SalesPipeline";
import SiteInvestmentList from "./components/sales/SiteInvestmentList";
import SiteInvestmentDetail from "./components/sales/SiteInvestmentDetail";
import IROList from "./pages/orders/IROList";
import IROForm from "./pages/orders/IROForm";
import IRODetail from "./pages/orders/IRODetail";
import FormBerlanggananDetail from "./pages/orders/FormBerlanggananDetail";
import FormBerlanggananForm from "./pages/orders/FormBerlanggananForm";
import PKSForm from "./pages/orders/PKSForm";
import PKSDetail from "./pages/orders/PKSDetail";
import FormBerlanggananList from "./pages/orders/FormBerlanggananList";
import PKSList from "./pages/orders/PKSList";
import KOMForm from "./pages/orders/KOMForm";
import KOMList from "./pages/orders/KOMList";
import KOMDetail from "./pages/orders/KOMDetail";
import VerificationList from "./pages/verification/VerificationList";
import VerificationForm from "./pages/verification/VerificationForm";
import VerificationDetail from "./pages/verification/VerificationDetail";
import IROApprovalList from "./pages/iro-approval/IROApprovalList";
import IROApprovalDetail from "./pages/iro-approval/IROApprovalDetail";
import IROApprovalAction from "./pages/iro-approval/IROApprovalAction";
import LegalReviewList from "./pages/legalReview/LegalReviewList";
import LegalReviewDetail from "./pages/legalReview/LegalReviewDetail";
import LegalReviewForm from "./pages/legalReview/LegalReviewForm";
import InvoiceList from "./pages/invoices/InvoiceList";
import InvoiceForm from "./pages/invoices/InvoiceForm";
import InvoiceDetail from "./pages/invoices/InvoiceDetail";
import InvoicePayments from "./pages/invoices/InvoicePayments";
import InvoiceHistory from "./pages/invoices/InvoiceHistory";
import InvoiceGenerate from "./pages/invoices/InvoiceGenerate";
import MGRFList from "./pages/procurement/MGRFList";
import MGRFForm from "./pages/procurement/MGRFForm";
import MGRFDetail from "./pages/procurement/MGRFDetail";
import PRFList from "./pages/procurement/PRFList";
import PRFForm from "./pages/procurement/PRFForm";
import PRFDetail from "./pages/procurement/PRFDetail";
import ARFList from "./pages/procurement/ARFList";
import ARFForm from "./pages/procurement/ARFForm";
import ARFDetail from "./pages/procurement/ARFDetail";
import GIFList from "./pages/procurement/GIFList";
import GIFForm from "./pages/procurement/GIFForm";
import GIFDetail from "./pages/procurement/GIFDetail";
import POVList from "./pages/procurement/POVList";
import POVForm from "./pages/procurement/POVForm";
import POVDetail from "./pages/procurement/POVDetail";
import GRNList from "./pages/procurement/GRNList";
import GRNForm from "./pages/procurement/GRNForm";
import GRNDetail from "./pages/procurement/GRNDetail";
import AssetList from "./pages/inventory/AssetList";
import AssetForm from "./pages/inventory/AssetForm";
import AssetDetail from "./pages/inventory/AssetDetail";
import MovementList from "./pages/inventory/MovementList";
import MovementDetail from "./pages/inventory/MovementDetail";
import MovementForm from "./pages/inventory/MovementForm";
import IWOList from "./pages/iwo/IWOList";
import IWOForm from "./pages/iwo/IWOForm";
import IWODetail from "./pages/iwo/IWODetail";
import DeploymentList from "./pages/deployment/DeploymentList";
import DeploymentForm from "./pages/deployment/DeploymentForm";
import DeploymentDetail from "./pages/deployment/DeploymentDetail";
import DeploymentVerify from "./pages/deployment/DeploymentVerify";
import BASTList from "./pages/bast/BASTList";
import BASTForm from "./pages/bast/BASTForm";
import BASTDetail from "./pages/bast/BASTDetail";
import SLADashboard from "./pages/sla/SLADashboard";
import SLALogList from "./pages/sla/SLALogList";
import SLALogForm from "./pages/sla/SLALogForm";
import SLALogDetail from "./pages/sla/SLALogDetail";
import CustomerPOList from "./pages/po/CustomerPOList";
import CustomerPOForm from "./pages/po/CustomerPOForm";
import CustomerPODetail from "./pages/po/CustomerPODetail";
import RecurringBillingList from "./pages/billing/RecurringBillingList";
import RecurringBillingForm from "./pages/billing/RecurringBillingForm";
import RecurringBillingDetail from "./pages/billing/RecurringBillingDetail";
import RecurringBillingScheduler from "./pages/billing/RecurringBillingScheduler";
import { AuthProvider } from "./context/AuthContext";
import DocViewer from "./pages/DocViewer";

function App() {
  return (
    <AuthProvider>
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
                
                {/* Sales & Quotation Routes - NEW ORDER */}
                <Route path="/sales/si" element={<SiteInvestmentList />} /> {/* List SI */}
                <Route path="/sales/si/new" element={<SiteInvestmentForm />} /> {/* Create SI */}
                <Route path="/sales/si/:id" element={<SiteInvestmentDetail />} />
                <Route path="/sales/si/:id/edit" element={<SiteInvestmentForm />} /> {/* Edit SI */}
                <Route path="/sales/si/:id/quotation" element={<CreateQuotation />} /> {/* Create Quotation from SI */}
                
                {/* Placeholder routes - will be created later */}
                <Route path="/quotations" element={<Quotations />} />
                <Route path="/quotations/new" element={<CreateQuotation />} />
                <Route path="/quotations/:id" element={<QuotationDetail />} />
                <Route path="/sales/pipeline" element={<SalesPipeline />} />
                
                {/* ========================= */}
                {/* LEGAL REVIEW ROUTES (Updated Flow) */}
                {/* ========================= */}
                <Route path="/legal-review" element={<LegalReviewList />} />
                <Route path="/legal-review/:id" element={<LegalReviewDetail />} />
                {/* REVISI: Menggunakan /new agar bisa menerima param ?quotationId=... */}
                <Route path="/legal-review/new" element={<LegalReviewForm />} /> 
                <Route path="/legal-review/:id/edit" element={<LegalReviewForm />} /> 
                <Route path="/verification" element={<VerificationList />} />
                <Route path="/verification/new" element={<VerificationForm />} />
                <Route path="/verification/:id" element={<VerificationDetail />} />
                <Route path="/verification/:id/edit" element={<VerificationForm />} />

                {/* ========================= */}
                {/* FORM BERLANGGANAN (Updated Flow) */}
                {/* ========================= */}
                {/* REVISI: Jalur ini dipindah menjadi top-level, tidak lagi nested di bawah IRO */}
                <Route path="/orders/form-berlangganan/new" element={<FormBerlanggananForm />} />
                <Route path="/orders/form-berlangganan" element={<FormBerlanggananList />} />
                <Route path="/orders/form-berlangganan/:id" element={<FormBerlanggananDetail />} />
                <Route path="/orders/form-berlangganan/:id/edit" element={<FormBerlanggananForm />} />
                
                {/* ========================= */}
                {/* PKS (Dependant on Form Berlangganan) */}
                {/* ========================= */}
                <Route path="/orders/form-berlangganan/:id/pks/new" element={<PKSForm />} />
                <Route path="/orders/pks" element={<PKSList />} />
                <Route path="/orders/pks/:id" element={<PKSDetail />} />
                <Route path="/orders/pks/:id/edit" element={<PKSForm />} />
                
                {/* ========================= */}
                {/* KOM (Dependant on PKS) */}
                {/* ========================= */}
                <Route path="/orders/pks/:id/kom/new" element={<KOMForm />} />
                <Route path="/orders/kom" element={<KOMList />} />
                <Route path="/orders/kom/:id" element={<KOMDetail />} />
                
                {/* ========================= */}
                {/* IRO ROUTES (Final Step) */}
                {/* ========================= */}
                <Route path="/orders/iro" element={<IROList />} />
                {/* IRO sekarang dibuat di akhir, bisa menerima param ?komId=... */}
                <Route path="/orders/iro/new" element={<IROForm />} />
                <Route path="/orders/iro/:id" element={<IRODetail />} />
                <Route path="/orders/iro/:id/edit" element={<IROForm />} />
                
                {/* IRO Approval & Others */}
                <Route path="/iro-approval" element={<IROApprovalList />} />
                <Route path="/iro-approval/:id" element={<IROApprovalDetail />} />
                <Route path="/iro-approval/:id/approve" element={<IROApprovalAction />} />

                {/* Finance */}
                <Route path="/invoices" element={<InvoiceList />} />
                <Route path="/invoices/new" element={<InvoiceForm />} />
                <Route path="/invoices/:id" element={<InvoiceDetail />} />
                <Route path="/invoices/:id/payments" element={<InvoicePayments />} />
                <Route path="/invoices/:id/history" element={<InvoiceHistory />} />
                <Route path="/invoices/generate/:pksId" element={<InvoiceGenerate />} />
                
                {/* Procurement */}
                <Route path="/procurement/mgrf" element={<MGRFList />} />
                <Route path="/procurement/mgrf/new" element={<MGRFForm />} />
                <Route path="/procurement/mgrf/:id" element={<MGRFDetail />} />
                <Route path="/procurement/mgrf/:id/edit" element={<MGRFForm />} />
                <Route path="/procurement/prf" element={<PRFList />} />
                <Route path="/procurement/prf/new" element={<PRFForm />} />
                <Route path="/procurement/prf/:id" element={<PRFDetail />} />
                <Route path="/procurement/prf/:id/edit" element={<PRFForm />} />
                <Route path="/procurement/arf" element={<ARFList />} />
                <Route path="/procurement/arf/new" element={<ARFForm />} />
                <Route path="/procurement/arf/:id" element={<ARFDetail />} />
                <Route path="/procurement/arf/:id/edit" element={<ARFForm />} />
                <Route path="/procurement/gif" element={<GIFList />} />
                <Route path="/procurement/gif/new" element={<GIFForm />} />
                <Route path="/procurement/gif/:id" element={<GIFDetail />} />
                <Route path="/procurement/gif/:id/edit" element={<GIFForm />} />
                <Route path="/procurement/pov" element={<POVList />} />
                <Route path="/procurement/pov/new" element={<POVForm />} />
                <Route path="/procurement/pov/:id" element={<POVDetail />} />
                <Route path="/procurement/pov/:id/edit" element={<POVForm />} />
                <Route path="/procurement/grn" element={<GRNList />} />
                <Route path="/procurement/grn/new" element={<GRNForm />} />
                <Route path="/procurement/grn/:id" element={<GRNDetail />} />
                <Route path="/procurement/grn/:id/edit" element={<GRNForm />} />
                
                {/* Inventory / Asset Registration */}
                <Route path="/inventory/assets" element={<AssetList />} />
                <Route path="/inventory/assets/new" element={<AssetForm />} />
                <Route path="/inventory/assets/:id" element={<AssetDetail />} />
                <Route path="/inventory/assets/:id/edit" element={<AssetForm />} />
                <Route path="/inventory/movements" element={<MovementList />} />
                <Route path="/inventory/movements/new" element={<MovementForm />} />
                <Route path="/inventory/movements/:id" element={<MovementDetail />} />
                <Route path="/inventory/movements/:id/edit" element={<MovementForm />} />
                <Route path="/inventory/movements/:id/complete" element={<MovementForm />} />
                
                {/* Technical / Installation */}
                <Route path="/iwo" element={<IWOList />} />
                <Route path="/iwo/new" element={<IWOForm />} />
                <Route path="/iwo/:id" element={<IWODetail />} />
                <Route path="/iwo/:id/edit" element={<IWOForm />} />
                <Route path="/deployment" element={<DeploymentList />} />
                <Route path="/deployment/new" element={<DeploymentForm />} />
                <Route path="/deployment/:id" element={<DeploymentDetail />} />
                <Route path="/deployment/:id/verify" element={<DeploymentVerify />} />
                
                {/* BAST */}
                <Route path="/bast" element={<BASTList />} />
                <Route path="/bast/new" element={<BASTForm />} />
                <Route path="/bast/:id" element={<BASTDetail />} />
                <Route path="/bast/:id/edit" element={<BASTForm />} />
                
                {/* SLA Monitoring */}
                <Route path="/sla" element={<SLADashboard />} />
                <Route path="/sla/:id/logs" element={<SLALogList />} />
                <Route path="/sla/:id/logs/new" element={<SLALogForm />} />
                <Route path="/sla/log/:id" element={<SLALogDetail />} />
                <Route path="/sla/log/:id/edit" element={<SLALogForm />} />
                
                {/* PO & Billing */}
                <Route path="/po" element={<CustomerPOList />} />
                <Route path="/po/new" element={<CustomerPOForm />} />
                <Route path="/po/:id" element={<CustomerPODetail />} />
                <Route path="/billing" element={<RecurringBillingList />} />
                <Route path="/billing/new" element={<RecurringBillingForm />} />
                <Route path="/billing/:id" element={<RecurringBillingDetail />} />
                <Route path="/billing/:id/edit" element={<RecurringBillingForm />} />
                <Route path="/billing/scheduler" element={<RecurringBillingScheduler />} />

                <Route path="/docs/:docName" element={<DocViewer />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;