# Website Tỏ Tình & Tình Yêu: "Gói Con Tim Làm Quà" 🎁

Folder này chứa toàn bộ các file hoàn chỉnh nhất để bạn đẩy lên GitHub Pages.

## Các file bao gồm:
- `index.html`: Cấu trúc website dạng lật từng trang (Storybook), tích hợp hộp quà bí ẩn và khung ảnh Polaroid.
- `style.css`: Toàn bộ giao diện màu pastel ấm áp, hiệu ứng xoay 3D Meme và responsive di động.
- `script.js`: Xử lý lật trang, đồng bộ nhạc theo từng chương và hệ thống tự động gửi thông báo kết quả.
- `bae.jpg`: Bức ảnh xinh xắn của bạn gái.
- `music_avatar.png`: Ảnh meme xoay tròn vui nhộn.
- `chapter1.mp3`, `chapter2.mp3`, `chapter3.mp3`, `chapter4.mp3`: 4 đoạn nhạc chính thức của bài hát tương ứng với 4 trang.

## Cách kích hoạt nhận kết quả về Email:
Mở file `script.js`, tại dòng 423:
```javascript
const NOTIFICATION_CONFIG = {
  email: "your_email_here@gmail.com", // Điền Gmail của bạn vào đây
  enableLocalLog: true
};
```
Thay `your_email_here@gmail.com` bằng email thật của bạn. Khi bạn gái bấm "Dạ em đồng ý! ❤️", bấm thử nút né tránh, hoặc gửi lời nhắn yêu thương, kết quả sẽ gửi về hòm thư của bạn!
