import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Download,
  Mail,
  Printer,
  MoreVertical,
  User,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  Scale,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { QuotationStatusBadge } from "../components/quotations/QuotationStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

interface QuotationDetailData {
  id: string;
  quotationNo: string;
  status: "draft" | "sent" | "approved" | "rejected" | "expired";
  customerName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  customerType: "Prospect" | "Existing";
  createdBy: string;
  createdByTitle: string;
  createdDate: string;
  validUntil: string;
  lastUpdated: string;
  approvedBy?: string;
  approvedDate?: string;
  serviceType: string;
  servicePlan: string;
  quantity: number;
  servicePeriod: number;
  installationLocation: string;
  targetRFS: string;
}

const mockQuotation: QuotationDetailData = {
  id: "1",
  quotationNo: "PRT-JKT-QUOT-186-COM-4-2025",
  status: "sent",
  customerName: "Ibu Wulan",
  contactPerson: "Wulan",
  phone: "+62 812-xxx-xxxx",
  email: "wulan@email.com",
  address: "Jl. Raya Lampung No. 123, Bandar Lampung, Lampung 35214",
  customerType: "Prospect",
  createdBy: "Melrandy Firdauz",
  createdByTitle: "VP Commercial",
  createdDate: "2025-04-08",
  validUntil: "2025-04-15",
  lastUpdated: "2025-04-08T10:30:00",
  serviceType: "Starlink Standard V4",
  servicePlan: "Unlimited Broadband DL/UL 200/20 Mbps",
  quantity: 1,
  servicePeriod: 12,
  installationLocation: "Lampung",
  targetRFS: "2025-05-01",
};

const otcItems = [
  {
    item: "Delivery & Installation in Lampung",
    description: "-",
    qty: 1,
    unitPrice: 10000000,
    amount: 10000000,
  },
  {
    item: "Starlink Standard V4",
    description: "Equipment",
    qty: 1,
    unitPrice: 6000000,
    amount: 6000000,
  },
  {
    item: "Activation",
    description: "Service activation",
    qty: 1,
    unitPrice: 1000000,
    amount: 1000000,
  },
];

const mrcItems = [
  {
    item: "Starlink Unlimited Broadband",
    description: "DL/UL 200/20 Mbps",
    monthly: 2200000,
    period: 12,
    total: 26400000,
  },
];

const historyTimeline = [
  {
    date: "08 Apr 2025",
    time: "10:30",
    action: "Quotation created",
    user: "Melrandy Firdauz",
  },
  {
    date: "08 Apr 2025",
    time: "11:15",
    action: "Quotation sent to customer via email",
    user: "Melrandy Firdauz",
  },
  {
    date: "09 Apr 2025",
    time: "09:00",
    action: "Quotation opened by customer",
    user: "Ibu Wulan",
  },
];

const documents = [
  { name: "Quotation PDF", type: "application/pdf", size: "245 KB" },
  { name: "Product Brochure", type: "application/pdf", size: "1.2 MB" },
  { name: "Technical Specification", type: "application/pdf", size: "580 KB" },
];

