import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default async function AdminLeadsPage() {
  // Mock Leads Data
  const leads = [
    { id: "L1", name: "Alice Johnson", email: "alice@example.com", phone: "+91 9876543211", status: "NEW", date: "Oct 12, 2023" },
    { id: "L2", name: "Bob Smith", email: "bob@example.com", phone: "+91 9876543212", status: "CONTACTED", date: "Oct 11, 2023" },
    { id: "L3", name: "Charlie Brown", email: "charlie@example.com", phone: "+91 9876543213", status: "CONVERTED", date: "Oct 10, 2023" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW": return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0 hover:bg-blue-100">New</Badge>;
      case "CONTACTED": return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-0 hover:bg-amber-100">Contacted</Badge>;
      case "CONVERTED": return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-0 hover:bg-emerald-100">Converted</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Leads</h1>
          <p className="text-slate-500 mt-1">Track and manage potential customer inquiries.</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Inquiries & Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-slate-500">{lead.date}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
