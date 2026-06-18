import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default async function AdminBookingsPage() {
  // Mock Bookings Data
  const bookings = [
    { id: "B101", customerName: "John Doe", service: "Weight Loss Yoga", trainer: "Rahul Verma", date: "2023-10-15", time: "08:00 AM", status: "PENDING" },
    { id: "B102", customerName: "Sarah Smith", service: "Prenatal Yoga", trainer: "Priya Desai", date: "2023-10-16", time: "10:00 AM", status: "CONFIRMED" },
    { id: "B103", customerName: "Amit Patel", service: "Corporate Yoga", trainer: "Anjali Sharma", date: "2023-10-17", time: "05:00 PM", status: "COMPLETED" },
    { id: "B104", customerName: "Neha Gupta", service: "Meditation", trainer: "Rahul Verma", date: "2023-10-18", time: "07:00 PM", status: "CANCELLED" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">Pending</Badge>;
      case "CONFIRMED": return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">Confirmed</Badge>;
      case "COMPLETED": return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">Completed</Badge>;
      case "CANCELLED": return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-0">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Bookings</h1>
          <p className="text-slate-500 mt-1">View and manage all customer session requests.</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Trainer</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.trainer}</TableCell>
                  <TableCell>
                    {booking.date} <br />
                    <span className="text-xs text-slate-500">{booking.time}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost" className="text-slate-500 hover:text-slate-900">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {booking.status === "PENDING" && (
                      <>
                        <Button size="icon" variant="ghost" className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
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
