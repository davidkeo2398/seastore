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
import { toast } from "sonner";
import {
  Trash,
  Search,
  Users,
  UserCheck,
  UserX,
  Edit,
  Plus,
} from "lucide-react";

const mockUsers = [
  {
    iduser: "1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    username: "nguyenvanan",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    phonenumber: "0901234567",
    isAdmin: false,
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    iduser: "2",
    name: "Trần Thị Bình",
    email: "tranthibinh@example.com",
    username: "tranthibinh",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    phonenumber: "0912345678",
    isAdmin: true,
    createdAt: "2024-01-10",
    status: "active",
  },
  {
    iduser: "3",
    name: "Lê Văn Cường",
    email: "levancuong@example.com",
    username: "levancuong",
    address: "789 Đường Võ Văn Tần, Quận 5, TP.HCM",
    phonenumber: "0923456789",
    isAdmin: false,
    createdAt: "2024-01-20",
    status: "inactive",
  },
  {
    iduser: "4",
    name: "Phạm Thị Dung",
    email: "phamthidung@example.com",
    username: "phamthidung",
    address: "321 Đường Điện Biên Phủ, Quận 10, TP.HCM",
    phonenumber: "0934567890",
    isAdmin: false,
    createdAt: "2024-02-01",
    status: "active",
  },
  {
    iduser: "5",
    name: "Hoàng Văn Em",
    email: "hoangvanem@example.com",
    username: "hoangvanem",
    address: "654 Đường Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
    phonenumber: "0945678901",
    isAdmin: true,
    createdAt: "2024-02-05",
    status: "active",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (iduser) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      return;
    }

    setUsers((prevUsers) => prevUsers.filter((user) => user.iduser !== iduser));
    toast.success("Xóa người dùng thành công!");
  };

  const handleToggleRole = (iduser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.iduser === iduser ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
    toast.success("Cập nhật quyền thành công!");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminCount = users.filter((user) => user.isAdmin).length;
  const userCount = users.filter((user) => !user.isAdmin).length;
  const activeCount = users.filter((user) => user.status === "active").length;

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
                  <TableHead>Username</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Trạng thái</TableHead>

                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
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
                  filteredUsers.map((user) => (
                    <TableRow key={user.iduser}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {user.username}
                        </code>
                      </TableCell>
                      <TableCell
                        className="max-w-[200px] truncate"
                        title={user.address}
                      >
                        {user.address}
                      </TableCell>
                      <TableCell>{user.phonenumber}</TableCell>

                      <TableCell>
                        <Badge variant={user.isAdmin ? "default" : "outline"}>
                          {user.isAdmin ? "Admin" : "User"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleRole(user.iduser)}
                            title={
                              user.isAdmin
                                ? "Gỡ quyền Admin"
                                : "Cấp quyền Admin"
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(user.iduser)}
                            title="Xóa người dùng"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
