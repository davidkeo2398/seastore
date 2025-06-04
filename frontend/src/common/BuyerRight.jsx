

import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BuyerRights() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Button
              variant="link"
              className="p-0 h-auto text-gray-600 hover:text-blue-600"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="h-4 w-4 mr-1" />
              Trang chủ
            </Button>
            <span>/</span>
            <span>Hỗ trợ eShop</span>
          </nav>

          {/* Back Button */}
          <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          {/* Main Content */}
          <Card>
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-8">Quyền và trách nhiệm người mua</h1>

              {/* Rights Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">a) Quyền của Người mua</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Được cung cấp, hỗ trợ thông tin, giải đáp thắc mắc, khiếu nại khi có nhu cầu qua hệ thống chăm sóc
                    khách hàng;
                  </p>
                  <p>
                    Người mua được tìm hiểu, chọn lựa đa dạng các sản phẩm từ nhiều gian hàng có trên TechStore eShop;
                    được so sánh mức giá và chất lượng hàng hóa trước khi quyết định đặt mua;
                  </p>
                  <p>Người mua có quyền khiếu nại Người bán nếu chất lượng hàng hóa dịch vụ không đảm bảo;</p>
                  <p>Người mua có quyền yêu cầu cơ quan pháp luật bảo vệ quyền lợi nếu bị Người bán lừa gạt;</p>
                </div>
              </div>

              {/* Responsibilities Section */}
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">b) Nghĩa vụ của Người mua</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Người mua tham gia giao dịch trên TechStore eShop có trách nhiệm thực hiện đúng nội dung quy chế.
                    Người mua phải đọc quy chế này và các quy định có liên quan công bố trên trang web trước khi đặt mua
                    hàng; Khi xác nhận mua hàng, TechStore eShop mặc định Người mua đã đọc quy chế và không chịu trách
                    nhiệm với các vấn đề không thuộc trách nhiệm của Sàn TMĐT được nêu trong quy chế;
                  </p>
                  <p>
                    Thông báo kịp thời cho TechStore eShop khi phát hiện có hành vi vi phạm Quy chế, quy định của pháp
                    luật khi tham gia giao dịch và phối hợp với TechStore eShop để giải quyết vụ việc;
                  </p>
                  <p>
                    Cam kết và đồng ý không sử dụng dịch vụ của TechStore eShop vào các mục đích bất hợp pháp, lừa đảo,
                    đe dọa hoặc các hành vi khác vi phạm quy định của pháp luật. Người mua chịu trách nhiệm trước pháp
                    luật về những hành vi vi phạm pháp luật của mình;
                  </p>
                  <p>
                    Không có những hành vi gây mất uy tín hoặc ảnh hưởng xấu đến hoạt động kinh doanh của TechStore
                    eShop dưới mọi hình thức;
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Lưu ý quan trọng</h3>
                <p className="text-blue-800 text-sm">
                  Mọi thắc mắc về quyền và nghĩa vụ của người mua, vui lòng liên hệ với bộ phận chăm sóc khách hàng của
                  TechStore eShop qua hotline: 0866 159 422 hoặc email: support@techstore.vn
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
