// Các khai báo model và module cần thiết từ dự án của bạn
const { Product } = require("../Model/Index");
const Op = require("sequelize").Op;
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

function formatPrice(price) {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    return price; // Trả về nguyên bản nếu không phải là số
  }
  return numericPrice.toLocaleString("vi-VN"); // Định dạng theo chuẩn Việt Nam
}

// nếu k faq, tìm kiếm theo từ khóa các sản phẩm trong cơ sở dữ liệu
const productService = {
  searchProductsForChatbot: async (searchTerms) => {
    console.log(`AI is searching DB for keywords: ${searchTerms}`);

    // Tách chuỗi từ khóa thành một mảng các từ khóa riêng lẻ
    const keywords = searchTerms.split(" ").filter((k) => k.length > 1); // Lọc bỏ các từ khóa quá ngắn

    if (keywords.length === 0) {
      return [];
    }

    // Tạo một mảng các điều kiện LIKE cho mỗi từ khóa
    const likeConditions = keywords.map((key) => ({ [Op.like]: `%${key}%` }));

    // Xây dựng câu truy vấn Sequelize linh hoạt
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { product_name: { [Op.or]: likeConditions } },
          { description: { [Op.or]: likeConditions } },
        ],
      },
      limit: 5, // Giới hạn 5 sản phẩm để câu trả lời không quá dài
    });

    console.log(`Found ${products.length} products in DB.`);

    // Trả về dữ liệu đã được đơn giản hóa cho AI
    return products.map((p) => ({
      product_id: p.product_id, // Cần ID để tạo link
      product_name: p.product_name,
      description: p.description,
      price: formatPrice(p.price), // Định dạng giá
      category_id: p.category_id, // Cần để hiển thị danh mục nếu cần
      image: p.image, // Cần URL ảnh để hiển thị
    }));
  },
};

// Nạp kiến thức từ file JSON
const knowledgeBasePath = path.join(__dirname, "../../knowledge_base.json");
let knowledgeBase = { faq: [], fallback: {} };
try {
  const jsonData = fs.readFileSync(knowledgeBasePath, "utf-8");
  knowledgeBase = JSON.parse(jsonData);
  console.log("AI đã nạp thành công kiến thức nền từ knowledge_base.json");
} catch (error) {
  console.error("Lỗi khi đọc file knowledge_base.json:", error);
}

