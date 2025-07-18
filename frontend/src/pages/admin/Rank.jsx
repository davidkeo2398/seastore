import { useState, useEffect } from "react";
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
import axiosInstance from "@/lib/axios";


const rankConfigIconsColors = {
  Bronze: { color: "bg-orange-100 text-orange-800", icon: Award },
  Silver: { color: "bg-gray-100 text-gray-800", icon: Star },
  Gold: { color: "bg-yellow-100 text-yellow-800", icon: Trophy },
  Platinum: { color: "bg-blue-100 text-blue-800", icon: Crown },
  Diamond: { color: "bg-purple-100 text-purple-800", icon: Gift },
};
export default function AdminAngencyRank() {
  const [members, setMembers] = useState([]);
  const [ranks, setRanks] = useState([]);
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

  const fetchRanks = async () => {
    try {
      const response = await axiosInstance.get("/admin/rank");
      setRanks(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hạng:", error);
      toast.error("Không thể tải danh sách hạng. Vui lòng thử lại sau.");
    }
  };

  const fetchMembersWithRank = async () => {
    try {
      const response = await axiosInstance.get("/admin/rank/members");
      setMembers(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành viên:", error);
      toast.error("Không thể tải danh sách thành viên. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchRanks();
    fetchMembersWithRank();
  }, []);

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailDialogOpen(true);
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.member_info.user_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.member_info.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(member.user_id).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRank =
      rankFilter === "all" || member.rank_info.name === rankFilter;

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

  const getRankBadge = (rankName) => {
    const config = rankConfigIconsColors[rankName];
    if (!config) {
      // Thêm dòng này để phòng trường hợp có hạng không xác định
      return <Badge variant="secondary">{rankName}</Badge>;
    }
    const IconComponent = config.icon;
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {rankName}
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
    <div className="container px-4 py-8 mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý hạng đại lý</h1>
          <p className="mt-1 text-muted-foreground">
            Theo dõi điểm tích lũy và hạng đại lý
          </p>
        </div>
        {/* <Button className="gap-2 text-black">
          <Plus className="w-4 h-4" />
          Thêm thành viên
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Tổng thành viên
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Thành viên đã đăng ký
            </p>
          </CardContent>
        </Card>
       
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Danh sách thành viên</TabsTrigger>
          {/* <TabsTrigger value="ranks">Cấu hình hạng</TabsTrigger>
          <TabsTrigger value="analytics">Thống kê</TabsTrigger> */}
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
              <div className="flex flex-col gap-4 mb-6 sm:flex-row">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
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
                    {ranks.map(
                      (
                        rank // Sử dụng danh sách hạng từ API
                      ) => (
                        <SelectItem
                          key={rank.agency_rank_id}
                          value={rank.agency_rank_name}
                        >
                          {rank.agency_rank_name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thành viên</TableHead>
                      <TableHead>Hạng</TableHead>
                      <TableHead>Tổng chi tiêu</TableHead>
                      <TableHead>Giảm giá</TableHead>
                      <TableHead>Tiến độ hạng</TableHead>
                      <TableHead className="w-[150px] text-left">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <TableRow key={member.user_id}>
                          <TableCell>
                            <div className="space-y-1">
                              {/* <div className="font-medium">
                                {member.user_id}
                              </div> */}
                              <div className="text-sm text-muted-foreground">
                                {member.member_info.user_name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {member.member_info.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getRankBadge(member.rank_info.name)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatPrice(member.total_spent)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              {member.rank_info.discount_percent}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {member.rank_progress &&
                            member.rank_progress.next_rank_name &&
                            member.rank_progress.next_rank_name !==
                              "Đã đạt hạng cao nhất" ? (
                              <div className="space-y-1">
                                <span className="text-s whitespace-nowrap">
                                  Còn{" "}
                                  {formatPrice(member.rank_progress.remaining)}{" "}
                                  để lên hạng{" "}
                                  {member.rank_progress.next_rank_name}
                                </span>
                              </div>
                            ) : (
                              <Badge className="text-purple-800 bg-purple-100">
                                Hạng cao nhất
                              </Badge>
                            )}
                          </TableCell>
                          {/* <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {new Date(member.lastActivity).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                          </TableCell> */}
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(member)}
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePointsAdjustment(member)}
                                title="Điều chỉnh điểm"
                              >
                                <Edit className="w-4 h-4" />
                              </Button> */}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          Không có thành viên nào phù hợp với tiêu chí tìm kiếm.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
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
                    <div>Tên: {selectedMember.member_info.user_name}</div>
                    <div>Email: {selectedMember.member_info.email}</div>
                    <div>Điện thoại: {selectedMember.phone}</div>
                    
                    <div>
                      Ngày tham gia:{" "}
                      {new Date(selectedMember.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <h4 className="font-medium">Thống kê</h4>
                  <div className="space-y-1 text-sm">
                    <div>Số đơn hàng: {selectedMember.ordersCount}</div>
                    <div>
                      Tổng chi tiêu: {formatPrice(selectedMember.totalSpent)}
                    </div>
                    <div>Hạng hiện tại: {selectedMember.currentRank}</div>
                    <div>Giảm giá: {selectedMember.discountPercentage}%</div>
                  </div>
                </div> */}
              </div>
              {/* <div className="space-y-2">
                <h4 className="font-medium">Điểm tích lũy</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <div className="font-semibold text-blue-600">
                      {selectedMember.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tổng điểm
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <div className="font-semibold text-green-600">
                      {selectedMember.availablePoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Khả dụng
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50">
                    <div className="font-semibold text-orange-600">
                      {selectedMember.usedPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Đã sử dụng
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </DialogContent>
      </Dialog>

      
      
    </div>
  );
}
