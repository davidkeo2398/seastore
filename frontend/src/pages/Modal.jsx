import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl max-h-[80vh] overflow-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Điều khoản và Điều kiện</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium">1. Điều khoản sử dụng</h3>
          <p className="mb-4">
            Khi sử dụng website SeaStore, bạn đồng ý tuân thủ các điều khoản và điều kiện được quy định dưới đây.
            SeaStore có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản này vào bất cứ lúc nào.
          </p>
          
          <h3 className="mb-4 text-lg font-medium">2. Quy định về đơn hàng</h3>
          <p className="mb-4">
            Khi đặt hàng tại SeaStore, bạn được coi là đã chấp nhận và đồng ý không hủy ngang các điều kiện dưới đây:
            <br />
            - Đơn hàng của bạn chỉ được xác nhận với SeaStore sau khi bạn hoàn thành thanh toán.
            <br />
            - Thông tin sản phẩm, giá cả có thể thay đổi tùy thời điểm và chương trình khuyến mãi.
          </p>
          
          <h3 className="mb-4 text-lg font-medium">3. Quy định về thanh toán</h3>
          <p className="mb-4">
            - Thanh toán trực tuyến qua VNPay: Thanh toán được xử lý an toàn qua cổng thanh toán VNPay.
            <br />
            - Thanh toán khi nhận hàng (COD): Quý khách thanh toán bằng tiền mặt khi nhận hàng.
          </p>
          
          <h3 className="mb-4 text-lg font-medium">4. Chính sách giao hàng</h3>
          <p className="mb-4">
            - SeaStore cam kết giao hàng trong vòng 2-5 ngày làm việc trong nội thành các thành phố lớn.
            <br />
            - Thời gian giao hàng có thể kéo dài hơn đối với các khu vực xa trung tâm.
          </p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}

export function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl max-h-[80vh] overflow-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Chính sách Bảo mật</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium">1. Thu thập thông tin</h3>
          <p className="mb-4">
            SeaStore thu thập các thông tin cần thiết khi bạn đăng ký tài khoản, đặt hàng hoặc liên hệ với chúng tôi.
            Các thông tin thu thập bao gồm: họ tên, email, số điện thoại, địa chỉ và thông tin thanh toán.
          </p>
          
          <h3 className="mb-4 text-lg font-medium">2. Sử dụng thông tin</h3>
          <p className="mb-4">
            - Thực hiện và quản lý đơn đặt hàng của bạn
            <br />
            - Cung cấp thông tin về sản phẩm, dịch vụ và chương trình khuyến mãi
            <br />
            - Nâng cao chất lượng dịch vụ khách hàng
            <br />
            - Giải quyết các vấn đề liên quan đến đơn hàng
          </p>
          
          <h3 className="mb-4 text-lg font-medium">3. Bảo mật thông tin</h3>
          <p className="mb-4">
            SeaStore cam kết bảo mật thông tin cá nhân của khách hàng bằng các biện pháp kỹ thuật và quản lý phù hợp.
            Chúng tôi không bán, trao đổi hay chuyển giao thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
          </p>
          
          <h3 className="mb-4 text-lg font-medium">4. Quyền của người dùng</h3>
          <p className="mb-4">
            Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi qua email: support@seastore.com.vn
          </p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}