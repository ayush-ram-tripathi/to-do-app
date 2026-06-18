import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarCheck, TrendingUp, AlertCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  // Mock data for dashboard stats
  const stats = [
    { title: "Total Bookings", value: "156", icon: CalendarCheck, trend: "+12% from last month" },
    { title: "Pending Requests", value: "14", icon: AlertCircle, trend: "Requires attention", color: "text-amber-500" },
    { title: "New Leads", value: "48", icon: Users, trend: "+8% from last month" },
    { title: "Revenue (Est.)", value: "₹2.4L", icon: TrendingUp, trend: "+15% from last month", color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color || "text-slate-400"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">John Doe</p>
                    <p className="text-sm text-slate-500">Weight Loss Yoga • Oct {10 + i}</p>
                  </div>
                  <div className="text-sm font-medium px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                    Pending
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Jane Smith</p>
                    <p className="text-sm text-slate-500">jane@example.com</p>
                  </div>
                  <div className="text-sm font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    New
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
