import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Search,
  Users,
  Star,
  Trophy,
  Crown,
  Gift,
  TrendingUp,
  DollarSign,
  Award,
  Plus,
  Edit,
  Eye,
  Calendar,
} from "lucide-react";

// Mock data for members
const mockMembers = [
  {
    id: "MEM001",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    phone: "0901234567",
    currentRank: "Gold",
    totalSpent: 15000000,
    totalPoints: 2500,
    usedPoints: 500,
    availablePoints: 2000,
    joinDate: "2023-01-15",
    lastActivity: "2024-03-01",
    discountPercentage: 10,
    nextRankProgress: 75,
    ordersCount: 25,
  },
  {
    id: "MEM002",
    name: "Trần Thị Bình",
    email: "tranthibinh@example.com",
    phone: "0912345678",
    currentRank: "Silver",
    totalSpent: 8000000,
    totalPoints: 1200,
    usedPoints: 200,
    availablePoints: 1000,
    joinDate: "2023-03-20",
    lastActivity: "2024-02-28",
    discountPercentage: 5,
    nextRankProgress: 60,
    ordersCount: 18,
  },
  {
    id: "MEM003",
    name: "Lê Văn Cường",
    email: "levancuong@example.com",
    phone: "0923456789",
    currentRank: "Platinum",
    totalSpent: 35000000,
    totalPoints: 5000,
    usedPoints: 1000,
    availablePoints: 4000,
    joinDate: "2022-08-10",
    lastActivity: "2024-03-02",
    discountPercentage: 15,
    nextRankProgress: 40,
    ordersCount: 45,
  },
  {
    id: "MEM004",
    name: "Phạm Thị Dung",
    email: "phamthidung@example.com",
    phone: "0934567890",
    currentRank: "Bronze",
    totalSpent: 2500000,
    totalPoints: 400,
    usedPoints: 50,
    availablePoints: 350,
    joinDate: "2024-01-05",
    lastActivity: "2024-02-25",
    discountPercentage: 2,
    nextRankProgress: 25,
    ordersCount: 8,
  },
  {
    id: "MEM005",
    name: "Hoàng Văn Em",
    email: "hoangvanem@example.com",
    phone: "0945678901",
    currentRank: "Diamond",
    totalSpent: 75000000,
    totalPoints: 12000,
    usedPoints: 3000,
    availablePoints: 9000,
    joinDate: "2022-05-15",
    lastActivity: "2024-03-01",
    discountPercentage: 20,
    nextRankProgress: 100,
    ordersCount: 89,
  },
];

// Rank configuration
const rankConfig = {
  Bronze: {
    threshold: 0,
    discount: 2,
    color: "bg-orange-100 text-orange-800",
    icon: Award,
  },
  Silver: {
    threshold: 5000000,
    discount: 5,
    color: "bg-gray-100 text-gray-800",
    icon: Star,
  },
  Gold: {
    threshold: 10000000,
    discount: 10,
    color: "bg-yellow-100 text-yellow-800",
    icon: Trophy,
  },
  Platinum: {
    threshold: 25000000,
    discount: 15,
    color: "bg-blue-100 text-blue-800",
    icon: Crown,
  },
  Diamond: {
    threshold: 50000000,
    discount: 20,
    color: "bg-purple-100 text-purple-800",
    icon: Gift,
  },
};

