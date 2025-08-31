import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Settings,
  Bell
} from "lucide-react";
import { Property, User } from "@/types/property";
import properties from "@/data/properties.json";
import users from "@/data/users.json";

const Dashboard = () => {
  const [selectedRole] = useState<"owner" | "tenant" | "admin">("owner");

  const userProperties = (properties as Property[]).filter(p => [1, 2].includes(p.id)); // Mock user properties
  const totalRevenue = userProperties.reduce((sum, p) => sum + p.price, 0);

  const stats = {
    owner: [
      { title: "Total Properties", value: userProperties.length, icon: Building2, color: "text-blue-600" },
      { title: "Monthly Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
      { title: "Active Listings", value: userProperties.filter(p => p.availability).length, icon: TrendingUp, color: "text-purple-600" },
      { title: "Total Views", value: "1,234", icon: Eye, color: "text-orange-600" },
    ],
    tenant: [
      { title: "Active Bookings", value: "2", icon: Calendar, color: "text-blue-600" },
      { title: "Applications", value: "5", icon: Building2, color: "text-green-600" },
      { title: "Saved Properties", value: "12", icon: Eye, color: "text-purple-600" },
      { title: "Messages", value: "8", icon: Bell, color: "text-orange-600" },
    ],
    admin: [
      { title: "Total Users", value: (users as User[]).length, icon: Users, color: "text-blue-600" },
      { title: "Total Properties", value: (properties as Property[]).length, icon: Building2, color: "text-green-600" },
      { title: "Pending Approvals", value: "3", icon: Settings, color: "text-purple-600" },
      { title: "Monthly Revenue", value: "$45,230", icon: DollarSign, color: "text-orange-600" },
    ],
  };

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats[selectedRole].map((stat, index) => (
            <Card key={index} className="property-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">My Properties</h2>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {userProperties.map((property) => (
                <Card key={property.id} className="property-card">
                  <div className="relative">
                    <img
                      src={`/src/assets/property-${property.id}.jpg`}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={property.type === "rent" ? "secondary" : "default"}
                        className={property.type === "rent" ? "bg-property-rent text-white" : "bg-property-sale text-white"}
                      >
                        {property.type === "rent" ? "For Rent" : "For Sale"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {property.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {property.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xl font-bold text-primary">
                          {formatPrice(property.price, property.type)}
                        </div>
                        <Badge variant={property.availability ? "default" : "secondary"}>
                          {property.availability ? "Available" : "Occupied"}
                        </Badge>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Property Analytics</CardTitle>
                <CardDescription>
                  Track your property performance and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and reporting features will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communicate with potential tenants and buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Messages from interested parties will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Settings Panel
                  </h3>
                  <p className="text-muted-foreground">
                    Account settings and preferences will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;