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

// const mockUsers = [
//   {
//     iduser: "1",
//     name: "Nguyễn Văn An",
//     email: "nguyenvanan@example.com",
//     username: "nguyenvanan",
//     address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
//     phonenumber: "0901234567",
//     isAdmin: false,
//     isAgency: false,
//     warnings: [{ reason: "Spam bình luận", date: "2024-03-10" }],
//     lockedUntil: null,
//     createdAt: "2024-01-15",
//     status: "active",
//   },
//   {
//     iduser: "2",
//     name: "Trần Thị Bình",
//     email: "tranthibinh@example.com",
//     username: "tranthibinh",
//     address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
//     phonenumber: "0912345678",
//     isAdmin: true,
//     isAgency: false,
//     warnings: [],
//     lockedUntil: null,
//     createdAt: "2024-01-10",
//     status: "active",
//   },
//   {
//     iduser: "3",
//     name: "Lê Văn Cường",
//     email: "levancuong@example.com",
//     username: "levancuong",
//     address: "789 Đường Võ Văn Tần, Quận 5, TP.HCM",
//     phonenumber: "0923456789",
//     isAdmin: false,
//     isAgency: true,
//     warnings: [
//       { reason: "Ngôn ngữ không phù hợp", date: "2024-02-20" },
//       { reason: "Thông tin sai sự thật", date: "2024-03-05" },
//       { reason: "Spam quảng cáo", date: "2024-03-11" },
//     ],
//     lockedUntil: null,
//     createdAt: "2024-01-20",
//     status: "inactive",
//   },
//   {
//     iduser: "4",
//     name: "Phạm Thị Dung",
//     email: "phamthidung@example.com",
//     username: "phamthidung",
//     address: "321 Đường Điện Biên Phủ, Quận 10, TP.HCM",
//     phonenumber: "0934567890",
//     isAdmin: false,
//     isAgency: false,
//     warnings: [],
//     lockedUntil: null,
//     createdAt: "2024-02-01",
//     status: "active",
//   },
//   {
//     iduser: "5",
//     name: "Hoàng Văn Em",
//     email: "hoangvanem@example.com",
//     username: "hoangvanem",
//     address: "654 Đường Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
//     phonenumber: "0945678901",
//     isAdmin: true,
//     isAgency: false,
//     warnings: [],
//     lockedUntil: null,
//     createdAt: "2024-02-05",
//     status: "active",
//   },
// ];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWarnDialogOpen, setIsWarnDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [warningReason, setWarningReason] = useState("");

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

  useEffect(() => {+
    fetchUsers();
  }, []);

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

  // Cảnh báo user
  const handleWarnUser = (user) => {
    if ((user.warnings?.length || 0) >= 3) {
      handleLockUser(user.iduser);
    } else {
      setSelectedUser(user);
      setWarningReason("");
      setIsWarnDialogOpen(true);
    }
  };

  // Xác nhận cảnh báo
  const handleConfirmWarning = () => {
    if (!selectedUser || !warningReason.trim()) {
      toast.error("Lý do cảnh cáo không được để trống.");
      return;
    }
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.iduser === selectedUser.iduser && (user.warnings?.length || 0) < 3) {
          const newWarning = {
            reason: warningReason,
            date: new Date().toISOString().split("T")[0],
          };
          toast.success(`Đã cảnh cáo người dùng ${user.user_name}`);
          
          // Deep copy to prevent mutating shared state
          const updatedUser = JSON.parse(JSON.stringify(user));
          updatedUser.warnings.push(newWarning);
          
          return updatedUser;
        }
        return user;
      })
    );
    setIsWarnDialogOpen(false);
  };

  // Xóa cảnh cáo
  const handleRemoveWarning = (iduser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.iduser === iduser && (user.warnings?.length || 0) > 0) {
          toast.info(`Đã xóa 1 cảnh cáo cho người dùng ${user.user_name}`);
          const updatedWarnings = user.warnings.slice(0, -1);
          return { ...user, warnings: updatedWarnings, lockedUntil: null };
        }
        return user;
      })
    );
  };

  // Khóa user nếu quá 3 cảnh cáo
  const handleLockUser = (iduser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.iduser === iduser) {
          const lockUntilDate = new Date();
          lockUntilDate.setDate(lockUntilDate.getDate() + 1); // khóa 1 ngày
          toast.error(`Tài khoản ${user.user_name} đã bị khóa trong 1 ngày.`);
          return { ...user, lockedUntil: lockUntilDate.toISOString() };
        }
        return user;
      })
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminCount = users.filter((user) => user.role?.role_name === 'admin').length;
  const userCount = users.filter((user) => user.role?.role_name !== 'admin').length;
  const activeCount = users.length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tài khoản người dùng trong hệ thống
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Tất cả tài khoản</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{adminCount}</div>
            <p className="text-xs text-muted-foreground">Quyền admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Người dùng thường
            </CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {userCount}
            </div>
            <p className="text-xs text-muted-foreground">Quyền user</p>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Quyền</TableHead>
                  <TableHead>Cảnh cáo</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
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
                        className={locked ? "bg-red-50" : ""}
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
                            {user.role?.role_name === 'admin' ? "Admin" :
                              user.role?.role_name === "admin_agency" ? "Agency" :
                              "User"}
                          </Badge>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {user.role?.role_name !== 'admin' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleWarnUser(user)}
                                  disabled={locked}
                                  title={
                                    isMaxWarnings
                                      ? "Khóa tài khoản 1 ngày"
                                      : "Cảnh cáo người dùng"
                                  }
                                >
                                  {isMaxWarnings ? (
                                    <Ban className="h-4 w-4" />
                                  ) : (
                                    <AlertTriangle className="h-4 w-4" />
                                  )}
                                </Button>
                                {(user.warnings?.length || 0) > 0 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRemoveWarning(user.iduser)}
                                    title="Xóa cảnh cáo"
                                  >
                                    <ShieldCheck className="h-4 w-4" />
                                  </Button>
                                )}
                              </>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(user.iduser)}
                              title="Xóa người dùng"
                              disabled={user.role?.role_name === "admin"}
                            >
                              <Trash className="h-4 w-4 text-black" />
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

      <Dialog open={isWarnDialogOpen} onOpenChange={setIsWarnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cảnh cáo người dùng</DialogTitle>
            <DialogDescription>
              Bạn sắp cảnh cáo người dùng:{" "}
              <strong>{selectedUser?.user_name}</strong>. Hành động này sẽ được
              ghi lại.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="warningReason">Lý do cảnh cáo</Label>
              <Textarea
                id="warningReason"
                placeholder="Nhập lý do cảnh cáo ở đây..."
                value={warningReason}
                onChange={(e) => setWarningReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWarnDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleConfirmWarning} className="text-black">
              Xác nhận cảnh báo
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