export default function QuotationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const validDate = new Date(mockQuotation.validUntil);
    const diffTime = validDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const subtotalOTC = otcItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotalMRC = mrcItems.reduce((sum, item) => sum + item.total, 0);
  const subtotal = subtotalOTC + subtotalMRC;
  const ppn = subtotal * 0.11;
  const grandTotal = subtotal + ppn;

  const handleEdit = () => {
    navigate(`/quotations/${id}/edit`);
  };

  const handleDownloadPDF = () => {
    console.log("Download PDF");
  };

  const handleSendEmail = () => {
    console.log("Send Email");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={() => navigate("/quotations")}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-gray-900">{mockQuotation.quotationNo}</h1>
              <QuotationStatusBadge status={mockQuotation.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">Created on {formatDate(mockQuotation.createdDate)}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Tombol Khusus Flow Baru */}
            {mockQuotation.status === "sent" && (
              <Button
                onClick={() => navigate(`/legal-review/new?quotationId=${id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm"
              >
                <Scale className="w-4 h-4" /> {/* Pastikan import icon Scale dari lucide-react */}
                Submit Legal Review
              </Button>
            )}
            {(mockQuotation.status === "draft" || mockQuotation.status === "sent") && (
              <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendEmail} className="gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            {/* <Button onClick={() => navigate(`/quotations/${id}/si`)}>
              <FileText className="w-4 h-4 mr-2" />
              Create SI
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Convert to IRO</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* DETAILS TAB */}
          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Row 1: Customer Info & Quotation Status */}
            <div className="grid grid-cols-2 gap-6">
              {/* Customer Information */}
              <Card className="bg-white shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Customer Name</span>
                    <p className="text-gray-900">{mockQuotation.customerName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Contact Person</span>
                    <p className="text-gray-900">{mockQuotation.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {mockQuotation.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="text-gray-900">{mockQuotation.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Address</span>
                    <p className="text-gray-700 text-sm flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      {mockQuotation.address}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Customer Type</span>
                    <div className="mt-1">
                      <Badge
                        className={mockQuotation.customerType === "Prospect" ? "bg-purple-500 hover:bg-purple-600" : "bg-blue-500 hover:bg-blue-600"}
                      >
                        {mockQuotation.customerType}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quotation Status */}
              <Card className="bg-white shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Quotation Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="mt-1">
                      <QuotationStatusBadge status={mockQuotation.status} />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Created By</span>
                    <p className="text-gray-900">
                      {mockQuotation.createdBy}
                      <span className="text-sm text-gray-500 ml-1">({mockQuotation.createdByTitle})</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Created Date</span>
                    <p className="text-gray-900">{formatDate(mockQuotation.createdDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Valid Until</span>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{formatDate(mockQuotation.validUntil)}</p>
                      {getDaysRemaining() > 0 && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 gap-1">
                          <Clock className="w-3 h-3" />
                          {getDaysRemaining()} days remaining
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <p className="text-gray-900">{formatDateTime(mockQuotation.lastUpdated)}</p>
                  </div>
                  {mockQuotation.status === "approved" && mockQuotation.approvedBy && (
                    <>
                      <div>
                        <span className="text-sm text-gray-600">Approved By</span>
                        <p className="text-gray-900">{mockQuotation.approvedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Approved Date</span>
                        <p className="text-gray-900">{mockQuotation.approvedDate ? formatDate(mockQuotation.approvedDate) : "-"}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Service Details */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-1/4 text-gray-600">Service Type</TableCell>
                      <TableCell className="text-gray-900">{mockQuotation.serviceType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Service Plan</TableCell>
                      <TableCell className="text-gray-900">{mockQuotation.servicePlan}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Quantity</TableCell>
                      <TableCell className="text-gray-900">{mockQuotation.quantity} unit</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Service Period</TableCell>
                      <TableCell className="text-gray-900">{mockQuotation.servicePeriod} months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Installation Location</TableCell>
                      <TableCell className="text-gray-900">{mockQuotation.installationLocation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Target RFS</TableCell>
                      <TableCell className="text-gray-900">{formatDate(mockQuotation.targetRFS)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Row 3: Cost Breakdown */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* OTC Section */}
                <div>
                  <h3 className="text-sm text-gray-900 mb-3">One Time Charge (OTC)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otcItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.item}</TableCell>
                          <TableCell className="text-gray-700">{item.description}</TableCell>
                          <TableCell className="text-center text-gray-700">{item.qty}</TableCell>
                          <TableCell className="text-right text-gray-700">{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell className="text-right text-gray-900">{formatCurrency(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={4} className="text-right text-gray-900">
                          Subtotal OTC
                        </TableCell>
                        <TableCell className="text-right text-gray-900">{formatCurrency(subtotalOTC)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* MRC Section */}
                <div>
                  <h3 className="text-sm text-gray-900 mb-3">Monthly Recurring Charge (MRC)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Monthly</TableHead>
                        <TableHead className="text-center">Period</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mrcItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-900">{item.item}</TableCell>
                          <TableCell className="text-gray-700">{item.description}</TableCell>
                          <TableCell className="text-right text-gray-700">{formatCurrency(item.monthly)}</TableCell>
                          <TableCell className="text-center text-gray-700">{item.period} months</TableCell>
                          <TableCell className="text-right text-gray-900">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={4} className="text-right text-gray-900">
                          Subtotal MRC
                        </TableCell>
                        <TableCell className="text-right text-gray-900">{formatCurrency(subtotalMRC)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Total Calculation */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">PPN 11%</span>
                    <span className="text-gray-900">{formatCurrency(ppn)}</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-2 flex justify-between items-center">
                    <span className="text-gray-900">Grand Total</span>
                    <span className="text-gray-900">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 4: Terms & Conditions */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-1/4 text-gray-600">Payment Terms</TableCell>
                      <TableCell className="text-gray-900">Prepaid</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Valid Until</TableCell>
                      <TableCell className="text-gray-900">{formatDate(mockQuotation.validUntil)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">SLA</TableCell>
                      <TableCell className="text-gray-900">99% Uptime guarantee, Standard Support 24x7</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Minimum Contract</TableCell>
                      <TableCell className="text-gray-900">1 year</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Delivery Period</TableCell>
                      <TableCell className="text-gray-900">1 week after PO received</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HISTORY TAB */}
          <TabsContent value="history" className="mt-6">
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyTimeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        {index < historyTimeline.length - 1 && <div className="w-0.5 h-12 bg-gray-200 my-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900">{event.action}</p>
                          <span className="text-sm text-gray-500">
                            {event.date}, {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCUMENTS TAB */}
          <TabsContent value="documents" className="mt-6">
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Attached Documents</CardTitle>
                  <Button className="gap-2 bg-[#3b82f6] hover:bg-blue-600">
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