// duyệt qua các mục trong FAQ để đảm bảo định dạng đúng
function findAnswerInFaq(userQuestion) {
  const question = userQuestion.toLowerCase();
  for (const item of knowledgeBase.faq) {
    for (const keyword of item.keywords) {
      // Chỉ khớp khi câu hỏi là một từ đơn hoặc có khoảng trắng bao quanh
      const regex = new RegExp(`\\b${keyword}\\b`); // ranh giới từ khóa có thể k hoạt động chính xác cho tiếng việt
      if (regex.test(question)) {
        return item.answer;
      }
    }
  }
  return null;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getGeminiResponse(userQuestion, isContinuation = false) {
  try {
    // BƯỚC 1: KIỂM TRA FAQ (LỜI CHÀO NGẮN)
    // Sửa lại file knowledge_base.json để lời chào ngắn gọn hơn
    // "answer": "Chào bạn, bạn cần tôi hỗ trợ thêm gì không ạ?"
    const faqAnswer = findAnswerInFaq(userQuestion);
    if (faqAnswer) return faqAnswer;

    // nếu k faq, tìm kiếm theo từ khóa các sản phẩm trong cơ sở dữ liệu
    console.log("Câu hỏi không khớp với FAQ. Đang trích xuất từ khóa...");

    const keywordExtractionPrompt = `
        Bạn là chuyên gia về thủy sản. Dựa vào câu hỏi của người dùng, hãy rút ra những từ khóa chính xác nhất để tìm kiếm sản phẩm trong cơ sở dữ liệu.
        Chỉ trả về các từ khóa, phân cách bởi dấu phẩy. Ưu tiên các từ khóa mô tả vấn đề, công dụng sản phẩm hoặc tên loại sản phẩm.
        Ví dụ:
        - Câu hỏi: "tôi muốn tìm gì đó cho tôm bị bệnh đường ruột" -> Từ khóa: bệnh đường ruột, phân trắng, tôm, tiêu hóa, EHP
        - Câu hỏi: "có cám cho cá tra không shop" -> Từ khóa: thức ăn, cá tra, tăng trưởng, cám
        - Câu hỏi: "nước ao của tôi bị đục và có mùi hôi" -> Từ khóa: xử lý nước, làm sạch nước, vi sinh, khử mùi, đáy ao
        - Câu hỏi: "tôm bị cong thân mềm vỏ thì dùng gì?" -> Từ khóa: khoáng, cong thân, mềm vỏ, canxi, lột xác
        - Câu hỏi: "có thuốc gì trị nấm cho cá không?" -> Từ khóa: trị nấm, cá, FUNGI-CLEAR
        - Câu hỏi: "làm thế nào để trị bệnh cho tôm" -> Từ khóa: trị bệnh, tôm, EHP, phân trắng, sán lá gan, đường ruột, PIO NUS, NOVA-BACCI
        Câu hỏi: "${userQuestion}"
        Từ khóa:
      `;
    console.log(`Prompt trích xuất từ khóa: ${keywordExtractionPrompt}`);
    const keywordResult = await model.generateContent(keywordExtractionPrompt);
    const searchTerms = (await keywordResult.response.text())
      .split(",")
      .map((term) => term.trim())
      .join(" ");
    console.log(`Từ khóa trích xuất được: ${searchTerms}`);

    // tìm sp ở db
    console.log("Đang tìm kiếm sản phẩm trong cơ sở dữ liệu...");
    const productsFromDB = await productService.searchProductsForChatbot(
      searchTerms
    );
    console.log(`Found ${productsFromDB.length} products in DB.`);

    if (productsFromDB.length === 0) {
      return knowledgeBase.fallback.product_not_found;
    }
    //  CẬP NHẬT PROMPT VỚI ĐÚNG ĐƯỜNG DẪN LOCALHOST
    const context = `Dữ liệu sản phẩm có liên quan (JSON): ${JSON.stringify(
      productsFromDB,
      null,
      2
    )}`;

    const finalPrompt = `
        Bạn là trợ lý tư vấn bán hàng chuyên nghiệp của cửa hàng thủy sản Sea Store.
        **Dữ liệu sản phẩm có sẵn:**
        ${context}

        **Nhiệm vụ và Quy tắc định dạng RẤT QUAN TRỌNG:**
        1.  **${
          isContinuation
            ? "Không sử dụng lời chào. Đi thẳng vào vấn đề."
            : "Bắt đầu bằng một câu chào thân thiện."
        }**
        2.  Sau câu chào (nếu có), thêm tiêu đề "### Các sản phẩm gợi ý".
        3.  Với **MỖI** sản phẩm, hãy trình bày bằng các gạch đầu dòng và **in đậm** các đầu mục:
            * **[Tên sản phẩm]**
            * **Công dụng:** [Mô tả ngắn gọn công dụng chính].
            * **Giá bán tham khảo:** **[Giá sản phẩm] VNĐ**.
            * **[➡️ Xem chi tiết sản phẩm](http://localhost:5173/product/[ID sản phẩm])**
        4.  Sử dụng "---" để tạo đường kẻ ngang ngăn cách giữa các sản phẩm nếu có nhiều hơn một sản phẩm.

        **Ví dụ định dạng cho một sản phẩm:**
        * **PIO NUS đặc trị EHP & phân trắng**
        * **Công dụng:** Sản phẩm chuyên dụng ức chế vi khuẩn EHP, giúp phục hồi gan tụy.
        * **Giá bán tham khảo:** **265,000 VNĐ**.
        * **[➡️ Xem chi tiết sản phẩm](http://localhost:5173/product/22)**

        **Câu hỏi của khách hàng:** "${userQuestion}"
      `;

    const finalResult = await model.generateContent(finalPrompt);
    const finalResponse = await finalResult.response;
    return finalResponse.text();
  } catch (error) {
    console.error("Lỗi khi tương tác với Gemini API:", error);
    return knowledgeBase.fallback.general_fallback;
  }
}

module.exports = { getGeminiResponse };