export default function AdminAngencyRank() {
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [rankFilter, setRankFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isPointsDialogOpen, setIsPointsDialogOpen] = useState(false);
  const [pointsAdjustment, setPointsAdjustment] = useState({
    type: "add",
    amount: 0,
    reason: "",
  });

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailDialogOpen(true);
  };

  const handlePointsAdjustment = (member) => {
    setSelectedMember(member);
    setIsPointsDialogOpen(true);
  };

  const handleSavePointsAdjustment = () => {
    if (!selectedMember) return;

    const newPoints =
      pointsAdjustment.type === "add"
        ? selectedMember.availablePoints + pointsAdjustment.amount
        : selectedMember.availablePoints - pointsAdjustment.amount;

    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              availablePoints: Math.max(0, newPoints),
              totalPoints:
                pointsAdjustment.type === "add"
                  ? member.totalPoints + pointsAdjustment.amount
                  : member.totalPoints,
            }
          : member
      )
    );

    setIsPointsDialogOpen(false);
    setPointsAdjustment({ type: "add", amount: 0, reason: "" });
    toast.success("Cập nhật điểm thành công!");
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRank =
      rankFilter === "all" || member.currentRank === rankFilter;

    return matchesSearch && matchesRank;
  });

  const totalMembers = members.length;
  const totalPoints = members.reduce(
    (sum, member) => sum + member.totalPoints,
    0
  );
  const totalSpent = members.reduce(
    (sum, member) => sum + member.totalSpent,
    0
  );
  const averageDiscount =
    members.reduce((sum, member) => sum + member.discountPercentage, 0) /
    members.length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getRankBadge = (rank) => {
    const config = rankConfig[rank];
    const IconComponent = config.icon;
    return (
      <Badge className={config.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {rank}
      </Badge>
    );
  };

  const getNextRank = (currentRank, totalSpent) => {
    const ranks = Object.keys(rankConfig);
    const currentIndex = ranks.indexOf(currentRank);
    const nextRank = ranks[currentIndex + 1];

    if (!nextRank) return null;

    const nextThreshold = rankConfig[nextRank].threshold;
    const progress = Math.min(100, (totalSpent / nextThreshold) * 100);

    return {
      rank: nextRank,
      threshold: nextThreshold,
      remaining: nextThreshold - totalSpent,
      progress,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý thành viên</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi điểm tích lũy và hạng thành viên
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm thành viên
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng thành viên
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Thành viên đã đăng ký
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng điểm</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Điểm tích lũy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng chi tiêu</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(totalSpent)}
            </div>
            <p className="text-xs text-muted-foreground">
              Doanh thu từ thành viên
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giảm giá TB</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {averageDiscount.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Mức giảm giá trung bình
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Danh sách thành viên</TabsTrigger>
          <TabsTrigger value="ranks">Cấu hình hạng</TabsTrigger>
          <TabsTrigger value="analytics">Thống kê</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách thành viên</CardTitle>
              <CardDescription>
                Quản lý thông tin và điểm tích lũy của thành viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm thành viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={rankFilter} onValueChange={setRankFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lọc theo hạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả hạng</SelectItem>
                    {Object.keys(rankConfig).map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Hạng</TableHead>
                      <TableHead>Điểm khả dụng</TableHead>
                      <TableHead>Tổng chi tiêu</TableHead>
                      <TableHead>Giảm giá</TableHead>
                      <TableHead>Tiến độ hạng</TableHead>
                      <TableHead>Hoạt động cuối</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => {
                      const nextRank = getNextRank(
                        member.currentRank,
                        member.totalSpent
                      );
                      return (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {member.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {member.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getRankBadge(member.currentRank)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">
                                {member.availablePoints.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Tổng: {member.totalPoints.toLocaleString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatPrice(member.totalSpent)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              {member.discountPercentage}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {nextRank ? (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span>Đến {nextRank.rank}</span>
                                  <span>{nextRank.progress.toFixed(0)}%</span>
                                </div>
                                <Progress
                                  value={nextRank.progress}
                                  className="h-2"
                                />
                                <div className="text-xs text-muted-foreground">
                                  Còn {formatPrice(nextRank.remaining)}
                                </div>
                              </div>
                            ) : (
                              <Badge className="bg-purple-100 text-purple-800">
                                Hạng cao nhất
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {new Date(member.lastActivity).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(member)}
                                title="Xem chi tiết"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePointsAdjustment(member)}
                                title="Điều chỉnh điểm"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ranks Tab */}
        <TabsContent value="ranks">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình hạng thành viên</CardTitle>
              <CardDescription>
                Thiết lập ngưỡng chi tiêu và phần trăm giảm giá cho từng hạng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(rankConfig).map(([rank, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <Card key={rank} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-6 w-6" />
                          <div>
                            <h3 className="font-semibold">{rank}</h3>
                            <p className="text-sm text-muted-foreground">
                              Ngưỡng: {formatPrice(config.threshold)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            {config.discount}% giảm giá
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {
                              members.filter((m) => m.currentRank === rank)
                                .length
                            }{" "}
                            thành viên
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố hạng thành viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.keys(rankConfig).map((rank) => {
                    const count = members.filter(
                      (m) => m.currentRank === rank
                    ).length;
                    const percentage = (count / totalMembers) * 100;
                    return (
                      <div key={rank} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{rank}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Member Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết thành viên</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về thành viên {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Thông tin cá nhân</h4>
                  <div className="space-y-1 text-sm">
                    <div>Tên: {selectedMember.name}</div>
                    <div>Email: {selectedMember.email}</div>
                    <div>Điện thoại: {selectedMember.phone}</div>
                    <div>
                      Ngày tham gia:{" "}
                      {new Date(selectedMember.joinDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Thống kê</h4>
                  <div className="space-y-1 text-sm">
                    <div>Số đơn hàng: {selectedMember.ordersCount}</div>
                    <div>
                      Tổng chi tiêu: {formatPrice(selectedMember.totalSpent)}
                    </div>
                    <div>Hạng hiện tại: {selectedMember.currentRank}</div>
                    <div>Giảm giá: {selectedMember.discountPercentage}%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Điểm tích lũy</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-600">
                      {selectedMember.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tổng điểm
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-600">
                      {selectedMember.availablePoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Khả dụng
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-600">
                      {selectedMember.usedPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Đã sử dụng
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Points Adjustment Dialog */}
      <Dialog open={isPointsDialogOpen} onOpenChange={setIsPointsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Điều chỉnh điểm</DialogTitle>
            <DialogDescription>
              Thêm hoặc trừ điểm cho thành viên {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Loại điều chỉnh</Label>
              <Select
                value={pointsAdjustment.type}
                onValueChange={(value) =>
                  setPointsAdjustment({ ...pointsAdjustment, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Thêm điểm</SelectItem>
                  <SelectItem value="subtract">Trừ điểm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Số điểm</Label>
              <Input
                type="number"
                value={pointsAdjustment.amount}
                onChange={(e) =>
                  setPointsAdjustment({
                    ...pointsAdjustment,
                    amount: Number(e.target.value),
                  })
                }
                placeholder="Nhập số điểm"
              />
            </div>
            <div className="space-y-2">
              <Label>Lý do</Label>
              <Input
                value={pointsAdjustment.reason}
                onChange={(e) =>
                  setPointsAdjustment({
                    ...pointsAdjustment,
                    reason: e.target.value,
                  })
                }
                placeholder="Nhập lý do điều chỉnh"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPointsDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleSavePointsAdjustment}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
