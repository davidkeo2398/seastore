import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import {
  Trash,
  Search,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
  ShieldCheck,
  Plus,
  Ban,
  Edit,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWarnDialogOpen, setIsWarnDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [warningReason, setWarningReason] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Kiểm tra user có bị khóa không
  const isUserLocked = (user) => {
    if (!user.lockedUntil) return false;
    return new Date(user.lockedUntil) > new Date();
  };

  // Fetch users từ backend, luôn bổ sung warnings và lockedUntil mặc định
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/user");
      const usersWithWarnings = (response.data.data || []).map((user) => ({
        ...user,
        warnings: Array.isArray(user.warnings) ? user.warnings : [],
        lockedUntil: user.lockedUntil || null,
      }));
      setUsers(usersWithWarnings);
    } catch (error) {
      toast.error("Lấy danh sách người dùng thất bại!");
      console.error("Fetch users failed:", error);
    }
  };

  useEffect(() => {
    +fetchUsers();
  }, []);
  const handleBan = async (iduser) => {
    if (!window.confirm("Bạn có chắc chắn muốn khóa người dùng này không?")) {
      return;
    }
    try {
      await axiosInstance.patch(`/admin/user/${iduser}/status`, {
        status: "locked",
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.iduser === iduser ? { ...user, status: "locked" } : user
        )
      );
      toast.success("Người dùng đã bị khóa!");
    } catch (error) {
      toast.error("Khóa người dùng thất bại!");
      console.error("Ban user failed:", error);
    }
  };

  const handleDelete = async (iduser) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      return;
    }
    try {
      await axiosInstance.delete(`/admin/user/${iduser}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.iduser !== iduser)
      );
      toast.success("Xóa người dùng thành công!");
    } catch (error) {
      toast.error("Xóa người dùng thất bại!");
      console.error("Delete user failed:", error);
    }
  };

  const handleEdit = (user) => {
    console.log("Chỉnh sửa người dùng:", user);
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...editUser,
        agency_rank_id: editUser.role_id === 3 ? 1 : editUser.agency_rank_id, // Mặc định agency_rank_id = 1 nếu role_id = 3
      };
      console.log("Dữ liệu gửi lên API:", updatedUser); // Kiểm tra dữ liệu gửi lên API

      // Gửi yêu cầu cập nhật lên API
      await axiosInstance.put(`/admin/user/${editUser.user_id}`, updatedUser);

      // Cập nhật danh sách người dùng trong state
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === editUser.user_id ? { ...u, ...editUser } : u
        )
      );
      setIsEditDialogOpen(false);
      setEditUser(null);
      window.location.reload();
    } catch (error) {
      alert("Cập nhật người dùng thất bại!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

   
    return matchesSearch ;
  });

  const adminCount = users.filter(
    (user) => user.role?.role_name === "admin"
  ).length;
  const userCount = users.filter(
    (user) => user.role?.role_name !== "admin"
  ).length;
  const agencyCount = users.filter(
    (user) => user.role?.role_name === "admin_agency"
  ).length;
  const activeCount = users.length;

  return (
    <div className="container px-4 py-8 mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý tài khoản người dùng trong hệ thống
          </p>
        </div>
        {/* <Button className="gap-2 text-black">
          <Plus className="w-4 h-4" />
          Thêm người dùng
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Tổng người dùng
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Tất cả tài khoản</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{adminCount}</div>
            <p className="text-xs text-muted-foreground">Quyền admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Người dùng thường
            </CardTitle>
            <UserX className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {userCount}
            </div>
            <p className="text-xs text-muted-foreground">Quyền user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Đại lý</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agencyCount}</div>
            <p className="text-xs text-muted-foreground">Quyền đại lý</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý tài khoản người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Quyền</TableHead>
                  {/* <TableHead>Cảnh cáo</TableHead> */}
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-8 h-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm
                            ? "Không tìm thấy người dùng phù hợp"
                            : "Chưa có người dùng nào"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const isMaxWarnings = (user.warnings?.length || 0) >= 3;
                    const locked = isUserLocked(user);
                    return (
                      <TableRow
                        key={user.iduser}
                        className={`${
                          locked ? "opacity-50 pointer-events-none" : ""
                        } ${locked ? "bg-red-50" : ""}`}
                      >
                        <TableCell className="font-medium">
                          {user.user_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role?.role_name === "admin"
                                ? "default"
                                : user.role?.role_name === "admin_agency"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {user.role?.role_name === "admin"
                              ? "Admin"
                              : user.role?.role_name === "admin_agency"
                              ? "Agency"
                              : "User"}
                          </Badge>
                        </TableCell>
                        {/* <TableCell>
                          {locked ? (
                            <Badge variant="destructive">Bị khóa</Badge>
                          ) : (
                            <span
                              className={
                                (user.warnings?.length || 0) > 0
                                  ? "text-destructive"
                                  : ""
                              }
                            >
                              {(user.warnings?.length || 0)} / 3
                            </span>
                          )}
                        </TableCell> */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              title="Chỉnh sửa người dùng"
                              disabled={user.role?.role_name === "admin"}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleBan(user.iduser)}
                              title="Khóa người dùng"
                              disabled={user.role?.role_name === "admin"}
                            >
                              <Ban className="w-4 h-4 text-black" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
          </DialogHeader>
          {editUser && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user_name">Tên</Label>
                  <Input
                    id="user_name"
                    name="user_name"
                    value={editUser.user_name || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={editUser.email || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    name="address"
                    value={editUser.address || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editUser.phone || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role_id">Quyền</Label>
                  <select
                    id="role_id"
                    name="role_id"
                    value={editUser.role_id || ""}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Chọn quyền</option>
                    {/* <option value={1}>Admin</option> */}
                    <option value={2}>User</option>
                    <option value={3}>Agency</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="outline">
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
